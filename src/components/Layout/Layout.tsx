import React, { PropsWithChildren } from "react";
import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";
import { Box, Flex } from "@chakra-ui/react";

const LayoutPage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex flexDir={"column"} className="min-h-screen">
      <Navbar />
      <div  className="min-h-screen  grid grid-cols-8  bg-[#fcf6ff] px-12">
        <Box  w={"full"} className="col-span-3">
        <SideMenu />
        </Box>
        <Box mt={28} w={"full"} className="sm:col-span-5 xl:col-span-4 2xl:col-span-3">
            {children}
        </Box>
      </div>
    </Flex>
  );
};

export default LayoutPage;
