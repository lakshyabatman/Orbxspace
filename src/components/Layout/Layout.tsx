import React, { PropsWithChildren } from "react";
import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";
import { Box, Flex } from "@chakra-ui/react";

const LayoutPage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex flexDir={"column"} height={"100vh"}>
      <Navbar />
      <Flex bgColor={"#fcf6ff"} height={"100%"} px={12}>
        <SideMenu />
        <Box mt={24}>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default LayoutPage;
