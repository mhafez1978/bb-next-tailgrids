import React from "react";

const PageTop = ({ PageMessage }: { PageMessage: string }) => {
  return (
    <section className="w-screen z-10 overflow-hidden bg-slate-800 lg:py-[50px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-2/3 xl:w-3/4">
            <div className="w-full">
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-3xl xl:text-[33px] 2xl:text-4xl">
                {PageMessage}
              </h1>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-7/12">
            {/* something else! */}
          </div>
        </div>
      </div>
      <div>
        <span className="absolute left-4 top-4 z-[-1]">
          <DotShape />
        </span>
        <span className="absolute bottom-4 right-4 z-[-1]">
          <DotShape />
        </span>
        <span className="left-1/12 absolute top-0 z-[-1] h-full">
          <svg
            width="683"
            height="290"
            viewBox="0 0 683 290"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.96875"
              y="298.892"
              width="657.074"
              height="349.704"
              transform="rotate(-51.7778 0.96875 298.892)"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="0.968749"
                y1="474.887"
                x2="658.043"
                y2="474.887"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3056D3" stopOpacity="0.26" />
                <stop offset="1" stopColor="#3056D3" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="absolute right-0 top-0 z-[-1] h-full">
          <svg
            width="315"
            height="290"
            viewBox="0 0 315 290"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.0195312"
              y="300.047"
              width="451.928"
              height="170.916"
              transform="rotate(-51.7778 0.0195312 300.047)"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="0.0195305"
                y1="386.064"
                x2="451.948"
                y2="386.064"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3056D3" stopOpacity="0.26" />
                <stop offset="1" stopColor="#3056D3" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </section>
  );
};

export default PageTop;

const DotShape = () => {
  return (
    <>
      <svg
        width="50"
        height="49"
        viewBox="0 0 50 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="47.7119"
          cy="46.3164"
          r="1.74121"
          transform="rotate(180 47.7119 46.3164)"
          fill="white"
        />
        <circle
          cx="47.7119"
          cy="16.7161"
          r="1.74121"
          transform="rotate(180 47.7119 16.7161)"
          fill="white"
        />
        <circle
          cx="47.7119"
          cy="31.3423"
          r="1.74121"
          transform="rotate(180 47.7119 31.3423)"
          fill="white"
        />
        <circle
          cx="47.7119"
          cy="1.74121"
          r="1.74121"
          transform="rotate(180 47.7119 1.74121)"
          fill="white"
        />
        <circle
          cx="32.3916"
          cy="46.3162"
          r="1.74121"
          transform="rotate(180 32.3916 46.3162)"
          fill="white"
        />
        <circle
          cx="32.3916"
          cy="16.7161"
          r="1.74121"
          transform="rotate(180 32.3916 16.7161)"
          fill="white"
        />
        <circle
          cx="32.3916"
          cy="31.342"
          r="1.74121"
          transform="rotate(180 32.3916 31.342)"
          fill="white"
        />
        <circle
          cx="32.3916"
          cy="1.74145"
          r="1.74121"
          transform="rotate(180 32.3916 1.74145)"
          fill="white"
        />
        <circle
          cx="17.0674"
          cy="46.3162"
          r="1.74121"
          transform="rotate(180 17.0674 46.3162)"
          fill="white"
        />
        <circle
          cx="17.0674"
          cy="16.7161"
          r="1.74121"
          transform="rotate(180 17.0674 16.7161)"
          fill="white"
        />
        <circle
          cx="17.0674"
          cy="31.342"
          r="1.74121"
          transform="rotate(180 17.0674 31.342)"
          fill="white"
        />
        <circle
          cx="17.0674"
          cy="1.74145"
          r="1.74121"
          transform="rotate(180 17.0674 1.74145)"
          fill="white"
        />
        <circle
          cx="1.74316"
          cy="46.3162"
          r="1.74121"
          transform="rotate(180 1.74316 46.3162)"
          fill="white"
        />
        <circle
          cx="1.74316"
          cy="16.7161"
          r="1.74121"
          transform="rotate(180 1.74316 16.7161)"
          fill="white"
        />
        <circle
          cx="1.74316"
          cy="31.342"
          r="1.74121"
          transform="rotate(180 1.74316 31.342)"
          fill="white"
        />
        <circle
          cx="1.74316"
          cy="1.74145"
          r="1.74121"
          transform="rotate(180 1.74316 1.74145)"
          fill="white"
        />
      </svg>
    </>
  );
};
