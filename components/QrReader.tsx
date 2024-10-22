"use client"
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

interface QrReaderProps {
  classes?: string;
}

const QrReader = ( props: QrReaderProps ) => {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    console.log(result);
    setScannedResult(result?.data);
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  function changePage() {
    // window.location.href = '/map/view'
    // return ""
  }

  return (
    <div className={`qr-reader h-[80vw] ${props.classes}`}>
      <video ref={videoEl} width={'[80vh]'} className="w-full h-full"></video>
      <div ref={qrBoxEl} className="qr-box"></div>

      {scannedResult && (
        <div className="mt-4 p-2 bg-gray-100 rounded shadow">
          <p className="text-lg font-semibold">Scanned Result:</p>
          <p>{scannedResult}</p>
        </div>
      )}
    </div>
  );
};

export default QrReader;