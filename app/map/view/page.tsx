import TopNav from "@/components/TopNav";
import React from "react";

const MapView = () => {
  return (
    <div>
      <TopNav />
      <div className="w-[80vw] h-[115vw] overflow-auto rounded-[1.25vw] ml-[10vw]">
        <div className="min-w-[150vw] min-h-[225vw]">
          <img src="/map.png" className="min-w-[150vw] min-h-[225vw]"></img>
        </div>
      </div>
      <div className="w-[80vw] ml-[10vw] mt-[4vw]">
        <p className="text-[#777] text-[3vw]">Find some places to eat</p>
      </div>
    </div>
  );
};

export default MapView;
