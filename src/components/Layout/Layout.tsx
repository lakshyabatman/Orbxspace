import React, { PropsWithChildren } from "react";
import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";
import { Box, Flex } from "@chakra-ui/react";

const LayoutPage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex flexDir={"column"} className="min-h-screen">
      <Navbar />
      <Flex bgColor={"#fcf6ff"} className="min-h-screen" px={12}>
        <SideMenu />
        <Box mt={28} w={"full"}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default LayoutPage;
