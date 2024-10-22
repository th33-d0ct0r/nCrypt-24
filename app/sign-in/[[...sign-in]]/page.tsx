'use client'

import * as React from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Input from '@/components/Input'
import Link from 'next/link'
import { PacmanLoader } from 'react-spinners'
import { useUser } from '@clerk/nextjs';
import { RainbowButton } from '@/components/rainbow-button'

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();

  if (isLoaded && user) {
    return router.push('/dashboard')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null);
    setLoading(true);

    try {
      //@ts-ignore
      const signInAttempt = await signIn.create({
        identifier: email.trim(),
        password: password.trim(),
      })

      if (signInAttempt.status === 'complete') {
        // @ts-ignore
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/dashboard')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
      return (
          <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
              <PacmanLoader className="justify-center items-center" color='#651DFF' />
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] animate-fadeIn">
            <img src="./login_blob.png" className="w-[41%] aspect-auto absolute top-[-1vh] left-[-3vh] z-[-10]" alt="" />

            <img src="./login_blob_2.png" className="w-[44%] aspect-auto absolute bottom-[2vh] right-[-2vh] z-[-10]" alt="" />

            <h1 className="text-2xl mb-0 font-medium text-[#fff]">Welcome to</h1>
            <svg className="mb-10" width="203" height="44" viewBox="0 0 203 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.07824 33.5688C5.53806 33.5688 5.91512 33.5044 6.20941 33.3756C6.5037 33.2469 6.72442 33.0538 6.87157 32.7963C7.01871 32.5388 7.11987 32.2169 7.17505 31.8306C7.23023 31.426 7.25782 30.9569 7.25782 30.4235V13.2903C7.25782 12.8857 7.23943 12.527 7.20264 12.2143C7.16586 11.8833 7.08309 11.6074 6.95433 11.3867C6.82558 11.1475 6.64165 10.9636 6.40254 10.8349C6.16343 10.7061 5.84155 10.6417 5.4369 10.6417V10.3658H23.784V10.4486L24.7221 15.5251L24.5014 15.6079C23.8208 14.6698 23.1587 13.8881 22.5149 13.2628C21.8712 12.619 21.163 12.104 20.3905 11.7177C19.6364 11.3315 18.7719 11.0648 17.7971 10.9176C16.8406 10.7521 15.7187 10.6693 14.4311 10.6693H10.7893V20.3533H11.9205C13.1712 20.3533 14.2104 20.2889 15.0381 20.1602C15.8658 20.0314 16.5464 19.8291 17.0798 19.5532C17.6315 19.2589 18.0638 18.8727 18.3765 18.3944C18.6892 17.8978 18.9559 17.2909 19.1766 16.5735H19.3421V24.409H19.1766C18.8455 23.7284 18.5144 23.1491 18.1833 22.6708C17.8523 22.1926 17.4292 21.8064 16.9142 21.5121C16.4176 21.1994 15.7738 20.9787 14.9829 20.8499C14.192 20.7028 13.1712 20.6292 11.9205 20.6292H10.7893V33.5412H13.769C15.0197 33.5412 16.1509 33.4676 17.1625 33.3205C18.1925 33.1549 19.1306 32.879 19.9767 32.4928C20.8411 32.0881 21.6412 31.5455 22.377 30.865C23.1127 30.1844 23.83 29.3292 24.529 28.2991L24.7221 28.3543L23.784 33.8447H5.07824V33.5688ZM25.2963 15.1113C25.9952 15.1481 26.6206 15.1756 27.1724 15.194C27.7242 15.2124 28.2668 15.2216 28.8002 15.2216C29.3336 15.2216 29.8762 15.2124 30.428 15.194C30.9982 15.1756 31.6603 15.1481 32.4144 15.1113C32.9662 15.0745 33.4353 15.1664 33.8215 15.3872C34.2078 15.5895 34.5389 15.8562 34.8147 16.1873C35.109 16.5183 35.3573 16.8862 35.5597 17.2909C35.7804 17.6771 35.9827 18.045 36.1666 18.3944C36.369 18.7255 36.5621 19.0106 36.746 19.2497C36.93 19.4704 37.1415 19.5808 37.3806 19.5808C37.6381 19.5808 37.8864 19.4704 38.1255 19.2497C38.2911 19.0474 38.4474 18.8543 38.5945 18.6703C38.7417 18.4864 38.8888 18.3025 39.036 18.1185C39.6246 17.4196 39.8453 16.8218 39.6981 16.3252C39.551 15.8102 38.9256 15.5067 37.822 15.4148V15.1113C37.8956 15.1113 38.1163 15.1297 38.4842 15.1664C38.8704 15.2032 39.413 15.2216 40.112 15.2216C40.4798 15.2216 40.8753 15.2124 41.2983 15.194C41.7214 15.1756 42.1996 15.1481 42.733 15.1113V15.3044C42.0892 15.5435 41.5098 15.9022 40.9948 16.3804C40.4982 16.8586 40.0384 17.3644 39.6154 17.8978C38.9716 18.6887 38.3186 19.4888 37.6565 20.2981C36.9943 21.1074 36.3414 21.9167 35.6976 22.726C36.746 24.271 37.7576 25.7701 38.7325 27.2231C39.7257 28.6762 40.5902 29.9545 41.3259 31.0581C41.3443 31.0949 41.4271 31.2236 41.5742 31.4444C41.7214 31.6467 41.9145 31.895 42.1536 32.1893C42.4111 32.4652 42.7054 32.7411 43.0365 33.017C43.3859 33.2929 43.763 33.4952 44.1677 33.6239L44.1401 33.8447C43.4411 33.7895 42.8066 33.7527 42.2364 33.7343C41.6846 33.7159 41.142 33.7067 40.6086 33.7067C40.0752 33.7067 39.5142 33.7159 38.9256 33.7343C38.337 33.7527 37.6565 33.7895 36.884 33.8447V33.6239C37.5093 33.4584 37.8036 33.1733 37.7668 32.7687C37.7485 32.364 37.5553 31.8766 37.1875 31.3064C36.7644 30.6627 36.2034 29.835 35.5045 28.8233C34.8239 27.8117 34.0974 26.7449 33.3249 25.6229C32.3133 26.8737 31.4304 27.9589 30.6763 28.8785C29.9222 29.7982 29.4072 30.4327 29.1313 30.7822C28.8554 31.1317 28.6622 31.4628 28.5519 31.7754C28.4415 32.0881 28.4415 32.3732 28.5519 32.6307C28.6622 32.8882 28.883 33.1089 29.214 33.2929C29.5451 33.4584 30.0141 33.5688 30.6211 33.6239V33.8447C30.1797 33.8079 29.7566 33.7803 29.352 33.7619C28.9657 33.7435 28.5887 33.7343 28.2208 33.7343C27.7794 33.7343 27.3379 33.7435 26.8965 33.7619C26.4735 33.7803 26.0412 33.8079 25.5998 33.8447V33.6239C26.1516 33.3848 26.6114 33.0997 26.9793 32.7687C27.3471 32.4192 27.7426 31.9962 28.1656 31.4995C28.8094 30.6902 29.5635 29.7522 30.428 28.6854C31.3109 27.6186 32.2213 26.5058 33.1594 25.347C32.5156 24.4274 31.8902 23.5261 31.2833 22.6433C30.6947 21.742 30.1613 20.9419 29.6831 20.2429C29.1313 19.4153 28.6071 18.6335 28.1105 17.8978C28.0921 17.8794 28.0093 17.7599 27.8621 17.5392C27.715 17.3184 27.5127 17.0701 27.2552 16.7942C27.0161 16.4999 26.7218 16.2149 26.3723 15.939C26.0412 15.6631 25.6734 15.4515 25.2687 15.3044L25.2963 15.1113ZM32.5248 15.4148C32.1937 15.4515 31.9546 15.5619 31.8075 15.7458C31.6787 15.9114 31.6327 16.1137 31.6695 16.3528C31.7063 16.5551 31.7799 16.7758 31.8902 17.015C32.0006 17.2541 32.1569 17.5208 32.3593 17.8151C32.4144 17.907 32.5984 18.1829 32.9111 18.6427C33.2237 19.1026 33.564 19.5992 33.9319 20.1326C34.2997 20.666 34.64 21.1626 34.9527 21.6224C35.2654 22.0823 35.4493 22.3582 35.5045 22.4501C35.8724 21.9903 36.231 21.5489 36.5805 21.1258C36.9484 20.7028 37.2978 20.2797 37.6289 19.8567C37.3162 19.9303 37.0311 19.8659 36.7736 19.6636C36.5529 19.5164 36.3506 19.2957 36.1666 19.0014C36.0011 18.7071 35.8356 18.4036 35.67 18.091C35.4309 17.6127 35.1642 17.1529 34.8699 16.7115C34.594 16.27 34.2446 15.9298 33.8215 15.6906C33.4721 15.4883 33.0398 15.3964 32.5248 15.4148ZM71.0068 34.2309L71.2827 34.2861C71.5218 35.2242 71.8529 36.0886 72.2759 36.8795C72.7174 37.6888 73.2508 38.3786 73.8761 38.9488C74.5015 39.5189 75.2188 39.9604 76.0281 40.2731C76.8374 40.5857 77.7479 40.7145 78.7595 40.6593C79.5504 40.6225 80.3505 40.503 81.1598 40.3007C81.9691 40.0983 82.6865 39.804 83.3118 39.4178C83.9556 39.0499 84.4798 38.5809 84.8844 38.0107C85.2891 37.4589 85.4914 36.806 85.4914 36.0518C85.4914 35.4817 85.3075 35.0034 84.9396 34.6172C84.5718 34.2493 84.0843 33.9458 83.4774 33.7067C82.8888 33.4492 82.2174 33.2561 81.4633 33.1273C80.7092 32.9802 79.9367 32.8606 79.1458 32.7687C78.3549 32.6767 77.5824 32.6031 76.8282 32.5479C76.0925 32.4744 75.4396 32.3824 74.8694 32.2721C74.2256 32.1617 73.7198 32.0145 73.3519 31.8306C72.9841 31.6467 72.7082 31.4444 72.5243 31.2236C72.3587 31.0029 72.2576 30.773 72.2208 30.5339C72.184 30.2948 72.184 30.0649 72.2208 29.8442C72.2759 29.4763 72.4783 29.1636 72.8277 28.9061C73.1772 28.6302 73.6003 28.4003 74.0969 28.2164C74.6119 28.014 75.1545 27.8577 75.7247 27.7473C76.3132 27.637 76.8742 27.5634 77.4076 27.5266C76.4144 27.4163 75.4947 27.2139 74.6487 26.9197C73.821 26.607 73.1036 26.2023 72.4967 25.7057C71.9081 25.1907 71.4483 24.5745 71.1172 23.8572C70.7861 23.1399 70.6206 22.3214 70.6206 21.4017C70.6206 20.2981 70.8597 19.3601 71.3379 18.5876C71.8161 17.7967 72.4323 17.1437 73.1864 16.6287C73.9589 16.1137 74.8234 15.7366 75.7798 15.4975C76.7363 15.2584 77.6927 15.1389 78.6492 15.1389C79.1274 15.1389 79.624 15.1848 80.139 15.2768C80.6724 15.3688 81.1782 15.4699 81.6564 15.5803C82.3922 14.679 83.2015 13.9525 84.0843 13.4007C84.9672 12.8305 85.9512 12.5454 87.0364 12.5454C87.3859 12.5454 87.7906 12.5914 88.2504 12.6834L87.1468 16.4632H86.9537C86.8617 15.9114 86.5766 15.4515 86.0984 15.0837C85.6202 14.7158 85.0684 14.5319 84.443 14.5319C84.0384 14.5319 83.6245 14.6238 83.2015 14.8078C82.7968 14.9917 82.4106 15.286 82.0427 15.6906C82.6497 15.893 83.2383 16.1689 83.8084 16.5183C84.3786 16.8494 84.8752 17.2541 85.2983 17.7323C85.7397 18.1921 86.0892 18.7347 86.3467 19.3601C86.6042 19.9671 86.7329 20.6384 86.7329 21.3741C86.7329 22.5329 86.503 23.5077 86.0432 24.2986C85.5834 25.0895 84.958 25.7425 84.1671 26.2575C83.3762 26.7541 82.4382 27.1312 81.353 27.3887C80.2862 27.6278 79.1458 27.7749 77.9318 27.8301C76.0741 27.9405 75.1453 28.3083 75.1453 28.9337C75.1453 29.2832 75.4672 29.5407 76.1109 29.7062C76.7547 29.8534 77.5548 29.9821 78.5112 30.0925C79.4861 30.1844 80.5345 30.304 81.6564 30.4511C82.7784 30.5983 83.8176 30.8374 84.7741 31.1685C85.7489 31.4995 86.5582 31.9778 87.202 32.6031C87.8457 33.2101 88.1676 34.0378 88.1676 35.0862C88.1676 36.1714 87.8733 37.0819 87.2847 37.8176C86.6962 38.5717 85.942 39.1787 85.0224 39.6385C84.1027 40.0983 83.0727 40.4202 81.9323 40.6041C80.8104 40.8065 79.6976 40.9076 78.594 40.9076C77.8583 40.9076 77.0949 40.8524 76.304 40.7421C75.5131 40.6317 74.7406 40.4662 73.9865 40.2455C73.2324 40.0248 72.5059 39.7581 71.8069 39.4454C71.108 39.1327 70.4734 38.774 69.9032 38.3694L71.0068 34.2309ZM78.7595 15.4975C78.0054 15.4975 77.3249 15.6447 76.7179 15.939C76.1109 16.2332 75.5867 16.6471 75.1453 17.1805C74.7038 17.6955 74.3636 18.3209 74.1245 19.0566C73.8853 19.7739 73.7658 20.5648 73.7658 21.4293C73.7658 22.2754 73.8578 23.0663 74.0417 23.802C74.2256 24.5193 74.5199 25.1447 74.9246 25.6781C75.3476 26.1931 75.881 26.5978 76.5248 26.8921C77.1869 27.1864 77.987 27.3335 78.9251 27.3335C79.7895 27.3335 80.5161 27.1588 81.1046 26.8093C81.6932 26.4414 82.1623 25.9632 82.5117 25.3746C82.8796 24.786 83.1371 24.1147 83.2842 23.3606C83.4498 22.6065 83.5325 21.834 83.5325 21.043C83.5325 20.2338 83.4314 19.4888 83.2291 18.8083C83.0267 18.1277 82.7232 17.5484 82.3186 17.0701C81.9139 16.5735 81.4081 16.1873 80.8012 15.9114C80.2126 15.6355 79.532 15.4975 78.7595 15.4975ZM98.4107 33.8723C96.8841 33.8723 95.5506 33.6056 94.4102 33.0722C93.2698 32.5388 92.3042 31.8306 91.5133 30.9477C90.7408 30.0649 90.1522 29.0625 89.7475 27.9405C89.3613 26.8185 89.159 25.6689 89.1406 24.4918C89.1406 23.3146 89.3245 22.165 89.6924 21.043C90.0786 19.9211 90.658 18.9186 91.4305 18.0358C92.2214 17.1529 93.1963 16.4448 94.355 15.9114C95.5322 15.378 96.9117 15.1113 98.4935 15.1113C99.5603 15.1113 100.544 15.2492 101.446 15.5251C102.365 15.801 103.193 16.1873 103.929 16.6839C104.664 17.1805 105.299 17.7783 105.832 18.4772C106.366 19.1578 106.798 19.9119 107.129 20.7396C106.908 20.7763 106.568 20.8407 106.108 20.9327C105.648 21.0063 105.106 21.0982 104.48 21.2086C103.873 21.3189 103.193 21.4385 102.439 21.5673C101.685 21.696 100.903 21.834 100.094 21.9811C101.308 21.9995 102.347 22.1834 103.211 22.5329C104.094 22.864 104.812 23.2962 105.363 23.8296C105.934 24.3446 106.338 24.9424 106.577 25.6229C106.835 26.2851 106.936 26.9656 106.881 27.6646C106.844 28.3451 106.66 29.0257 106.329 29.7062C106.016 30.3684 105.566 30.9569 104.977 31.472C104.149 32.2077 103.193 32.7963 102.108 33.2377C101.023 33.6607 99.7902 33.8723 98.4107 33.8723ZM92.8376 23.2778C92.764 24.3998 92.8008 25.5678 92.948 26.7817C93.0951 27.9773 93.3894 29.0808 93.8308 30.0925C94.2723 31.0857 94.87 31.9134 95.6242 32.5755C96.3783 33.2193 97.3347 33.5504 98.4935 33.5688C99.8178 33.5504 100.995 33.3389 102.025 32.9342C103.073 32.5112 103.993 31.9502 104.784 31.2512C105.685 30.4419 106.255 29.4947 106.494 28.4095C106.734 27.3243 106.614 26.2943 106.136 25.3195C105.842 24.7309 105.474 24.2435 105.032 23.8572C104.591 23.4709 104.094 23.1675 103.542 22.9467C103.009 22.7076 102.43 22.5421 101.804 22.4501C101.179 22.3582 100.544 22.3122 99.9006 22.3122C99.2384 22.3122 98.5763 22.349 97.9141 22.4225C97.2703 22.4961 96.6358 22.5881 96.0104 22.6984C95.4034 22.7904 94.8241 22.8916 94.2723 23.0019C93.7389 23.1123 93.2606 23.2042 92.8376 23.2778ZM92.8376 22.9743C93.4814 22.864 94.1619 22.7444 94.8792 22.6157C95.615 22.4869 96.3691 22.349 97.1416 22.2018C98.3371 21.9995 99.5143 21.7972 100.673 21.5948C101.85 21.3741 102.917 21.181 103.873 21.0155C103.726 20.2981 103.515 19.6084 103.239 18.9462C102.981 18.2657 102.632 17.6679 102.19 17.1529C101.767 16.6195 101.243 16.1965 100.618 15.8838C100.011 15.5711 99.2936 15.4148 98.4659 15.4148C97.4359 15.4148 96.5714 15.6539 95.8725 16.1321C95.1919 16.5919 94.6309 17.1897 94.1895 17.9254C93.7664 18.6611 93.4446 19.4796 93.2239 20.3809C93.0215 21.2638 92.8928 22.1282 92.8376 22.9743ZM109.105 33.5688C110.007 33.5688 110.586 33.3389 110.844 32.879C111.119 32.4008 111.267 31.6651 111.285 30.6719V19.029C111.285 18.4588 111.276 17.953 111.257 17.5116C111.257 17.0701 111.202 16.7023 111.092 16.408C111 16.0953 110.834 15.8562 110.595 15.6906C110.356 15.5251 110.007 15.4239 109.547 15.3872V15.1113C109.933 15.0745 110.356 15.0193 110.816 14.9457C111.294 14.8722 111.763 14.7802 112.223 14.6698C112.701 14.5595 113.17 14.4399 113.63 14.3112C114.09 14.164 114.504 14.0077 114.872 13.8421V21.8156C115.037 20.9327 115.276 20.0958 115.589 19.3049C115.902 18.4956 116.297 17.7875 116.775 17.1805C117.254 16.5735 117.824 16.0861 118.486 15.7182C119.166 15.332 119.948 15.1297 120.831 15.1113C122.247 15.0561 123.516 15.24 124.638 15.6631C125.76 16.0861 126.708 16.7115 127.48 17.5392C128.271 18.3485 128.878 19.3417 129.301 20.5188C129.724 21.6776 129.954 22.9835 129.991 24.4366V30.6994C130.009 31.6743 130.147 32.4008 130.405 32.879C130.681 33.3389 131.269 33.5688 132.17 33.5688V33.8447C131.527 33.8079 130.883 33.7803 130.239 33.7619C129.614 33.7435 129.007 33.7343 128.418 33.7343C127.83 33.7343 127.278 33.7435 126.763 33.7619C126.266 33.7619 125.834 33.7711 125.466 33.7895C125.025 33.8079 124.629 33.8263 124.28 33.8447V33.5688C124.776 33.5688 125.163 33.5136 125.438 33.4032C125.733 33.2929 125.953 33.1273 126.101 32.9066C126.248 32.6675 126.34 32.364 126.377 31.9962C126.432 31.6283 126.459 31.1961 126.459 30.6994V24.7401C126.459 23.5077 126.377 22.3214 126.211 21.181C126.045 20.0406 125.751 19.0382 125.328 18.1737C124.905 17.2908 124.326 16.6011 123.59 16.1045C122.873 15.6079 121.944 15.3688 120.803 15.3872C119.792 15.4239 118.918 15.7274 118.182 16.2976C117.447 16.8494 116.84 17.5667 116.361 18.4496C115.883 19.3325 115.515 20.3165 115.258 21.4017C115.019 22.4869 114.89 23.5629 114.872 24.6297V30.8374C114.89 31.7754 115.037 32.4652 115.313 32.9066C115.607 33.3481 116.187 33.5688 117.051 33.5688V33.8447C116.132 33.8079 115.387 33.7803 114.816 33.7619C114.246 33.7251 113.713 33.7067 113.216 33.7067C112.683 33.7067 112.131 33.7251 111.561 33.7619C110.991 33.7803 110.227 33.8079 109.271 33.8447H109.105V33.5688ZM143.433 33.8723C141.906 33.8723 140.572 33.6056 139.432 33.0722C138.292 32.5388 137.326 31.8306 136.535 30.9477C135.763 30.0649 135.174 29.0625 134.769 27.9405C134.383 26.8185 134.181 25.6689 134.162 24.4918C134.162 23.3146 134.346 22.165 134.714 21.043C135.1 19.9211 135.68 18.9186 136.452 18.0358C137.243 17.1529 138.218 16.4448 139.377 15.9114C140.554 15.378 141.934 15.1113 143.515 15.1113C144.582 15.1113 145.566 15.2492 146.467 15.5251C147.387 15.801 148.215 16.1873 148.95 16.6839C149.686 17.1805 150.321 17.7783 150.854 18.4772C151.388 19.1578 151.82 19.9119 152.151 20.7396C151.93 20.7763 151.59 20.8407 151.13 20.9327C150.67 21.0063 150.128 21.0982 149.502 21.2086C148.895 21.3189 148.215 21.4385 147.461 21.5673C146.707 21.696 145.925 21.834 145.116 21.9811C146.329 21.9995 147.369 22.1834 148.233 22.5329C149.116 22.864 149.833 23.2962 150.385 23.8296C150.955 24.3446 151.36 24.9424 151.599 25.6229C151.857 26.2851 151.958 26.9656 151.903 27.6646C151.866 28.3451 151.682 29.0257 151.351 29.7062C151.038 30.3684 150.587 30.9569 149.999 31.472C149.171 32.2077 148.215 32.7963 147.13 33.2377C146.044 33.6607 144.812 33.8723 143.433 33.8723ZM137.859 23.2778C137.786 24.3998 137.823 25.5678 137.97 26.7817C138.117 27.9773 138.411 29.0808 138.853 30.0925C139.294 31.0857 139.892 31.9134 140.646 32.5755C141.4 33.2193 142.357 33.5504 143.515 33.5688C144.84 33.5504 146.017 33.3389 147.047 32.9342C148.095 32.5112 149.015 31.9502 149.806 31.2512C150.707 30.4419 151.277 29.4947 151.516 28.4095C151.755 27.3243 151.636 26.2943 151.158 25.3195C150.863 24.7309 150.496 24.2435 150.054 23.8572C149.613 23.4709 149.116 23.1675 148.564 22.9467C148.031 22.7076 147.451 22.5421 146.826 22.4501C146.201 22.3582 145.566 22.3122 144.922 22.3122C144.26 22.3122 143.598 22.349 142.936 22.4225C142.292 22.4961 141.658 22.5881 141.032 22.6984C140.425 22.7904 139.846 22.8916 139.294 23.0019C138.761 23.1123 138.282 23.2042 137.859 23.2778ZM137.859 22.9743C138.503 22.864 139.184 22.7444 139.901 22.6157C140.637 22.4869 141.391 22.349 142.163 22.2018C143.359 21.9995 144.536 21.7972 145.695 21.5948C146.872 21.3741 147.939 21.181 148.895 21.0155C148.748 20.2981 148.537 19.6084 148.261 18.9462C148.003 18.2657 147.654 17.6679 147.212 17.1529C146.789 16.6195 146.265 16.1965 145.64 15.8838C145.033 15.5711 144.315 15.4148 143.488 15.4148C142.458 15.4148 141.593 15.6539 140.894 16.1321C140.214 16.5919 139.653 17.1897 139.211 17.9254C138.788 18.6611 138.466 19.4796 138.246 20.3809C138.043 21.2638 137.915 22.1282 137.859 22.9743ZM156.417 23.6365C155.865 23.2134 155.452 22.7076 155.176 22.119C154.918 21.5305 154.799 20.9235 154.817 20.2981C154.835 19.6544 155.001 19.029 155.314 18.422C155.645 17.7967 156.123 17.2449 156.748 16.7666C157.374 16.27 158.155 15.8746 159.093 15.5803C160.05 15.2676 161.172 15.1113 162.459 15.1113C163.14 15.1113 163.756 15.1481 164.308 15.2216C164.878 15.2768 165.411 15.3596 165.908 15.4699C166.423 15.5619 166.91 15.6815 167.37 15.8286C167.83 15.9757 168.299 16.1321 168.777 16.2976L167.757 20.2981H167.536C167.444 19.5808 167.26 18.9186 166.984 18.3117C166.727 17.7047 166.386 17.1897 165.963 16.7666C165.559 16.3252 165.08 15.9849 164.529 15.7458C163.977 15.4883 163.361 15.3596 162.68 15.3596C161.448 15.3596 160.436 15.5803 159.645 16.0217C158.873 16.4632 158.312 16.9874 157.962 17.5943C157.631 18.1829 157.512 18.7991 157.604 19.4428C157.695 20.0682 158.008 20.574 158.542 20.9603C159.001 21.2914 159.654 21.5673 160.5 21.788C161.365 21.9903 162.275 22.2018 163.232 22.4225C164.188 22.6249 165.126 22.8732 166.046 23.1675C166.984 23.4434 167.757 23.8112 168.364 24.271C168.934 24.7125 169.366 25.2551 169.66 25.8988C169.973 26.5426 170.12 27.2231 170.102 27.9405C170.083 28.6394 169.899 29.3475 169.55 30.0649C169.2 30.7638 168.658 31.3984 167.922 31.9686C167.205 32.5204 166.285 32.971 165.163 33.3205C164.041 33.6699 162.708 33.8447 161.163 33.8447C159.857 33.8447 158.652 33.7159 157.548 33.4584C156.445 33.1825 155.304 32.7411 154.127 32.1341L155.258 28.0784H155.396C155.488 28.9061 155.7 29.6602 156.031 30.3408C156.362 31.0029 156.785 31.5731 157.3 32.0513C157.833 32.5296 158.45 32.9066 159.149 33.1825C159.866 33.44 160.638 33.5688 161.466 33.5688C162.846 33.5688 163.949 33.3113 164.777 32.7963C165.605 32.2629 166.193 31.6467 166.543 30.9477C166.91 30.2304 167.048 29.5131 166.956 28.7958C166.883 28.0784 166.616 27.5174 166.156 27.1128C165.733 26.7449 165.108 26.4598 164.28 26.2575C163.471 26.0368 162.597 25.8253 161.659 25.6229C160.721 25.4206 159.783 25.1723 158.845 24.878C157.907 24.5837 157.098 24.1699 156.417 23.6365ZM172.098 33.5688C173 33.5688 173.579 33.3389 173.836 32.879C174.112 32.4008 174.259 31.6651 174.278 30.6719V20.2981C174.278 19.7279 174.269 19.2221 174.25 18.7807C174.25 18.3393 174.195 17.9714 174.085 17.6771C173.993 17.3644 173.827 17.1253 173.588 16.9598C173.349 16.7942 173 16.6931 172.54 16.6563V16.3804C172.926 16.3436 173.349 16.2884 173.809 16.2149C174.287 16.1413 174.756 16.0493 175.216 15.939C175.694 15.8286 176.163 15.709 176.623 15.5803C177.083 15.4331 177.497 15.2768 177.865 15.1113V30.8374C177.883 31.7754 178.03 32.4652 178.306 32.9066C178.6 33.3481 179.18 33.5688 180.044 33.5688V33.8447C179.492 33.8079 178.839 33.7803 178.085 33.7619C177.331 33.7435 176.531 33.7343 175.685 33.7343C175.096 33.7343 174.499 33.7435 173.892 33.7619C173.285 33.7803 172.687 33.8079 172.098 33.8447V33.5688ZM173.947 11.7729C173.947 11.1659 174.131 10.6509 174.499 10.2279C174.866 9.80485 175.345 9.59333 175.933 9.59333C176.559 9.59333 177.046 9.81404 177.395 10.2555C177.763 10.6785 177.947 11.1843 177.947 11.7729C177.947 12.3431 177.754 12.8397 177.368 13.2628C177 13.6858 176.522 13.8973 175.933 13.8973C175.363 13.8973 174.885 13.7134 174.499 13.3455C174.131 12.9593 173.947 12.4351 173.947 11.7729ZM183.495 23.6365C182.943 23.2134 182.529 22.7076 182.253 22.119C181.996 21.5305 181.876 20.9235 181.895 20.2981C181.913 19.6544 182.079 19.029 182.391 18.422C182.722 17.7967 183.201 17.2449 183.826 16.7666C184.451 16.27 185.233 15.8746 186.171 15.5803C187.128 15.2676 188.25 15.1113 189.537 15.1113C190.218 15.1113 190.834 15.1481 191.386 15.2216C191.956 15.2768 192.489 15.3596 192.986 15.4699C193.501 15.5619 193.988 15.6815 194.448 15.8286C194.908 15.9757 195.377 16.1321 195.855 16.2976L194.834 20.2981H194.614C194.522 19.5808 194.338 18.9186 194.062 18.3117C193.804 17.7047 193.464 17.1897 193.041 16.7666C192.636 16.3252 192.158 15.9849 191.606 15.7458C191.055 15.4883 190.438 15.3596 189.758 15.3596C188.525 15.3596 187.514 15.5803 186.723 16.0217C185.95 16.4632 185.389 16.9874 185.04 17.5943C184.709 18.1829 184.589 18.7991 184.681 19.4428C184.773 20.0682 185.086 20.574 185.619 20.9603C186.079 21.2914 186.732 21.5673 187.578 21.788C188.443 21.9903 189.353 22.2018 190.31 22.4225C191.266 22.6249 192.204 22.8732 193.124 23.1675C194.062 23.4434 194.834 23.8112 195.441 24.271C196.011 24.7125 196.444 25.2551 196.738 25.8988C197.051 26.5426 197.198 27.2231 197.179 27.9405C197.161 28.6394 196.977 29.3475 196.628 30.0649C196.278 30.7638 195.736 31.3984 195 31.9686C194.283 32.5204 193.363 32.971 192.241 33.3205C191.119 33.6699 189.785 33.8447 188.24 33.8447C186.934 33.8447 185.73 33.7159 184.626 33.4584C183.523 33.1825 182.382 32.7411 181.205 32.1341L182.336 28.0784H182.474C182.566 28.9061 182.778 29.6602 183.109 30.3408C183.44 31.0029 183.863 31.5731 184.378 32.0513C184.911 32.5296 185.527 32.9066 186.226 33.1825C186.944 33.44 187.716 33.5688 188.544 33.5688C189.923 33.5688 191.027 33.3113 191.855 32.7963C192.682 32.2629 193.271 31.6467 193.62 30.9477C193.988 30.2304 194.126 29.5131 194.034 28.7958C193.961 28.0784 193.694 27.5174 193.234 27.1128C192.811 26.7449 192.186 26.4598 191.358 26.2575C190.549 26.0368 189.675 25.8253 188.737 25.6229C187.799 25.4206 186.861 25.1723 185.923 24.878C184.985 24.5837 184.175 24.1699 183.495 23.6365Z" fill="white"/>
<g filter="url(#filter0_b_36_41)">
<path d="M48.6 27.0864L55.5824 22.1593L64.5435 21.6543L57.4016 27.4988L48.6 27.0864Z" fill="#111111"/>
<path d="M48.6 27.0864L55.5824 22.1593L64.5435 21.6543L57.4016 27.4988L48.6 27.0864Z" fill="url(#paint0_radial_36_41)"/>
<path d="M57.916 29.0086L43.3407 28.8783L61.5105 39.5588L57.916 29.0086Z" fill="#111111"/>
<path d="M57.916 29.0086L43.3407 28.8783L61.5105 39.5588L57.916 29.0086Z" fill="url(#paint1_radial_36_41)"/>
<path d="M69.3247 20.0253L57.916 29.0086L61.5105 39.5588L69.3247 20.0253Z" fill="#111111"/>
<path d="M69.3247 20.0253L57.916 29.0086L61.5105 39.5588L69.3247 20.0253Z" fill="url(#paint2_radial_36_41)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M55.0743 20.6679L43.3407 28.8783L57.916 29.0086L69.3247 20.0253L55.0743 20.6679ZM55.5824 22.1593L48.6 27.0864L57.4016 27.4988L64.5435 21.6543L55.5824 22.1593Z" fill="#111111"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M55.0743 20.6679L43.3407 28.8783L57.916 29.0086L69.3247 20.0253L55.0743 20.6679ZM55.5824 22.1593L48.6 27.0864L57.4016 27.4988L64.5435 21.6543L55.5824 22.1593Z" fill="url(#paint3_radial_36_41)"/>
<path d="M43.3407 28.8783L55.0743 20.6679L69.3247 20.0253M43.3407 28.8783L57.916 29.0086M43.3407 28.8783L61.5105 39.5588M69.3247 20.0253L57.916 29.0086M69.3247 20.0253L61.5105 39.5588M57.916 29.0086L61.5105 39.5588M48.6 27.0864L55.5824 22.1593L64.5435 21.6543L57.4016 27.4988L48.6 27.0864Z" stroke="white" stroke-width="0.257675"/>
</g>
<path d="M48.6 27.0864L55.5824 22.1593L64.5435 21.6543L57.4016 27.4988L48.6 27.0864Z" fill="black"/>
<path d="M48.6 27.0864L55.5824 22.1593L64.5435 21.6543L57.4016 27.4988L48.6 27.0864Z" fill="white"/>
<path d="M43.3407 28.8783L55.0743 20.6679L69.3247 20.0253M43.3407 28.8783L57.916 29.0086M43.3407 28.8783L61.5105 39.5588M69.3247 20.0253L57.916 29.0086M69.3247 20.0253L61.5105 39.5588M57.916 29.0086L61.5105 39.5588M48.6 27.0864L55.5824 22.1593L64.5435 21.6543L57.4016 27.4988L48.6 27.0864Z" stroke="white" stroke-width="0.257675"/>
<g filter="url(#filter1_b_36_41)">
<path d="M41.9619 24.5946L49.8057 5.33745L68.2354 15.643L56.316 24.4454L41.9619 24.5946Z" fill="url(#paint4_radial_36_41)"/>
<path d="M49.8057 5.33745L41.9619 24.5946L56.316 24.4454M49.8057 5.33745L68.2354 15.643L56.316 24.4454M49.8057 5.33745L56.316 24.4454" stroke="white" stroke-width="0.257675"/>
</g>
<defs>
<filter id="filter0_b_36_41" x="38.6822" y="15.4674" width="35.2566" height="28.6988" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2.21014"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_36_41"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_36_41" result="shape"/>
</filter>
<filter id="filter1_b_36_41" x="36.7165" y="0.100828" width="36.8091" height="29.6776" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2.52651"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_36_41"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_36_41" result="shape"/>
</filter>
<radialGradient id="paint0_radial_36_41" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(63.4665 22.2155) rotate(102.117) scale(16.9783 23.346)">
<stop stop-color="white"/>
<stop offset="0.174939" stop-color="#651DFF"/>
<stop offset="1" stop-color="#FE3636"/>
</radialGradient>
<radialGradient id="paint1_radial_36_41" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(63.4665 22.2155) rotate(102.117) scale(16.9783 23.346)">
<stop stop-color="white"/>
<stop offset="0.174939" stop-color="#651DFF"/>
<stop offset="1" stop-color="#FE3636"/>
</radialGradient>
<radialGradient id="paint2_radial_36_41" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(63.4665 22.2155) rotate(102.117) scale(16.9783 23.346)">
<stop stop-color="white"/>
<stop offset="0.174939" stop-color="#651DFF"/>
<stop offset="1" stop-color="#FE3636"/>
</radialGradient>
<radialGradient id="paint3_radial_36_41" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(63.4665 22.2155) rotate(102.117) scale(16.9783 23.346)">
<stop stop-color="white"/>
<stop offset="0.174939" stop-color="#651DFF"/>
<stop offset="1" stop-color="#FE3636"/>
</radialGradient>
<radialGradient id="paint4_radial_36_41" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(47.4571 11.9609) rotate(20.8574) scale(21.3373 29.3388)">
<stop stop-color="#FF2B5E"/>
<stop offset="0.395" stop-color="#651DFF"/>
<stop offset="1" stop-color="#111111"/>
</radialGradient>
</defs>
            </svg>

            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <Input
                    name="Enter your email"
                    value={email}
                    type={"email"}
                    callback={(e) => setEmail(e.target.value)}
                />
                <Input
                    name="Enter your password"
                    type={"password"}
                    value={password}
                    callback={(e) => setPassword(e.target.value)}
                />
                <RainbowButton height='7vh' classes='rounded-full' type="submit">Login</RainbowButton>
                {error && <p className="text-red-500">{error}</p>}
                <p>
                    Don&#39;t have an account?
                    <Link className="font-bold text-[#651DFF]" href={"/sign-up"}>
                    &nbsp;Register
                    </Link>
                </p>
            </form>
        </div>
  )
}