"use client";
import { useEffect, useRef } from "react";
import "@google/model-viewer";
const CameraFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const getCameraFeed = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error maardi:", err);
      }
    };
    getCameraFeed();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay className="w-[100vw] h-[100vh]"></video>
      <model-viewer
        src="/arrowNew.glb"
        alt="Arrow"
        camera-controls
        shadow-intensity="1"
        style={{position: 'fixed', bottom: '20vh', left: '20vw', width: '60vw'}}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-orbit="90deg 0deg 45deg"
      />
    </div>
  );
};

export default CameraFeed;
