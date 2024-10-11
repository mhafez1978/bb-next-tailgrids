import React from "react";

interface CtaProps {
  secondaryCallToActionText?: string;
  mainCallToActionText?: string;
  mainCallToActionTextAfterBlockOnSmall?: string;
  mainCallToActionButtonText?: string;
}

const Cta = ({
  secondaryCallToActionText,
  mainCallToActionText,
  mainCallToActionTextAfterBlockOnSmall,
  mainCallToActionButtonText,
}: CtaProps) => {
  return (
    <section className="bg-slate-800 mb-20">
      <div className="container mx-auto">
        <div className="relative z-10 overflow-hidden rounded bg-dark px-8 py-12 md:p-[70px]">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <span className="mb-4 block text-base font-medium text-white">
                {secondaryCallToActionText}
              </span>
              <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:mb-8 sm:text-[40px]/[48px] lg:mb-0">
                <span className="xs:block"> {mainCallToActionText} </span>
                <span>{mainCallToActionTextAfterBlockOnSmall}</span>
              </h2>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="flex flex-wrap lg:justify-end">
                <a
                  href="tel:+1-508-936-3727
"
                  className="my-1 mr-4 inline-block rounded-md border border-transparent bg-white px-7 py-3 text-base font-medium text-primary transition hover:text-primary hover:shadow-1"
                >
                  {mainCallToActionButtonText}
                </a>
              </div>
            </div>
          </div>
          <div>
            <span className="absolute left-0 top-0 z-[-1]">
              <svg
                width="189"
                height="162"
                viewBox="0 0 189 162"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="16"
                  cy="-16.5"
                  rx="173"
                  ry="178.5"
                  transform="rotate(180 16 -16.5)"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="-157"
                    y1="-107.754"
                    x2="98.5011"
                    y2="-106.425"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.07" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute bottom-0 right-0 z-[-1]">
              <svg
                width="191"
                height="208"
                viewBox="0 0 191 208"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="173"
                  cy="178.5"
                  rx="173"
                  ry="178.5"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="-3.27832e-05"
                    y1="87.2457"
                    x2="255.501"
                    y2="88.5747"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.07" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
