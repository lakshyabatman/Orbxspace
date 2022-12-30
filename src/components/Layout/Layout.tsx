import React, { PropsWithChildren } from "react";
import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";

const LayoutPage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen  grid grid-cols-8  bg-[#fcf6ff] px-12">
        <div className="w-full col-span-3 2xl:col-span-3 lg:col-span-2">
          <SideMenu />
        </div>
        <div className="w-full col-span-5 xl:col-span-4 2xl:col-span-3 mt-28">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
