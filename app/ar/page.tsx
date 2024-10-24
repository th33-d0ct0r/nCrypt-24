"use client";
import { useRef } from "react";
import Webcam from "react-webcam";
import "@google/model-viewer";

const CameraFeed: React.FC = () => {
  const webcamRef = useRef<Webcam | null>(null);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "environment",
        }}
        className="w-[100vw] h-[100vh]"
      />
      <model-viewer
        src="/arrowNew.glb"
        alt="Arrow"
        camera-controls
        shadow-intensity="1"
        style={{ position: 'fixed', bottom: '20vh', left: '20vw', width: '60vw' }}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-orbit="90deg 0deg 45deg"
      />
    </div>
  );
};

export default CameraFeed;