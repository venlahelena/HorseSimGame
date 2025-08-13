import React from "react";

const SubNavigation: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center gap-4 py-3 bg-subnav-bg border-b">
      {children}
    </div>
  );
};

export default SubNavigation;