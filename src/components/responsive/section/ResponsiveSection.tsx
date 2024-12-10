import React from "react";

const ResponsiveSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen min-h-[50vh] flex justify-center items-center py-20">
      {children}
    </div>
  );
};

export default ResponsiveSection;
