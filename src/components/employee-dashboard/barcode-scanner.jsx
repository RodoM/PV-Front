import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X, Package, AlertCircle } from "lucide-react";

export function BarcodeScanner({ products, onAddToCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    codeReaderRef.current = new BrowserMultiFormatReader();

    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      setCameraPermission(true);

      if (videoRef.current && codeReaderRef.current) {
        videoRef.current.srcObject = stream;

        codeReaderRef.current.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
          if (result) {
            const barcode = result.getText();
            handleBarcodeScanned(barcode);
          }
        });
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraPermission(false);
      setError("No se pudo acceder a la cámara. Verifica los permisos.");
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);

    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleBarcodeScanned = (barcode) => {
    const foundProduct = products.find((product) => product.barcode === barcode);

    if (foundProduct) {
      setScannedProduct(foundProduct);
      setQuantity(1);
      stopScanning();
    } else {
      setError(`No se encontró ningún producto con el código: ${barcode}`);
    }
  };

  const handleAddProduct = () => {
    if (scannedProduct && quantity > 0 && quantity <= scannedProduct.stock) {
      onAddToCart(scannedProduct, quantity);
      handleCloseDialog();
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setIsScanning(false);
    setScannedProduct(null);
    setQuantity(1);
    setError(null);
    setCameraPermission(null);
    stopScanning();
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
    setError(null);
    setScannedProduct(null);
  };

  return (
    <>
      <Button variant="outline" onClick={handleOpenDialog} className="flex items-center gap-2">
        <Camera className="w-4 h-4" />
        <span className="hidden md:block">Escanear</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Escáner de Códigos de Barras
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {!scannedProduct && (
              <div className="space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border-2 border-white border-dashed w-48 h-24 rounded-lg flex items-center justify-center">
                      {!isScanning && (
                        <span className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                          Enfoca el código de barras
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!isScanning ? (
                    <Button onClick={startScanning} className="flex-1">
                      <Camera className="w-4 h-4 mr-2" />
                      Iniciar Escaneo
                    </Button>
                  ) : (
                    <Button onClick={stopScanning} variant="outline" className="flex-1">
                      <X className="w-4 h-4 mr-2" />
                      Detener Escaneo
                    </Button>
                  )}
                </div>

                {cameraPermission === false && (
                  <div className="text-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mx-auto mb-1" />
                    No se pudo acceder a la cámara. Verifica los permisos del navegador.
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Error</span>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setError(null);
                    if (!isScanning) {
                      startScanning();
                    }
                  }}
                  className="mt-2"
                >
                  Intentar de nuevo
                </Button>
              </div>
            )}

            {scannedProduct && (
              <div className="space-y-4">
                <div className="text-center text-green-600 font-medium">¡Producto encontrado!</div>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 relative bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={scannedProduct.image || "/placeholder.svg"}
                          alt={scannedProduct.name}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold">{scannedProduct.name}</h3>
                        <p className="text-sm text-gray-600">{scannedProduct.brand}</p>
                        <p className="font-bold text-lg">${scannedProduct.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Stock: {scannedProduct.stock}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad a agregar</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={scannedProduct.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleAddProduct}
                    disabled={quantity <= 0 || quantity > scannedProduct.stock}
                    className="flex-1"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Agregar al Pedido
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setScannedProduct(null);
                      setError(null);
                      startScanning();
                    }}
                  >
                    Escanear Otro
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
