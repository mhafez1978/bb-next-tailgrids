// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import CountUp from "react-countup";

// const Accomplishments = () => {
//   const sectionRef = useRef(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     // Create an IntersectionObserver to detect when the section is in view
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0];
//         setInView(entry.isIntersecting); // Set state when the section is in view
//       },
//       {
//         threshold: 0.5, // Trigger when 50% of the section is in view
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     // Cleanup the observer on component unmount
//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full min-h-[60vh] flex justify-center items-center py-32 lg:py-20 bg-slate-900 text-white"
//     >
//       <div className="w-full flex flex-col justify-center items-center gap-4">
//         <h2 className="font-black text-4xl lg:text-6xl text-center drop-shadow-2xl">
//           Tailored Approach
//         </h2>
//         <p className="mb-10 text-center text-lg px-4 lg:px-0">
//           Every web design project is a tailored combination of marketing
//           services designed to drive your brand&apos;s growth.
//         </p>
//         <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
//           {/* Years of Experience */}
//           <div className="flex flex-col-reverse items-center justify-center h-auto gap-4 px-4 pt-6 lg:pt-0">
//             <h4 className="text-center mt-4 font-semibold">
//               Years of Experience
//             </h4>
//             <span className="font-black text-center text-4xl text-red-500 lg:text-[5rem]">
//               {inView && <CountUp start={0} end={10} duration={6} suffix="+" />}
//             </span>
//           </div>

//           {/* Active Projects */}
//           <div className="flex flex-col-reverse items-center justify-center h-auto gap-4 px-4 pt-6 lg:pt-0">
//             <h4 className="text-center mt-4 font-semibold">Active Projects</h4>
//             <span className="font-black text-center text-4xl text-red-500 lg:text-[5rem]">
//               {inView && <CountUp start={0} end={3} duration={6} suffix="+" />}
//             </span>
//           </div>

//           {/* Success Stories */}
//           <div className="flex flex-col-reverse items-center justify-center h-auto gap-4 px-4 pt-6 lg:pt-0">
//             <h4 className="text-center mt-4 font-semibold">Success Stories</h4>
//             <span className="font-black text-center text-4xl text-red-500 lg:text-[5rem]">
//               {inView && <CountUp start={0} end={4} duration={6} suffix="+" />}
//             </span>
//           </div>

//           {/* Average Turnaround */}
//           <div className="flex flex-col-reverse items-center justify-center h-auto gap-4 px-4 pt-6 lg:pt-0">
//             <h4 className="text-center mt-4 font-semibold">
//               Average Turnaround
//             </h4>
//             <span className="font-black text-center text-4xl text-red-500 lg:text-[5rem]">
//               {inView && <CountUp start={0} end={3} duration={8} suffix="+" />}
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Accomplishments;

"use client";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const Accomplishments = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentSectionRef = sectionRef.current; // Save ref in a local variable

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    // Cleanup function
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []); // You don't need to depend on `sectionRef.current` because it's saved in `currentSectionRef`.

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-[60vh] flex justify-center items-center py-32 lg:py-20 bg-slate-900 text-white"
    >
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h2 className="font-black text-4xl lg:text-6xl text-center drop-shadow-2xl">
          Tailored Approach
        </h2>
        <p className="mb-10 text-center text-lg px-4 lg:px-0">
          Every web design project is a tailored combination of marketing
          services designed to drive your brand&apos;s growth.
        </p>
        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {/* Years of Experience */}
          <div className="flex flex-col-reverse items-center justify-center h-auto gap-4 px-4 pt-6 lg:pt-0">
            <h4 className="text-center mt-4 font-semibold">
              Years of Experience
            </h4>
            <span className="font-black text-center text-4xl text-red-500 lg:text-[5rem]">
              {inView && <CountUp start={0} end={10} duration={6} suffix="+" />}
            </span>
          </div>

          {/* Active Projects */}
          <div className="flex flex-col-reverse items-center justify-center h-auto gap-4 px-4 pt-6 lg:pt-0">
            <h4 className="text-center mt-4 font-semibold">Active Projects</h4>
            <span className="font-black text-center text-4xl text-red-500 lg:text-[5rem]">
              {inView && <CountUp start={0} end={3} duration={6} suffix="+" />}
            </span>
          </div>

          {/* Success Stories */}
          <div className="flex flex-col-reverse items-center justify-center h-auto gap-4 px-4 pt-6 lg:pt-0">
            <h4 className="text-center mt-4 font-semibold">Success Stories</h4>
            <span className="font-black text-center text-4xl text-red-500 lg:text-[5rem]">
              {inView && <CountUp start={0} end={4} duration={6} suffix="+" />}
            </span>
          </div>

          {/* Average Turnaround */}
          <div className="flex flex-col-reverse items-center justify-center h-auto gap-4 px-4 pt-6 lg:pt-0">
            <h4 className="text-center mt-4 font-semibold">
              Average Turnaround
            </h4>
            <span className="font-black text-center text-4xl text-red-500 lg:text-[5rem]">
              {inView && <CountUp start={0} end={3} duration={8} suffix="+" />}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;
