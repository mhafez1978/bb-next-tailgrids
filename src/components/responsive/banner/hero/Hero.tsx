import React from "react";
// import styles from "./hero.module.css";
import { SlArrowRightCircle } from "react-icons/sl";
import Modal from "@/components/responsive/modal/Modal";

const Hero = () => {
  return (
    <>
      <section className="w-screen h-[100vh] bg-[url('https://i.pinimg.com/originals/c5/9a/d2/c59ad2bd4ad2fbacd04017debc679ddb.gif')] bg-center bg-cover bg-fixed bg-no-repeat">
        <div className="w-full h-full bg-slate-100/90 text-black flex flex-col justify-center">
          <div className="w-full h-[40vh] flex flex-col items-center justify-center px-4 gap-6 lg:w-6/12 lg:mx-auto lg:px-0">
            <h1 className="text-4xl font-black text-center text-slate-800 capitalize lg:text-7xl">
              Struggling to Grow Your Online Presence?
            </h1>
            <p className="px-4 text-center text-xl font-semibold lg:px-4 lg:w-3/4 lg:mx-auto">
              We provide seamless website design, development, and marketing
              solutions to help your brand thrive digitally.
            </p>
            <div className="w-full flex flex-col items-center gap-4 justify-center lg:flex-row lg:gap-2 ">
              {/* <Modal />
              <button className="flex flex-row gap-2 items-center text-xl group relative text-slate-900 px-6 py-3 rounded-lg overflow-hidden hover:border-b-2 hover:border-slate-950 hover:rounded-lg hover:bg-red-500/50">
                <span className="flex flex-row gap-2 items-center w-full relative text-lg font-semibold transition-colors duration-500 group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r from-slate-100 via-violet-300 to-slate-200">
                  Explore Our Portfolio
                </span>
                <SlArrowRightCircle />
              </button> */}
              <div className="w-full flex flex-col gap-4 justify-center items-center lg:w-1/2 lg:flex-row">
                {/* <div className="relative top-0 left-0 h-screen w-screen flex items-center justify-center py-3 px-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg border-2 border-blue-700 text-white text-lg font-bold hover:shadow-2xl transition-transform duration-300 transform hover:scale-110"> */}
                <Modal />
                {/* </div> */}

                <a
                  href="#portfolio"
                  className="min-w-[260px] flex flex-row gap-2 items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-red-400 to-red-600 shadow-lg border-2 border-red-700 text-white text-lg font-bold hover:shadow-2xl transition-transform duration-300 transform hover:scale-110 lg:w-1/2"
                >
                  <span className="capitalize text-lg font-semibold transition-colors duration-500 group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r from-slate-100 via-violet-300 to-slate-200">
                    See our work
                  </span>
                  <SlArrowRightCircle />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
