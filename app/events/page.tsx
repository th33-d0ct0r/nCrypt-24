"use client"
import React from "react";
import LiveEvent from "@/components/LiveEvent";
import TopNav from "@/components/TopNav";

const EventsPage = () => {
  return (
    <div>
      <TopNav />
      <div className="mx-[12vw]">
        <h1 className="text-2xl font-semibold">Live Events</h1>
        <p className="text-sm">Click to watch</p>
        <div>
            <LiveEvent image="/pitching.png" timeStamp="0:37">Creative Event: Pitching</LiveEvent>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
