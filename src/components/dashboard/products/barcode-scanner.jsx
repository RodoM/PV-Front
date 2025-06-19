import { useState, useEffect, useRef } from "react";
import { Camera, X, AlertCircle } from "lucide-react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function BarcodeScanner({ onScan, children }) {
  const [showScanner, setShowScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
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

  const handleOpenScanner = () => {
    setShowScanner(true);
    setError(null);
  };

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
    onScan(barcode);
    toast.success("Código de barras escaneado correctamente");
    handleCloseScanner();
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
    setIsScanning(false);
    setError(null);
    setCameraPermission(null);
    stopScanning();
  };

  return (
    <>
      <div onClick={handleOpenScanner}>{children}</div>

      <Dialog open={showScanner} onOpenChange={handleCloseScanner}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Escáner de Códigos de Barras
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
