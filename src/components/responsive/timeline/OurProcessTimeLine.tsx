"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Define each process step with its title and description
interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Discovery & Research",
    description:
      "In-depth understanding of your business market, competition, products, services, brand message and target audience.",
  },
  {
    title: "Content Curation",
    description:
      "Creating well-structured SEO Optimized content helps your business rankings and convey's clear brand’s message, and engages visitors",
  },
  {
    title: "UX/UI Design",
    description:
      "Starting from mockups to fully responsive interfaces. Our focus is on creating engaging designs that elevate your brand and enhance user experience",
  },
  {
    title: "Website Development",
    description:
      "Bringing the designed UI to life with code, integrating it with backend APIs or databases, optimizing performance, and ensuring functionality and cross-browser compatibility.",
  },
  {
    title: "Website Launch",
    description:
      "After passing final testing, we seamlessly launch your website with full functionality and optimal performance across all devices and browsers.",
  },
  {
    title: "Maintenance & Support",
    description:
      "We handle updates, troubleshooting, and performance monitoring for optimal functionality.",
  },
];

// Custom hook to detect if an element is in view using Intersection Observer
const useInView = (ref: React.RefObject<HTMLElement>) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  return isInView;
};

const TimelineStep: React.FC<{ step: Step; isLeft: boolean }> = ({
  step,
  isLeft,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={controls}
      transition={{ duration: 0.8 }}
      className={`w-full flex ${
        isLeft ? "justify-start" : "justify-end"
      } my-10`}
    >
      <div
        className={`relative w-[45%] p-6 bg-white shadow-lg rounded-md ${
          isLeft ? "ml-6" : "mr-6"
        }`}
      >
        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
        <p>{step.description}</p>
        {/* Timeline indicator closer to the center */}
        <span
          className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full ${
            isLeft ? "right-[-40px]" : "left-[-40px]"
          }`}
        ></span>
        {/* Connecting line */}
        <span
          className={`absolute top-1/2 transform -translate-y-1/2 w-[20px] h-[100px] bg-emerald-500 ${
            isLeft ? "right-[-2px]" : "left-[-2px]"
          }`}
        ></span>
      </div>
    </motion.div>
  );
};

const OurProcessTimeLine: React.FC = () => {
  return (
    <section className="w-full py-24 bg-[url('/assets/brain-storm.png')] bg-center bg-cover bg-fixed bg-no-repeat">
      <div className="container max-w-[800px] mx-auto">
        <h2 className="text-center text-3xl font-black mb-4 text-white">
          From Ideas To Launch
        </h2>
        <p className="text-white text-lg font-semibold text-center mb-6">
          Our Website design and development process starts and ends with you.
        </p>
        <div className="relative">
          {/* Vertical line running through the center of the timeline */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-white h-full"></div>
          {/* Map through the steps and alternate the position */}
          {steps.map((step, index) => (
            <TimelineStep key={index} step={step} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcessTimeLine;
