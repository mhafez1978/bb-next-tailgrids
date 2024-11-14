import React from "react";

const ResponsiveSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen min-h-[50vh] mt-[72px] flex justify-center items-center py-20">
      {children}
    </div>
  );
};

export default ResponsiveSection;
