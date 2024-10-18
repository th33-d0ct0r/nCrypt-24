"use client";
import { useUser } from "@clerk/nextjs";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

interface School {
  schoolName: string;
  address: string;
  team: string[];
  StudentInchargeName: string;
  TeacherInchargeName: string;
  TeacherInchargeEmail: string;
  teamName: string;
  teamCode: string;
}

interface MongoUser {
  email: string;
  clerkId: string;
  name: string;
  schoolId: string;
}

export default function Page() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [mongoSchoolLoading, setMongoSchoolLoading] = useState(true);
  const notyf = new Notyf();
  const [school, setSchool] = useState({} as School);

  //   useEffect(() => {
  //     if (!isLoaded) return;

  //     fetch("/api/getUser", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.mongoUser) {
  //           setMongoUserLoading(false);
  //           setMongoUser(data.mongoUser);
  //         } else {
  //           notyf.error("An error occured while fetching user.");
  //           setMongoUserLoading(false);
  //         }
  //       });

  //     fetch("/api/getSchool", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.school) {
  //           setSchool(data.school);
  //           console.log("this is school", school);
  //           setMongoSchoolLoading(false);
  //         } else {
  //           notyf.error("An error occured while fetching user.");
  //           setMongoUserLoading(false);
  //         }
  //       });
  //   }, [isLoaded, user]);

  //   if (isLoaded && !user) {
  //     return router.push("/sign-in");
  //   }

  //   if (!isLoaded || mongoUserLoading || mongoSchoolLoading) {
  //     return (
  //       <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
  //         <PacmanLoader className="justify-center items-center" color="#651DFF" />
  //       </div>
  //     );
  //   }

  return (
    <div className="flex flex-col items-center pt-0 py-[10vw] min-h-[100vh]">
      <img className="w-[100vw]" src="/banner.png" alt="" />
      <h1 className="text-2xl font-bold mt-[-5vh]">Bhavit Grover</h1>
      <p>nCrypt</p>
    </div>
  );
}
