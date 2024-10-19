"use client";
import { useUser } from "@clerk/nextjs";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Notyf } from "notyf";
import TopNav from "@/components/TopNav";
import TwitchEmbed from "@/components/TwitchEmbed";

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

export default function Dashboard() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [mongoSchoolLoading, setMongoSchoolLoading] = useState(true);
  const notyf = new Notyf();
  const [school, setSchool] = useState({} as School);

  useEffect(() => {
    if (!isLoaded) return;

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
        }
      });

    fetch("/api/getSchool", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.school) {
          setSchool(data.school);
          console.log("this is school", school);
          setMongoSchoolLoading(false);
        } else {
          setMongoUserLoading(false);
        }
      });
  }, [isLoaded, user]);

  if (!isLoaded || mongoUserLoading || mongoSchoolLoading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <PacmanLoader className="justify-center items-center" color="#651DFF" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-[10vw] min-h-[100vh]">
      <TopNav />

      <svg
        className="mt-[-3vh]"
        width="100vw"
        height="103"
        viewBox="0 0 417 103"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => router.push("/ai")}
      >
        <g filter="url(#filter0_f_350_2)">
          <rect
            x="27.0535"
            y="27.5355"
            width="362.033"
            height="48.2813"
            rx="24.1406"
            fill="url(#paint0_radial_350_2)"
          />
        </g>
        <rect
          opacity="0.1"
          x="40.3445"
          y="39.5453"
          width="335.311"
          height="24.2617"
          rx="12.1309"
          fill="#651DFF"
        />
        <g filter="url(#filter1_b_350_2)">
          <rect
            x="26"
            y="25.4685"
            width="362"
            height="53"
            rx="26.5"
            fill="#111111"
          />
        </g>
        <path
          d="M53.326 56.5805C52.5793 56.5805 51.8653 56.4685 51.184 56.2445C50.5027 56.0112 49.966 55.7125 49.574 55.3485L50.092 54.2565C50.4653 54.5832 50.9413 54.8538 51.52 55.0685C52.0987 55.2832 52.7007 55.3905 53.326 55.3905C53.8953 55.3905 54.3573 55.3252 54.712 55.1945C55.0667 55.0638 55.328 54.8865 55.496 54.6625C55.664 54.4292 55.748 54.1678 55.748 53.8785C55.748 53.5425 55.636 53.2718 55.412 53.0665C55.1973 52.8612 54.9127 52.6978 54.558 52.5765C54.2127 52.4458 53.83 52.3338 53.41 52.2405C52.99 52.1472 52.5653 52.0398 52.136 51.9185C51.716 51.7878 51.3287 51.6245 50.974 51.4285C50.6287 51.2325 50.3487 50.9712 50.134 50.6445C49.9193 50.3085 49.812 49.8792 49.812 49.3565C49.812 48.8525 49.9427 48.3905 50.204 47.9705C50.4747 47.5412 50.8853 47.2005 51.436 46.9485C51.996 46.6872 52.7053 46.5565 53.564 46.5565C54.1333 46.5565 54.698 46.6312 55.258 46.7805C55.818 46.9298 56.3033 47.1445 56.714 47.4245L56.252 48.5445C55.832 48.2645 55.3887 48.0638 54.922 47.9425C54.4553 47.8118 54.0027 47.7465 53.564 47.7465C53.0133 47.7465 52.5607 47.8165 52.206 47.9565C51.8513 48.0965 51.59 48.2832 51.422 48.5165C51.2633 48.7498 51.184 49.0112 51.184 49.3005C51.184 49.6458 51.2913 49.9212 51.506 50.1265C51.73 50.3318 52.0147 50.4952 52.36 50.6165C52.7147 50.7378 53.102 50.8498 53.522 50.9525C53.942 51.0458 54.362 51.1532 54.782 51.2745C55.2113 51.3958 55.5987 51.5545 55.944 51.7505C56.2987 51.9465 56.5833 52.2078 56.798 52.5345C57.0127 52.8612 57.12 53.2812 57.12 53.7945C57.12 54.2892 56.9847 54.7512 56.714 55.1805C56.4433 55.6005 56.0233 55.9412 55.454 56.2025C54.894 56.4545 54.1847 56.5805 53.326 56.5805ZM62.2733 56.5525C61.48 56.5525 60.78 56.3892 60.1733 56.0625C59.576 55.7358 59.1093 55.2878 58.7733 54.7185C58.4466 54.1492 58.2833 53.4958 58.2833 52.7585C58.2833 52.0212 58.442 51.3678 58.7593 50.7985C59.086 50.2292 59.5293 49.7858 60.0893 49.4685C60.6586 49.1418 61.298 48.9785 62.0073 48.9785C62.726 48.9785 63.3606 49.1372 63.9113 49.4545C64.462 49.7718 64.8913 50.2198 65.1993 50.7985C65.5166 51.3678 65.6753 52.0352 65.6753 52.8005C65.6753 52.8565 65.6706 52.9218 65.6613 52.9965C65.6613 53.0712 65.6566 53.1412 65.6473 53.2065H59.3333V52.2405H64.9473L64.4013 52.5765C64.4106 52.1005 64.3126 51.6758 64.1073 51.3025C63.902 50.9292 63.6173 50.6398 63.2533 50.4345C62.8986 50.2198 62.4833 50.1125 62.0073 50.1125C61.5406 50.1125 61.1253 50.2198 60.7613 50.4345C60.3973 50.6398 60.1126 50.9338 59.9073 51.3165C59.702 51.6898 59.5993 52.1192 59.5993 52.6045V52.8285C59.5993 53.3232 59.7113 53.7665 59.9353 54.1585C60.1686 54.5412 60.4906 54.8398 60.9013 55.0545C61.312 55.2692 61.7833 55.3765 62.3153 55.3765C62.754 55.3765 63.1506 55.3018 63.5053 55.1525C63.8693 55.0032 64.1866 54.7792 64.4573 54.4805L65.1993 55.3485C64.8633 55.7405 64.4433 56.0392 63.9393 56.2445C63.4446 56.4498 62.8893 56.5525 62.2733 56.5525ZM71.9425 56.4685V54.9005L71.8725 54.6065V51.9325C71.8725 51.3632 71.7045 50.9245 71.3685 50.6165C71.0418 50.2992 70.5472 50.1405 69.8845 50.1405C69.4458 50.1405 69.0165 50.2152 68.5965 50.3645C68.1765 50.5045 67.8218 50.6958 67.5325 50.9385L66.9725 49.9305C67.3552 49.6225 67.8125 49.3892 68.3445 49.2305C68.8858 49.0625 69.4505 48.9785 70.0385 48.9785C71.0558 48.9785 71.8398 49.2258 72.3905 49.7205C72.9412 50.2152 73.2165 50.9712 73.2165 51.9885V56.4685H71.9425ZM69.5065 56.5525C68.9558 56.5525 68.4705 56.4592 68.0505 56.2725C67.6398 56.0858 67.3225 55.8292 67.0985 55.5025C66.8745 55.1665 66.7625 54.7885 66.7625 54.3685C66.7625 53.9672 66.8558 53.6032 67.0425 53.2765C67.2385 52.9498 67.5512 52.6885 67.9805 52.4925C68.4192 52.2965 69.0072 52.1985 69.7445 52.1985H72.0965V53.1645H69.8005C69.1285 53.1645 68.6758 53.2765 68.4425 53.5005C68.2092 53.7245 68.0925 53.9952 68.0925 54.3125C68.0925 54.6765 68.2372 54.9705 68.5265 55.1945C68.8158 55.4092 69.2172 55.5165 69.7305 55.5165C70.2345 55.5165 70.6732 55.4045 71.0465 55.1805C71.4292 54.9565 71.7045 54.6298 71.8725 54.2005L72.1385 55.1245C71.9612 55.5632 71.6485 55.9132 71.2005 56.1745C70.7525 56.4265 70.1878 56.5525 69.5065 56.5525ZM75.7037 56.4685V49.0485H76.9917V51.0645L76.8657 50.5605C77.071 50.0472 77.4164 49.6552 77.9017 49.3845C78.387 49.1138 78.9844 48.9785 79.6937 48.9785V50.2805C79.6377 50.2712 79.5817 50.2665 79.5257 50.2665C79.479 50.2665 79.4324 50.2665 79.3857 50.2665C78.667 50.2665 78.0977 50.4812 77.6777 50.9105C77.2577 51.3398 77.0477 51.9605 77.0477 52.7725V56.4685H75.7037ZM84.5158 56.5525C83.7598 56.5525 83.0831 56.3892 82.4858 56.0625C81.8978 55.7358 81.4358 55.2878 81.0998 54.7185C80.7638 54.1492 80.5958 53.4958 80.5958 52.7585C80.5958 52.0212 80.7638 51.3678 81.0998 50.7985C81.4358 50.2292 81.8978 49.7858 82.4858 49.4685C83.0831 49.1418 83.7598 48.9785 84.5158 48.9785C85.1878 48.9785 85.7851 49.1138 86.3078 49.3845C86.8398 49.6458 87.2505 50.0378 87.5398 50.5605L86.5178 51.2185C86.2751 50.8545 85.9765 50.5885 85.6218 50.4205C85.2765 50.2432 84.9031 50.1545 84.5018 50.1545C84.0165 50.1545 83.5825 50.2618 83.1998 50.4765C82.8171 50.6912 82.5138 50.9945 82.2898 51.3865C82.0658 51.7692 81.9538 52.2265 81.9538 52.7585C81.9538 53.2905 82.0658 53.7525 82.2898 54.1445C82.5138 54.5365 82.8171 54.8398 83.1998 55.0545C83.5825 55.2692 84.0165 55.3765 84.5018 55.3765C84.9031 55.3765 85.2765 55.2925 85.6218 55.1245C85.9765 54.9472 86.2751 54.6765 86.5178 54.3125L87.5398 54.9565C87.2505 55.4698 86.8398 55.8665 86.3078 56.1465C85.7851 56.4172 85.1878 56.5525 84.5158 56.5525ZM93.1462 48.9785C93.7528 48.9785 94.2848 49.0952 94.7422 49.3285C95.2088 49.5618 95.5728 49.9165 95.8342 50.3925C96.0955 50.8685 96.2262 51.4705 96.2262 52.1985V56.4685H94.8822V52.3525C94.8822 51.6338 94.7048 51.0925 94.3502 50.7285C94.0048 50.3645 93.5148 50.1825 92.8802 50.1825C92.4042 50.1825 91.9888 50.2758 91.6342 50.4625C91.2795 50.6492 91.0042 50.9245 90.8082 51.2885C90.6215 51.6525 90.5282 52.1052 90.5282 52.6465V56.4685H89.1842V46.0805H90.5282V51.0505L90.2622 50.5185C90.5048 50.0332 90.8782 49.6552 91.3822 49.3845C91.8862 49.1138 92.4742 48.9785 93.1462 48.9785ZM102.669 56.4685V48.3905C102.669 47.6625 102.879 47.0838 103.299 46.6545C103.729 46.2158 104.335 45.9965 105.119 45.9965C105.409 45.9965 105.684 46.0338 105.945 46.1085C106.216 46.1738 106.445 46.2812 106.631 46.4305L106.225 47.4525C106.085 47.3405 105.927 47.2565 105.749 47.2005C105.572 47.1352 105.385 47.1025 105.189 47.1025C104.797 47.1025 104.499 47.2145 104.293 47.4385C104.088 47.6532 103.985 47.9752 103.985 48.4045V49.3985L104.013 50.0145V56.4685H102.669ZM101.409 50.1545V49.0485H106.141V50.1545H101.409ZM110.477 56.5525C109.731 56.5525 109.068 56.3892 108.489 56.0625C107.911 55.7358 107.453 55.2878 107.117 54.7185C106.781 54.1398 106.613 53.4865 106.613 52.7585C106.613 52.0212 106.781 51.3678 107.117 50.7985C107.453 50.2292 107.911 49.7858 108.489 49.4685C109.068 49.1418 109.731 48.9785 110.477 48.9785C111.215 48.9785 111.873 49.1418 112.451 49.4685C113.039 49.7858 113.497 50.2292 113.823 50.7985C114.159 51.3585 114.327 52.0118 114.327 52.7585C114.327 53.4958 114.159 54.1492 113.823 54.7185C113.497 55.2878 113.039 55.7358 112.451 56.0625C111.873 56.3892 111.215 56.5525 110.477 56.5525ZM110.477 55.3765C110.953 55.3765 111.378 55.2692 111.751 55.0545C112.134 54.8398 112.433 54.5365 112.647 54.1445C112.862 53.7432 112.969 53.2812 112.969 52.7585C112.969 52.2265 112.862 51.7692 112.647 51.3865C112.433 50.9945 112.134 50.6912 111.751 50.4765C111.378 50.2618 110.953 50.1545 110.477 50.1545C110.001 50.1545 109.577 50.2618 109.203 50.4765C108.83 50.6912 108.531 50.9945 108.307 51.3865C108.083 51.7692 107.971 52.2265 107.971 52.7585C107.971 53.2812 108.083 53.7432 108.307 54.1445C108.531 54.5365 108.83 54.8398 109.203 55.0545C109.577 55.2692 110.001 55.3765 110.477 55.3765ZM116.186 56.4685V49.0485H117.474V51.0645L117.348 50.5605C117.553 50.0472 117.899 49.6552 118.384 49.3845C118.869 49.1138 119.467 48.9785 120.176 48.9785V50.2805C120.12 50.2712 120.064 50.2665 120.008 50.2665C119.961 50.2665 119.915 50.2665 119.868 50.2665C119.149 50.2665 118.58 50.4812 118.16 50.9105C117.74 51.3398 117.53 51.9605 117.53 52.7725V56.4685H116.186ZM130.294 56.4685V54.9005L130.224 54.6065V51.9325C130.224 51.3632 130.056 50.9245 129.72 50.6165C129.393 50.2992 128.899 50.1405 128.236 50.1405C127.797 50.1405 127.368 50.2152 126.948 50.3645C126.528 50.5045 126.173 50.6958 125.884 50.9385L125.324 49.9305C125.707 49.6225 126.164 49.3892 126.696 49.2305C127.237 49.0625 127.802 48.9785 128.39 48.9785C129.407 48.9785 130.191 49.2258 130.742 49.7205C131.293 50.2152 131.568 50.9712 131.568 51.9885V56.4685H130.294ZM127.858 56.5525C127.307 56.5525 126.822 56.4592 126.402 56.2725C125.991 56.0858 125.674 55.8292 125.45 55.5025C125.226 55.1665 125.114 54.7885 125.114 54.3685C125.114 53.9672 125.207 53.6032 125.394 53.2765C125.59 52.9498 125.903 52.6885 126.332 52.4925C126.771 52.2965 127.359 52.1985 128.096 52.1985H130.448V53.1645H128.152C127.48 53.1645 127.027 53.2765 126.794 53.5005C126.561 53.7245 126.444 53.9952 126.444 54.3125C126.444 54.6765 126.589 54.9705 126.878 55.1945C127.167 55.4092 127.569 55.5165 128.082 55.5165C128.586 55.5165 129.025 55.4045 129.398 55.1805C129.781 54.9565 130.056 54.6298 130.224 54.2005L130.49 55.1245C130.313 55.5632 130 55.9132 129.552 56.1745C129.104 56.4265 128.539 56.5525 127.858 56.5525ZM138.017 48.9785C138.624 48.9785 139.156 49.0952 139.613 49.3285C140.08 49.5618 140.444 49.9165 140.705 50.3925C140.967 50.8685 141.097 51.4705 141.097 52.1985V56.4685H139.753V52.3525C139.753 51.6338 139.576 51.0925 139.221 50.7285C138.876 50.3645 138.386 50.1825 137.751 50.1825C137.275 50.1825 136.86 50.2758 136.505 50.4625C136.151 50.6492 135.875 50.9245 135.679 51.2885C135.493 51.6525 135.399 52.1052 135.399 52.6465V56.4685H134.055V49.0485H135.343V51.0505L135.133 50.5185C135.376 50.0332 135.749 49.6552 136.253 49.3845C136.757 49.1138 137.345 48.9785 138.017 48.9785ZM143.77 59.2685C143.415 59.2685 143.07 59.2078 142.734 59.0865C142.398 58.9745 142.108 58.8065 141.866 58.5825L142.44 57.5745C142.626 57.7518 142.832 57.8872 143.056 57.9805C143.28 58.0738 143.518 58.1205 143.77 58.1205C144.096 58.1205 144.367 58.0365 144.582 57.8685C144.796 57.7005 144.997 57.4018 145.184 56.9725L145.646 55.9505L145.786 55.7825L148.698 49.0485H150.014L146.416 57.2105C146.201 57.7332 145.958 58.1438 145.688 58.4425C145.426 58.7412 145.137 58.9512 144.82 59.0725C144.502 59.2032 144.152 59.2685 143.77 59.2685ZM145.534 56.7065L142.146 49.0485H143.546L146.43 55.6565L145.534 56.7065ZM154.021 56.5525C153.275 56.5525 152.696 56.3518 152.285 55.9505C151.875 55.5492 151.669 54.9752 151.669 54.2285V47.4245H153.013V54.1725C153.013 54.5738 153.111 54.8818 153.307 55.0965C153.513 55.3112 153.802 55.4185 154.175 55.4185C154.595 55.4185 154.945 55.3018 155.225 55.0685L155.645 56.0345C155.44 56.2118 155.193 56.3425 154.903 56.4265C154.623 56.5105 154.329 56.5525 154.021 56.5525ZM150.409 50.1545V49.0485H155.141V50.1545H150.409ZM161.232 48.9785C161.839 48.9785 162.371 49.0952 162.828 49.3285C163.295 49.5618 163.659 49.9165 163.92 50.3925C164.181 50.8685 164.312 51.4705 164.312 52.1985V56.4685H162.968V52.3525C162.968 51.6338 162.791 51.0925 162.436 50.7285C162.091 50.3645 161.601 50.1825 160.966 50.1825C160.49 50.1825 160.075 50.2758 159.72 50.4625C159.365 50.6492 159.09 50.9245 158.894 51.2885C158.707 51.6525 158.614 52.1052 158.614 52.6465V56.4685H157.27V46.0805H158.614V51.0505L158.348 50.5185C158.591 50.0332 158.964 49.6552 159.468 49.3845C159.972 49.1138 160.56 48.9785 161.232 48.9785ZM166.799 56.4685V49.0485H168.143V56.4685H166.799ZM167.471 47.6205C167.21 47.6205 166.991 47.5365 166.813 47.3685C166.645 47.2005 166.561 46.9952 166.561 46.7525C166.561 46.5005 166.645 46.2905 166.813 46.1225C166.991 45.9545 167.21 45.8705 167.471 45.8705C167.733 45.8705 167.947 45.9545 168.115 46.1225C168.293 46.2812 168.381 46.4818 168.381 46.7245C168.381 46.9765 168.297 47.1912 168.129 47.3685C167.961 47.5365 167.742 47.6205 167.471 47.6205ZM174.672 48.9785C175.278 48.9785 175.81 49.0952 176.268 49.3285C176.734 49.5618 177.098 49.9165 177.36 50.3925C177.621 50.8685 177.752 51.4705 177.752 52.1985V56.4685H176.408V52.3525C176.408 51.6338 176.23 51.0925 175.876 50.7285C175.53 50.3645 175.04 50.1825 174.406 50.1825C173.93 50.1825 173.514 50.2758 173.16 50.4625C172.805 50.6492 172.53 50.9245 172.334 51.2885C172.147 51.6525 172.054 52.1052 172.054 52.6465V56.4685H170.71V49.0485H171.998V51.0505L171.788 50.5185C172.03 50.0332 172.404 49.6552 172.908 49.3845C173.412 49.1138 174 48.9785 174.672 48.9785ZM183.487 59.2685C182.806 59.2685 182.143 59.1705 181.499 58.9745C180.864 58.7878 180.346 58.5172 179.945 58.1625L180.589 57.1265C180.934 57.4252 181.359 57.6585 181.863 57.8265C182.367 58.0038 182.894 58.0925 183.445 58.0925C184.322 58.0925 184.966 57.8872 185.377 57.4765C185.788 57.0658 185.993 56.4405 185.993 55.6005V54.0325L186.133 52.5625L186.063 51.0785V49.0485H187.337V55.4605C187.337 56.7672 187.01 57.7285 186.357 58.3445C185.704 58.9605 184.747 59.2685 183.487 59.2685ZM183.319 56.1605C182.6 56.1605 181.956 56.0112 181.387 55.7125C180.827 55.4045 180.379 54.9798 180.043 54.4385C179.716 53.8972 179.553 53.2718 179.553 52.5625C179.553 51.8438 179.716 51.2185 180.043 50.6865C180.379 50.1452 180.827 49.7252 181.387 49.4265C181.956 49.1278 182.6 48.9785 183.319 48.9785C183.954 48.9785 184.532 49.1092 185.055 49.3705C185.578 49.6225 185.993 50.0145 186.301 50.5465C186.618 51.0785 186.777 51.7505 186.777 52.5625C186.777 53.3652 186.618 54.0325 186.301 54.5645C185.993 55.0965 185.578 55.4978 185.055 55.7685C184.532 56.0298 183.954 56.1605 183.319 56.1605ZM183.473 54.9845C183.968 54.9845 184.406 54.8818 184.789 54.6765C185.172 54.4712 185.47 54.1865 185.685 53.8225C185.909 53.4585 186.021 53.0385 186.021 52.5625C186.021 52.0865 185.909 51.6665 185.685 51.3025C185.47 50.9385 185.172 50.6585 184.789 50.4625C184.406 50.2572 183.968 50.1545 183.473 50.1545C182.978 50.1545 182.535 50.2572 182.143 50.4625C181.76 50.6585 181.457 50.9385 181.233 51.3025C181.018 51.6665 180.911 52.0865 180.911 52.5625C180.911 53.0385 181.018 53.4585 181.233 53.8225C181.457 54.1865 181.76 54.4712 182.143 54.6765C182.535 54.8818 182.978 54.9845 183.473 54.9845Z"
          fill="url(#paint1_linear_350_2)"
        />
        <circle cx="358.978" cy="51.8925" r="21.5416" fill="white" />
        <path
          d="M362.003 54.3619C362.751 53.4627 363.2 52.307 363.2 51.0465C363.2 48.1798 360.876 45.856 358.01 45.856C355.143 45.856 352.819 48.1798 352.819 51.0465C352.819 53.9131 355.143 56.237 358.01 56.237C359.616 56.237 361.051 55.5075 362.003 54.3619ZM362.003 54.3619L365.138 57.496"
          stroke="#611DF2"
        />
        <defs>
          <filter
            id="filter0_f_350_2"
            x="0.0534668"
            y="0.535461"
            width="416.033"
            height="102.281"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="13.5"
              result="effect1_foregroundBlur_350_2"
            />
          </filter>
          <filter
            id="filter1_b_350_2"
            x="3.7"
            y="3.16851"
            width="406.6"
            height="97.6"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="11.15" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_350_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_350_2"
              result="shape"
            />
          </filter>
          <radialGradient
            id="paint0_radial_350_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(396.053 86.5989) rotate(-169.453) scale(408.375 164.814)"
          >
            <stop />
            <stop offset="0.525" stop-color="#651DFF" />
            <stop offset="1" stop-color="#F42A6A" />
          </radialGradient>
          <linearGradient
            id="paint1_linear_350_2"
            x1="49"
            y1="24.9685"
            x2="192.153"
            y2="81.2098"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5B5B5B" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
        </defs>
      </svg>

      <div onClick={() => router.push('/billing')} className="relative flex flex-col justify-center w-[100vw]">
        <img className="w-[100vw]" src="/dashCard.png" alt="" />
        <div className="absolute ml-[20vw]">
          <h1 className="text-md">{mongoUser.name.split(" ")[0]}</h1>
          <p className="text-[8px]">
            Club: <b>{school.teamName}</b>
          </p>
          <p className="text-[8px]">
            Registration Number: <b>******27</b>
          </p>
        </div>
      </div>
      <img onClick={() => router.push('/calendar')} className="w-[90vw] mt-[2vh]" src="/warning.png" alt="" />

      <div className="flex flex-col items-center justify-center w-[100vw] h-[30vh] bg-[url('/dashboardBg.png')] mt-[2vh]">
        <TwitchEmbed  video="1641404836" />
      </div>
      <div className="mt-[5vh] mb-[12vh]">
        <h2>Live Events</h2>
        <img src="/valo.svg"></img>
      </div>
    </div>
  );
}
