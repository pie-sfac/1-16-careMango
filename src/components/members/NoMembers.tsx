import React from 'react';

const NoMemebers = () => (
  <>
    <div className="flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="50" viewBox="0 0 42 50" fill="none">
        <g clipPath="url(#clip0_20_35022)">
          <path
            d="M21 24C27.6274 24 33 18.6274 33 12C33 5.37258 27.6274 0 21 0C14.3726 0 9 5.37258 9 12C9 18.6274 14.3726 24 21 24Z"
            fill="#CFCFCF"
          />
          <path
            d="M42 42.1174C42 35.6952 32.5932 26.7539 21.0061 26.7539C9.41907 26.7539 0 35.6952 0 42.1174C0 48.5397 9.40682 49.9987 20.9939 49.9987C32.5809 49.9987 41.9877 48.5397 41.9877 42.1174H42Z"
            fill="#CFCFCF"
          />
        </g>
        <defs>
          <clipPath id="clip0_20_35022">
            <rect width="42" height="50" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <p className="flex items-center justify-center p-3 my-1 base-font">+ 회원을 등록하세요</p>
  </>
);

export default NoMemebers;
