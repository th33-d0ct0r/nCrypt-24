"use client";
import React from "react";
import TopNav from "@/components/TopNav";
import { useUser } from "@clerk/nextjs";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MongoUser {
  email: string;
  clerkId: string;
  name: string;
}

const MapView = () => {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      return router.push("/sign-in");
    }
    fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.mongoUser) {
          setMongoUserLoading(false);
          setMongoUser(data.mongoUser);
        } else {
          setMongoUserLoading(false);
          return router.push("/sign-in");
        }
      });
  }, [isLoaded, user]);

  if (!isLoaded || mongoUserLoading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <PacmanLoader className="justify-center items-center" color="#651DFF" />
      </div>
    );
  }
  return (
    <div>
      <TopNav />
      <div className="w-[100vw] overflow-auto rounded-[1.25vw] h-[50vh]">
        <div className="min-w-[200vw] min-h-[225vw]">
          <img
            src="/Main Map (1).png"
            className="min-w-[200vw] min-h-[225vw]"
          ></img>
        </div>
      </div>
      <div className="w-[80vw] bg-gradient-to-br from-[#1d1d1d] via-[#611DF2] to-[#EE2A70] p-[0.25vw] rounded-[2vw]">
        <div className="w-[100%] h-[100%] bg-[#111111] p-[1vw] rounded-[2vw]">
          <button className="py-[2vw] text-white bg-black text-[3.5vw] w-[100%] rounded-[2vw]">
            Woah
          </button>
        </div>
      </div>
      <div className="w-[80vw] ml-[10vw] mt-[4vw]">
        <p className="text-[#777] text-[3vw]">Find some places to eat</p>
      </div>
    </div>
  );
};

export default MapView;
