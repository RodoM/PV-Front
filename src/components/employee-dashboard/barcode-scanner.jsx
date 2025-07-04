import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X, Package, AlertCircle } from "lucide-react";
import { tipoUnidadMedidas, unidadesCompatibles } from "@/enums/index";
import { toast } from "sonner";

export function BarcodeScanner({ cartItems, products, onAddToCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tipoUnidadMedida, setTipoUnidadMedida] = useState(null);
  const [error, setError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [manualBarcode, setManualBarcode] = useState("");

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
    } catch {
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
    const foundProduct = products.find((product) => product.codigoBarra === barcode);

    if (foundProduct) {
      setError(null);
      setScannedProduct(foundProduct);
      setTipoUnidadMedida(tipoUnidadMedidas[foundProduct.tipoUnidadMedida]);
      setQuantity(1);
      stopScanning();
    } else {
      setScannedProduct(null);
      setError(`No se encontró ningún producto con el código: ${barcode}`);
    }
  };

  const handleAddProduct = () => {
    if (scannedProduct && quantity > 0) {
      onAddToCart(
        {
          ...scannedProduct,
          tipoUnidadMedida: tipoUnidadMedidas[scannedProduct.tipoUnidadMedida],
          unidadSeleccionada: tipoUnidadMedida,
        },
        quantity
      );
      toast.success(`"${scannedProduct.nombre}" agregado al pedido`);

      setScannedProduct(null);
      setQuantity(1);
      setTipoUnidadMedida(null);
      setError(null);
      startScanning();
    }
  };

  const isDisabled = cartItems.some(
    (item) => item.productoNegocioId === scannedProduct?.productoNegocioId
  );

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
                          src={scannedProduct.imagenUrl || "/images/placeholder.svg"}
                          alt={scannedProduct.nombre}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold">{scannedProduct.nombre}</h3>
                        <p className="text-sm text-gray-600">{scannedProduct.marca.nombre}</p>
                        <p className="font-bold text-lg">
                          ${scannedProduct.precioActivo.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">Stock: {scannedProduct.stockActual}</p>
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
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  />
                </div>

                <Select
                  onValueChange={(value) => setTipoUnidadMedida(Number(value))}
                  defaultValue={tipoUnidadMedidas[scannedProduct.tipoUnidadMedida].toString()}
                  disabled={isDisabled}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione la u. de medida" />
                  </SelectTrigger>
                  <SelectContent>
                    {unidadesCompatibles[scannedProduct.tipoUnidadMedida].map((unidad) => (
                      <SelectItem key={unidad} value={tipoUnidadMedidas[unidad].toString()}>
                        {unidad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    onClick={handleAddProduct}
                    disabled={quantity <= 0 || quantity > scannedProduct.stockActual}
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
          <div className="space-y-2">
            <Label htmlFor="manual-barcode">Código de barras (manual)</Label>
            <div className="flex gap-2">
              <Input
                id="manual-barcode"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                placeholder="Escriba el código de barras"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleBarcodeScanned(manualBarcode);
                    setManualBarcode("");
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  handleBarcodeScanned(manualBarcode);
                  setManualBarcode("");
                }}
              >
                Buscar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
