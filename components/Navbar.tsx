"use client";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  const nonNavPaths = ["/sign-in", "/sign-up"];
  if (nonNavPaths.includes(pathname)) {
    return;
  }

  if (pathname == "/events") {
    return (
      <div className="flex flex-row ml-[10vw] bg-[#19171D] fixed bottom-[5vh] rounded-full w-[80vw] h-[8vh] items-center justify-between pr-[10vw]">
        <img className="w-[67px]" src="/event_active_nav.png" alt="" />
        <a href="/calendar">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7754 6.38293V5.27898C12.7754 4.98619 12.8917 4.70539 13.0987 4.49836C13.3057 4.29133 13.5865 4.17502 13.8793 4.17502C14.1721 4.17502 14.4529 4.29133 14.6599 4.49836C14.867 4.70539 14.9833 4.98619 14.9833 5.27898V6.38293H18.2952V5.27898C18.2952 4.98619 18.4115 4.70539 18.6185 4.49836C18.8255 4.29133 19.1063 4.17502 19.3991 4.17502C19.6919 4.17502 19.9727 4.29133 20.1797 4.49836C20.3868 4.70539 20.5031 4.98619 20.5031 5.27898V6.38293H21.607C22.4854 6.38293 23.3278 6.73186 23.9489 7.35296C24.57 7.97406 24.9189 8.81644 24.9189 9.69481V20.7344C24.9189 21.6127 24.57 22.4551 23.9489 23.0762C23.3278 23.6973 22.4854 24.0463 21.607 24.0463H6.15163C5.27326 24.0463 4.43087 23.6973 3.80978 23.0762C3.18868 22.4551 2.83975 21.6127 2.83975 20.7344L2.83975 9.69481C2.83975 8.81644 3.18868 7.97406 3.80978 7.35296C4.43087 6.73186 5.27326 6.38293 6.15163 6.38293H7.25558V5.27898C7.25558 4.98619 7.37189 4.70539 7.57893 4.49836C7.78596 4.29133 8.06675 4.17502 8.35954 4.17502C8.65233 4.17502 8.93313 4.29133 9.14016 4.49836C9.34719 4.70539 9.4635 4.98619 9.4635 5.27898V6.38293H12.7754ZM12.7754 8.59085H9.4635V9.69481C9.4635 9.98759 9.34719 10.2684 9.14016 10.4754C8.93313 10.6825 8.65233 10.7988 8.35954 10.7988C8.06675 10.7988 7.78596 10.6825 7.57893 10.4754C7.37189 10.2684 7.25558 9.98759 7.25558 9.69481V8.59085H6.15163C5.85884 8.59085 5.57804 8.70716 5.37101 8.91419C5.16398 9.12122 5.04767 9.40202 5.04767 9.69481V20.7344C5.04767 21.0272 5.16398 21.308 5.37101 21.515C5.57804 21.722 5.85884 21.8383 6.15163 21.8383H21.607C21.8998 21.8383 22.1806 21.722 22.3877 21.515C22.5947 21.308 22.711 21.0272 22.711 20.7344V9.69481C22.711 9.40202 22.5947 9.12122 22.3877 8.91419C22.1806 8.70716 21.8998 8.59085 21.607 8.59085H20.5031V9.69481C20.5031 9.98759 20.3868 10.2684 20.1797 10.4754C19.9727 10.6825 19.6919 10.7988 19.3991 10.7988C19.1063 10.7988 18.8255 10.6825 18.6185 10.4754C18.4115 10.2684 18.2952 9.98759 18.2952 9.69481V8.59085H14.9833V9.69481C14.9833 9.98759 14.867 10.2684 14.6599 10.4754C14.4529 10.6825 14.1721 10.7988 13.8793 10.7988C13.5865 10.7988 13.3057 10.6825 13.0987 10.4754C12.8917 10.2684 12.7754 9.98759 12.7754 9.69481V8.59085ZM6.15163 13.0067H8.35954V15.2146H6.15163V13.0067ZM6.15163 17.4225H8.35954V19.6304H6.15163V17.4225ZM19.3991 17.4225H21.607V19.6304H19.3991V17.4225ZM19.3991 13.0067H21.607V15.2146H19.3991V13.0067ZM10.5675 13.0067H12.7754V15.2146H10.5675V13.0067ZM14.9833 13.0067H17.1912V15.2146H14.9833V13.0067ZM14.9833 17.4225H17.1912V19.6304H14.9833V17.4225ZM10.5675 17.4225H12.7754V19.6304H10.5675V17.4225Z"
              fill="white"
              fill-opacity="0.4"
            />
          </svg>
        </a>

        <a href="/dashboard">
          <svg
            width="27"
            height="28"
            viewBox="0 0 27 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M22.4752 23.0509V11.0531L13.6436 5.75408L4.81192 11.0531V23.0509H9.22775V20.015C9.22775 18.8439 9.69299 17.7207 10.5211 16.8925C11.3492 16.0644 12.4724 15.5992 13.6436 15.5992C14.8147 15.5992 15.9379 16.0644 16.766 16.8925C17.5942 17.7207 18.0594 18.8439 18.0594 20.015V23.0509H22.4752ZM15.8515 25.2588V20.015C15.8515 19.4294 15.6189 18.8678 15.2048 18.4538C14.7908 18.0397 14.2292 17.8071 13.6436 17.8071C13.058 17.8071 12.4964 18.0397 12.0824 18.4538C11.6683 18.8678 11.4357 19.4294 11.4357 20.015V25.2588H4.81192C4.22634 25.2588 3.66475 25.0262 3.25069 24.6121C2.83662 24.1981 2.604 23.6365 2.604 23.0509V11.0531C2.604 10.6718 2.70273 10.297 2.89058 9.96523C3.07844 9.63344 3.34901 9.35596 3.67595 9.15979L12.5076 3.86079C12.8508 3.6549 13.2434 3.54614 13.6436 3.54614C14.0438 3.54614 14.4364 3.6549 14.7796 3.86079L23.6112 9.15979C23.9382 9.35596 24.2087 9.63344 24.3966 9.96523C24.5844 10.297 24.6832 10.6718 24.6832 11.0531V23.0509C24.6832 23.6365 24.4505 24.1981 24.0365 24.6121C23.6224 25.0262 23.0608 25.2588 22.4752 25.2588H15.8515Z"
              fill="white"
            />
          </svg>
        </a>

        <a href="/map">
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.4">
              <path
                d="M11.9552 22.6885L12.7688 23.7501L13.5824 22.6885C15.9329 19.6212 17.7187 16.9672 18.9214 14.7336C20.1078 12.5303 20.7938 10.6166 20.7938 9.065C20.7938 6.93664 19.9483 4.89545 18.4433 3.39047C16.9384 1.88549 14.8972 1.04 12.7688 1.04C10.6404 1.04 8.59925 1.88549 7.09427 3.39047C5.58929 4.89545 4.7438 6.93664 4.7438 9.065C4.7438 10.6166 5.42984 12.5303 6.61619 14.7336C7.81887 16.9672 9.60466 19.6212 11.9552 22.6885ZM14.8724 11.1686C14.3145 11.7266 13.5578 12.04 12.7688 12.04C11.9798 12.04 11.2231 11.7266 10.6652 11.1686C10.1072 10.6107 9.7938 9.85402 9.7938 9.065C9.7938 8.27598 10.1072 7.51928 10.6652 6.96136C11.2231 6.40344 11.9798 6.09 12.7688 6.09C13.5578 6.09 14.3145 6.40344 14.8724 6.96136C15.4304 7.51928 15.7438 8.27598 15.7438 9.065C15.7438 9.85402 15.4304 10.6107 14.8724 11.1686Z"
                stroke="white"
                stroke-width="2.05"
              />
            </g>
          </svg>
        </a>

        <a href="/profile">
          <svg
            width="21"
            height="25"
            viewBox="0 0 21 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_36_48" fill="white">
              <path d="M0.330322 20.5418C0.330322 17.1211 3.10337 14.3481 6.52409 14.3481H14.363C17.7837 14.3481 20.5568 17.1211 20.5568 20.5418V23.4789C20.5568 24.2226 19.9539 24.8254 19.2103 24.8254H1.67679C0.933158 24.8254 0.330322 24.2226 0.330322 23.4789V20.5418Z" />
            </mask>
            <path
              d="M0.330322 20.5418C0.330322 17.1211 3.10337 14.3481 6.52409 14.3481H14.363C17.7837 14.3481 20.5568 17.1211 20.5568 20.5418V23.4789C20.5568 24.2226 19.9539 24.8254 19.2103 24.8254H1.67679C0.933158 24.8254 0.330322 24.2226 0.330322 23.4789V20.5418Z"
              stroke="white"
              stroke-opacity="0.4"
              stroke-width="4.1082"
              mask="url(#path-1-inside-1_36_48)"
            />
            <circle
              cx="10.4434"
              cy="6.58845"
              r="4.58142"
              stroke="white"
              stroke-opacity="0.4"
              stroke-width="2.0541"
            />
          </svg>
        </a>
      </div>
    );
  }

  if (pathname == "/profile") {
    return (
      <div className="flex flex-row ml-[10vw] bg-[#19171D] fixed bottom-[5vh] rounded-full w-[80vw] h-[8vh] items-center justify-between pl-[10vw]">
        <a href="/events">
          <img className="w-[27px]" src="/nav_icon_1.png" alt="" />
        </a>

        <a href="/calendar">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7754 6.38293V5.27898C12.7754 4.98619 12.8917 4.70539 13.0987 4.49836C13.3057 4.29133 13.5865 4.17502 13.8793 4.17502C14.1721 4.17502 14.4529 4.29133 14.6599 4.49836C14.867 4.70539 14.9833 4.98619 14.9833 5.27898V6.38293H18.2952V5.27898C18.2952 4.98619 18.4115 4.70539 18.6185 4.49836C18.8255 4.29133 19.1063 4.17502 19.3991 4.17502C19.6919 4.17502 19.9727 4.29133 20.1797 4.49836C20.3868 4.70539 20.5031 4.98619 20.5031 5.27898V6.38293H21.607C22.4854 6.38293 23.3278 6.73186 23.9489 7.35296C24.57 7.97406 24.9189 8.81644 24.9189 9.69481V20.7344C24.9189 21.6127 24.57 22.4551 23.9489 23.0762C23.3278 23.6973 22.4854 24.0463 21.607 24.0463H6.15163C5.27326 24.0463 4.43087 23.6973 3.80978 23.0762C3.18868 22.4551 2.83975 21.6127 2.83975 20.7344L2.83975 9.69481C2.83975 8.81644 3.18868 7.97406 3.80978 7.35296C4.43087 6.73186 5.27326 6.38293 6.15163 6.38293H7.25558V5.27898C7.25558 4.98619 7.37189 4.70539 7.57893 4.49836C7.78596 4.29133 8.06675 4.17502 8.35954 4.17502C8.65233 4.17502 8.93313 4.29133 9.14016 4.49836C9.34719 4.70539 9.4635 4.98619 9.4635 5.27898V6.38293H12.7754ZM12.7754 8.59085H9.4635V9.69481C9.4635 9.98759 9.34719 10.2684 9.14016 10.4754C8.93313 10.6825 8.65233 10.7988 8.35954 10.7988C8.06675 10.7988 7.78596 10.6825 7.57893 10.4754C7.37189 10.2684 7.25558 9.98759 7.25558 9.69481V8.59085H6.15163C5.85884 8.59085 5.57804 8.70716 5.37101 8.91419C5.16398 9.12122 5.04767 9.40202 5.04767 9.69481V20.7344C5.04767 21.0272 5.16398 21.308 5.37101 21.515C5.57804 21.722 5.85884 21.8383 6.15163 21.8383H21.607C21.8998 21.8383 22.1806 21.722 22.3877 21.515C22.5947 21.308 22.711 21.0272 22.711 20.7344V9.69481C22.711 9.40202 22.5947 9.12122 22.3877 8.91419C22.1806 8.70716 21.8998 8.59085 21.607 8.59085H20.5031V9.69481C20.5031 9.98759 20.3868 10.2684 20.1797 10.4754C19.9727 10.6825 19.6919 10.7988 19.3991 10.7988C19.1063 10.7988 18.8255 10.6825 18.6185 10.4754C18.4115 10.2684 18.2952 9.98759 18.2952 9.69481V8.59085H14.9833V9.69481C14.9833 9.98759 14.867 10.2684 14.6599 10.4754C14.4529 10.6825 14.1721 10.7988 13.8793 10.7988C13.5865 10.7988 13.3057 10.6825 13.0987 10.4754C12.8917 10.2684 12.7754 9.98759 12.7754 9.69481V8.59085ZM6.15163 13.0067H8.35954V15.2146H6.15163V13.0067ZM6.15163 17.4225H8.35954V19.6304H6.15163V17.4225ZM19.3991 17.4225H21.607V19.6304H19.3991V17.4225ZM19.3991 13.0067H21.607V15.2146H19.3991V13.0067ZM10.5675 13.0067H12.7754V15.2146H10.5675V13.0067ZM14.9833 13.0067H17.1912V15.2146H14.9833V13.0067ZM14.9833 17.4225H17.1912V19.6304H14.9833V17.4225ZM10.5675 17.4225H12.7754V19.6304H10.5675V17.4225Z"
              fill="white"
              fill-opacity="0.4"
            />
          </svg>
        </a>

        <a href="/dashboard">
          <svg
            width="27"
            height="28"
            viewBox="0 0 27 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M22.4752 23.0509V11.0531L13.6436 5.75408L4.81192 11.0531V23.0509H9.22775V20.015C9.22775 18.8439 9.69299 17.7207 10.5211 16.8925C11.3492 16.0644 12.4724 15.5992 13.6436 15.5992C14.8147 15.5992 15.9379 16.0644 16.766 16.8925C17.5942 17.7207 18.0594 18.8439 18.0594 20.015V23.0509H22.4752ZM15.8515 25.2588V20.015C15.8515 19.4294 15.6189 18.8678 15.2048 18.4538C14.7908 18.0397 14.2292 17.8071 13.6436 17.8071C13.058 17.8071 12.4964 18.0397 12.0824 18.4538C11.6683 18.8678 11.4357 19.4294 11.4357 20.015V25.2588H4.81192C4.22634 25.2588 3.66475 25.0262 3.25069 24.6121C2.83662 24.1981 2.604 23.6365 2.604 23.0509V11.0531C2.604 10.6718 2.70273 10.297 2.89058 9.96523C3.07844 9.63344 3.34901 9.35596 3.67595 9.15979L12.5076 3.86079C12.8508 3.6549 13.2434 3.54614 13.6436 3.54614C14.0438 3.54614 14.4364 3.6549 14.7796 3.86079L23.6112 9.15979C23.9382 9.35596 24.2087 9.63344 24.3966 9.96523C24.5844 10.297 24.6832 10.6718 24.6832 11.0531V23.0509C24.6832 23.6365 24.4505 24.1981 24.0365 24.6121C23.6224 25.0262 23.0608 25.2588 22.4752 25.2588H15.8515Z"
              fill="white"
            />
          </svg>
        </a>

        <a href="/map">
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.4">
              <path
                d="M11.9552 22.6885L12.7688 23.7501L13.5824 22.6885C15.9329 19.6212 17.7187 16.9672 18.9214 14.7336C20.1078 12.5303 20.7938 10.6166 20.7938 9.065C20.7938 6.93664 19.9483 4.89545 18.4433 3.39047C16.9384 1.88549 14.8972 1.04 12.7688 1.04C10.6404 1.04 8.59925 1.88549 7.09427 3.39047C5.58929 4.89545 4.7438 6.93664 4.7438 9.065C4.7438 10.6166 5.42984 12.5303 6.61619 14.7336C7.81887 16.9672 9.60466 19.6212 11.9552 22.6885ZM14.8724 11.1686C14.3145 11.7266 13.5578 12.04 12.7688 12.04C11.9798 12.04 11.2231 11.7266 10.6652 11.1686C10.1072 10.6107 9.7938 9.85402 9.7938 9.065C9.7938 8.27598 10.1072 7.51928 10.6652 6.96136C11.2231 6.40344 11.9798 6.09 12.7688 6.09C13.5578 6.09 14.3145 6.40344 14.8724 6.96136C15.4304 7.51928 15.7438 8.27598 15.7438 9.065C15.7438 9.85402 15.4304 10.6107 14.8724 11.1686Z"
                stroke="white"
                stroke-width="2.05"
              />
            </g>
          </svg>
        </a>

        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="34.8649" cy="34.8939" r="34.4435" fill="#651DFF" />
          <mask id="path-2-inside-1_21_230" fill="white">
            <path d="M26.5209 40.8531C26.5209 37.8825 28.929 35.4744 31.8996 35.4744H38.7072C41.6778 35.4744 44.0859 37.8825 44.0859 40.8531V43.4038C44.0859 44.0495 43.5624 44.573 42.9166 44.573H27.6902C27.0444 44.573 26.5209 44.0495 26.5209 43.4038V40.8531Z" />
          </mask>
          <path
            d="M26.5209 40.8531C26.5209 37.8825 28.929 35.4744 31.8996 35.4744H38.7072C41.6778 35.4744 44.0859 37.8825 44.0859 40.8531V43.4038C44.0859 44.0495 43.5624 44.573 42.9166 44.573H27.6902C27.0444 44.573 26.5209 44.0495 26.5209 43.4038V40.8531Z"
            stroke="white"
            stroke-width="3.56762"
            mask="url(#path-2-inside-1_21_230)"
          />
          <path
            d="M39.2819 28.7358C39.2819 30.9331 37.5006 32.7144 35.3033 32.7144C33.1059 32.7144 31.3246 30.9331 31.3246 28.7358C31.3246 26.5385 33.1059 24.7573 35.3033 24.7573C37.5006 24.7573 39.2819 26.5385 39.2819 28.7358Z"
            stroke="white"
            stroke-width="1.78381"
          />
        </svg>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row ml-[10vw] bg-[#19171D] fixed bottom-[5vh] rounded-full w-[80vw] h-[8vh] items-center justify-between px-[5vw]">
        {pathname == "/events" ? (
          <img className="w-[67px]" src="/event_active_nav.png" alt="" />
        ) : (
          <a href="/events">
            <img className="w-[27px]" src="/nav_icon_1.png" alt="" />
          </a>
        )}

        {pathname == "/calendar" ? (
          <svg
            width="69"
            height="69"
            viewBox="0 0 69 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="34.4435" cy="34.4435" r="34.4435" fill="#651DFF" />
            <path
              d="M32.9356 26.2079V25.104C32.9356 24.8112 33.0519 24.5304 33.259 24.3233C33.466 24.1163 33.7468 24 34.0396 24C34.3324 24 34.6132 24.1163 34.8202 24.3233C35.0272 24.5304 35.1435 24.8112 35.1435 25.104V26.2079H38.4554V25.104C38.4554 24.8112 38.5717 24.5304 38.7788 24.3233C38.9858 24.1163 39.2666 24 39.5594 24C39.8522 24 40.133 24.1163 40.34 24.3233C40.547 24.5304 40.6633 24.8112 40.6633 25.104V26.2079H41.7673C42.6456 26.2079 43.488 26.5568 44.1091 27.1779C44.7302 27.799 45.0792 28.6414 45.0792 29.5198V40.5594C45.0792 41.4377 44.7302 42.2801 44.1091 42.9012C43.488 43.5223 42.6456 43.8712 41.7673 43.8712H26.3119C25.4335 43.8712 24.5911 43.5223 23.97 42.9012C23.3489 42.2801 23 41.4377 23 40.5594V29.5198C23 28.6414 23.3489 27.799 23.97 27.1779C24.5911 26.5568 25.4335 26.2079 26.3119 26.2079H27.4158V25.104C27.4158 24.8112 27.5321 24.5304 27.7392 24.3233C27.9462 24.1163 28.227 24 28.5198 24C28.8126 24 29.0934 24.1163 29.3004 24.3233C29.5074 24.5304 29.6237 24.8112 29.6237 25.104V26.2079H32.9356ZM32.9356 28.4158H29.6237V29.5198C29.6237 29.8126 29.5074 30.0934 29.3004 30.3004C29.0934 30.5074 28.8126 30.6237 28.5198 30.6237C28.227 30.6237 27.9462 30.5074 27.7392 30.3004C27.5321 30.0934 27.4158 29.8126 27.4158 29.5198V28.4158H26.3119C26.0191 28.4158 25.7383 28.5321 25.5313 28.7392C25.3242 28.9462 25.2079 29.227 25.2079 29.5198V40.5594C25.2079 40.8522 25.3242 41.1329 25.5313 41.34C25.7383 41.547 26.0191 41.6633 26.3119 41.6633H41.7673C42.0601 41.6633 42.3409 41.547 42.5479 41.34C42.7549 41.1329 42.8712 40.8522 42.8712 40.5594V29.5198C42.8712 29.227 42.7549 28.9462 42.5479 28.7392C42.3409 28.5321 42.0601 28.4158 41.7673 28.4158H40.6633V29.5198C40.6633 29.8126 40.547 30.0934 40.34 30.3004C40.133 30.5074 39.8522 30.6237 39.5594 30.6237C39.2666 30.6237 38.9858 30.5074 38.7788 30.3004C38.5717 30.0934 38.4554 29.8126 38.4554 29.5198V28.4158H35.1435V29.5198C35.1435 29.8126 35.0272 30.0934 34.8202 30.3004C34.6132 30.5074 34.3324 30.6237 34.0396 30.6237C33.7468 30.6237 33.466 30.5074 33.259 30.3004C33.0519 30.0934 32.9356 29.8126 32.9356 29.5198V28.4158ZM26.3119 32.8317H28.5198V35.0396H26.3119V32.8317ZM26.3119 37.2475H28.5198V39.4554H26.3119V37.2475ZM39.5594 37.2475H41.7673V39.4554H39.5594V37.2475ZM39.5594 32.8317H41.7673V35.0396H39.5594V32.8317ZM30.7277 32.8317H32.9356V35.0396H30.7277V32.8317ZM35.1435 32.8317H37.3515V35.0396H35.1435V32.8317ZM35.1435 37.2475H37.3515V39.4554H35.1435V37.2475ZM30.7277 37.2475H32.9356V39.4554H30.7277V37.2475Z"
              fill="white"
            />
          </svg>
        ) : (
          <a href="/calendar">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7754 6.38293V5.27898C12.7754 4.98619 12.8917 4.70539 13.0987 4.49836C13.3057 4.29133 13.5865 4.17502 13.8793 4.17502C14.1721 4.17502 14.4529 4.29133 14.6599 4.49836C14.867 4.70539 14.9833 4.98619 14.9833 5.27898V6.38293H18.2952V5.27898C18.2952 4.98619 18.4115 4.70539 18.6185 4.49836C18.8255 4.29133 19.1063 4.17502 19.3991 4.17502C19.6919 4.17502 19.9727 4.29133 20.1797 4.49836C20.3868 4.70539 20.5031 4.98619 20.5031 5.27898V6.38293H21.607C22.4854 6.38293 23.3278 6.73186 23.9489 7.35296C24.57 7.97406 24.9189 8.81644 24.9189 9.69481V20.7344C24.9189 21.6127 24.57 22.4551 23.9489 23.0762C23.3278 23.6973 22.4854 24.0463 21.607 24.0463H6.15163C5.27326 24.0463 4.43087 23.6973 3.80978 23.0762C3.18868 22.4551 2.83975 21.6127 2.83975 20.7344L2.83975 9.69481C2.83975 8.81644 3.18868 7.97406 3.80978 7.35296C4.43087 6.73186 5.27326 6.38293 6.15163 6.38293H7.25558V5.27898C7.25558 4.98619 7.37189 4.70539 7.57893 4.49836C7.78596 4.29133 8.06675 4.17502 8.35954 4.17502C8.65233 4.17502 8.93313 4.29133 9.14016 4.49836C9.34719 4.70539 9.4635 4.98619 9.4635 5.27898V6.38293H12.7754ZM12.7754 8.59085H9.4635V9.69481C9.4635 9.98759 9.34719 10.2684 9.14016 10.4754C8.93313 10.6825 8.65233 10.7988 8.35954 10.7988C8.06675 10.7988 7.78596 10.6825 7.57893 10.4754C7.37189 10.2684 7.25558 9.98759 7.25558 9.69481V8.59085H6.15163C5.85884 8.59085 5.57804 8.70716 5.37101 8.91419C5.16398 9.12122 5.04767 9.40202 5.04767 9.69481V20.7344C5.04767 21.0272 5.16398 21.308 5.37101 21.515C5.57804 21.722 5.85884 21.8383 6.15163 21.8383H21.607C21.8998 21.8383 22.1806 21.722 22.3877 21.515C22.5947 21.308 22.711 21.0272 22.711 20.7344V9.69481C22.711 9.40202 22.5947 9.12122 22.3877 8.91419C22.1806 8.70716 21.8998 8.59085 21.607 8.59085H20.5031V9.69481C20.5031 9.98759 20.3868 10.2684 20.1797 10.4754C19.9727 10.6825 19.6919 10.7988 19.3991 10.7988C19.1063 10.7988 18.8255 10.6825 18.6185 10.4754C18.4115 10.2684 18.2952 9.98759 18.2952 9.69481V8.59085H14.9833V9.69481C14.9833 9.98759 14.867 10.2684 14.6599 10.4754C14.4529 10.6825 14.1721 10.7988 13.8793 10.7988C13.5865 10.7988 13.3057 10.6825 13.0987 10.4754C12.8917 10.2684 12.7754 9.98759 12.7754 9.69481V8.59085ZM6.15163 13.0067H8.35954V15.2146H6.15163V13.0067ZM6.15163 17.4225H8.35954V19.6304H6.15163V17.4225ZM19.3991 17.4225H21.607V19.6304H19.3991V17.4225ZM19.3991 13.0067H21.607V15.2146H19.3991V13.0067ZM10.5675 13.0067H12.7754V15.2146H10.5675V13.0067ZM14.9833 13.0067H17.1912V15.2146H14.9833V13.0067ZM14.9833 17.4225H17.1912V19.6304H14.9833V17.4225ZM10.5675 17.4225H12.7754V19.6304H10.5675V17.4225Z"
                fill="white"
                fill-opacity="0.4"
              />
            </svg>
          </a>
        )}

        {pathname == "/dashboard" || pathname == "/dashboard/registered" ? (
          <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="34.7638" cy="35.1107" r="34.4435" fill="#651DFF" />
            <path
              d="M43.9954 43.0151V31.0173L35.1638 25.7183L26.3321 31.0173V43.0151H30.7479V39.9792C30.7479 38.8081 31.2132 37.6849 32.0413 36.8567C32.8694 36.0286 33.9926 35.5634 35.1638 35.5634C36.3349 35.5634 37.4581 36.0286 38.2862 36.8567C39.1143 37.6849 39.5796 38.8081 39.5796 39.9792V43.0151H43.9954ZM37.3717 45.223V39.9792C37.3717 39.3936 37.1391 38.832 36.725 38.418C36.3109 38.0039 35.7493 37.7713 35.1638 37.7713C34.5782 37.7713 34.0166 38.0039 33.6025 38.418C33.1885 38.832 32.9558 39.3936 32.9558 39.9792V45.223H26.3321C25.7465 45.223 25.1849 44.9904 24.7709 44.5763C24.3568 44.1623 24.1242 43.6007 24.1242 43.0151V31.0173C24.1242 30.636 24.2229 30.2612 24.4108 29.9294C24.5986 29.5976 24.8692 29.3202 25.1961 29.124L34.0278 23.825C34.3709 23.6191 34.7636 23.5103 35.1638 23.5103C35.5639 23.5103 35.9566 23.6191 36.2997 23.825L45.1314 29.124C45.4583 29.3202 45.7289 29.5976 45.9168 29.9294C46.1046 30.2612 46.2033 30.636 46.2033 31.0173V43.0151C46.2033 43.6007 45.9707 44.1623 45.5567 44.5763C45.1426 44.9904 44.581 45.223 43.9954 45.223H37.3717Z"
              fill="white"
            />
          </svg>
        ) : (
          <a href="/dashboard">
            <svg
              width="27"
              height="28"
              viewBox="0 0 27 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M22.4752 23.0509V11.0531L13.6436 5.75408L4.81192 11.0531V23.0509H9.22775V20.015C9.22775 18.8439 9.69299 17.7207 10.5211 16.8925C11.3492 16.0644 12.4724 15.5992 13.6436 15.5992C14.8147 15.5992 15.9379 16.0644 16.766 16.8925C17.5942 17.7207 18.0594 18.8439 18.0594 20.015V23.0509H22.4752ZM15.8515 25.2588V20.015C15.8515 19.4294 15.6189 18.8678 15.2048 18.4538C14.7908 18.0397 14.2292 17.8071 13.6436 17.8071C13.058 17.8071 12.4964 18.0397 12.0824 18.4538C11.6683 18.8678 11.4357 19.4294 11.4357 20.015V25.2588H4.81192C4.22634 25.2588 3.66475 25.0262 3.25069 24.6121C2.83662 24.1981 2.604 23.6365 2.604 23.0509V11.0531C2.604 10.6718 2.70273 10.297 2.89058 9.96523C3.07844 9.63344 3.34901 9.35596 3.67595 9.15979L12.5076 3.86079C12.8508 3.6549 13.2434 3.54614 13.6436 3.54614C14.0438 3.54614 14.4364 3.6549 14.7796 3.86079L23.6112 9.15979C23.9382 9.35596 24.2087 9.63344 24.3966 9.96523C24.5844 10.297 24.6832 10.6718 24.6832 11.0531V23.0509C24.6832 23.6365 24.4505 24.1981 24.0365 24.6121C23.6224 25.0262 23.0608 25.2588 22.4752 25.2588H15.8515Z"
                fill="white"
              />
            </svg>
          </a>
        )}

        {pathname == "/map/view" || pathname == "/map" ? (
          <svg
            width="69"
            height="69"
            viewBox="0 0 69 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="34.4435" cy="34.4435" r="34.4435" fill="#651DFF" />
            <path
              d="M33.2153 43.4769L33.9218 44.3989L34.6283 43.4769C36.7822 40.6663 38.4174 38.2358 39.5181 36.1916C40.6047 34.1737 41.2286 32.4284 41.2286 31.0188C41.2286 29.081 40.4588 27.2224 39.0885 25.8522C37.7182 24.4819 35.8597 23.712 33.9218 23.712C31.9839 23.712 30.1254 24.4819 28.7551 25.8522C27.3848 27.2224 26.615 29.081 26.615 31.0188C26.615 32.4284 27.2389 34.1737 28.3254 36.1916C29.4262 38.2358 31.0614 40.6663 33.2153 43.4769ZM35.8851 32.9822C35.3644 33.5029 34.6582 33.7954 33.9218 33.7954C33.1854 33.7954 32.4792 33.5029 31.9585 32.9822C31.4378 32.4615 31.1453 31.7552 31.1453 31.0188C31.1453 30.2825 31.4378 29.5762 31.9585 29.0555C32.4792 28.5348 33.1854 28.2423 33.9218 28.2423C34.6582 28.2423 35.3644 28.5348 35.8851 29.0555C36.4058 29.5762 36.6983 30.2825 36.6983 31.0188C36.6983 31.7552 36.4058 32.4615 35.8851 32.9822Z"
              stroke="white"
              stroke-width="1.78025"
            />
          </svg>
        ) : (
          <a href="/map">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.4">
                <path
                  d="M11.9552 22.6885L12.7688 23.7501L13.5824 22.6885C15.9329 19.6212 17.7187 16.9672 18.9214 14.7336C20.1078 12.5303 20.7938 10.6166 20.7938 9.065C20.7938 6.93664 19.9483 4.89545 18.4433 3.39047C16.9384 1.88549 14.8972 1.04 12.7688 1.04C10.6404 1.04 8.59925 1.88549 7.09427 3.39047C5.58929 4.89545 4.7438 6.93664 4.7438 9.065C4.7438 10.6166 5.42984 12.5303 6.61619 14.7336C7.81887 16.9672 9.60466 19.6212 11.9552 22.6885ZM14.8724 11.1686C14.3145 11.7266 13.5578 12.04 12.7688 12.04C11.9798 12.04 11.2231 11.7266 10.6652 11.1686C10.1072 10.6107 9.7938 9.85402 9.7938 9.065C9.7938 8.27598 10.1072 7.51928 10.6652 6.96136C11.2231 6.40344 11.9798 6.09 12.7688 6.09C13.5578 6.09 14.3145 6.40344 14.8724 6.96136C15.4304 7.51928 15.7438 8.27598 15.7438 9.065C15.7438 9.85402 15.4304 10.6107 14.8724 11.1686Z"
                  stroke="white"
                  stroke-width="2.05"
                />
              </g>
            </svg>
          </a>
        )}

        {pathname == "/profile" ? (
          <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="34.8649" cy="34.8939" r="34.4435" fill="#651DFF" />
            <mask id="path-2-inside-1_21_230" fill="white">
              <path d="M26.5209 40.8531C26.5209 37.8825 28.929 35.4744 31.8996 35.4744H38.7072C41.6778 35.4744 44.0859 37.8825 44.0859 40.8531V43.4038C44.0859 44.0495 43.5624 44.573 42.9166 44.573H27.6902C27.0444 44.573 26.5209 44.0495 26.5209 43.4038V40.8531Z" />
            </mask>
            <path
              d="M26.5209 40.8531C26.5209 37.8825 28.929 35.4744 31.8996 35.4744H38.7072C41.6778 35.4744 44.0859 37.8825 44.0859 40.8531V43.4038C44.0859 44.0495 43.5624 44.573 42.9166 44.573H27.6902C27.0444 44.573 26.5209 44.0495 26.5209 43.4038V40.8531Z"
              stroke="white"
              stroke-width="3.56762"
              mask="url(#path-2-inside-1_21_230)"
            />
            <path
              d="M39.2819 28.7358C39.2819 30.9331 37.5006 32.7144 35.3033 32.7144C33.1059 32.7144 31.3246 30.9331 31.3246 28.7358C31.3246 26.5385 33.1059 24.7573 35.3033 24.7573C37.5006 24.7573 39.2819 26.5385 39.2819 28.7358Z"
              stroke="white"
              stroke-width="1.78381"
            />
          </svg>
        ) : (
          <a href="/profile">
            <svg
              width="21"
              height="25"
              viewBox="0 0 21 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_36_48" fill="white">
                <path d="M0.330322 20.5418C0.330322 17.1211 3.10337 14.3481 6.52409 14.3481H14.363C17.7837 14.3481 20.5568 17.1211 20.5568 20.5418V23.4789C20.5568 24.2226 19.9539 24.8254 19.2103 24.8254H1.67679C0.933158 24.8254 0.330322 24.2226 0.330322 23.4789V20.5418Z" />
              </mask>
              <path
                d="M0.330322 20.5418C0.330322 17.1211 3.10337 14.3481 6.52409 14.3481H14.363C17.7837 14.3481 20.5568 17.1211 20.5568 20.5418V23.4789C20.5568 24.2226 19.9539 24.8254 19.2103 24.8254H1.67679C0.933158 24.8254 0.330322 24.2226 0.330322 23.4789V20.5418Z"
                stroke="white"
                stroke-opacity="0.4"
                stroke-width="4.1082"
                mask="url(#path-1-inside-1_36_48)"
              />
              <circle
                cx="10.4434"
                cy="6.58845"
                r="4.58142"
                stroke="white"
                stroke-opacity="0.4"
                stroke-width="2.0541"
              />
            </svg>
          </a>
        )}
      </div>
    );
  }
}
