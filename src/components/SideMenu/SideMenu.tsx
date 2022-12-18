import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Box, Text } from "@chakra-ui/react";

const SideMenu = () => {
  const context = useContext(AppContext);
  if (context == null) return <h1>ERROR</h1>;

  const currentChannel = context.currentChannel;

  return (
    <Box
      mt={24}
      rounded={"xl"}
      w={"72"}
      bg={"white"}
      height={"fit-content"}
      p={4}
    >
      <Text
        fontSize={"lg"}
        fontWeight={"semibold"}
        mb={2}
        color={"#2D083F"}
        borderBottom={"1px"}
        pb={2}
      >
        Channels
      </Text>
      {context.groupDetails?.channels.map((channel) => {
        return (
          <Text fontSize={"sm"} py={3} px={2} key={channel.stream_id}>
            {channel.content.name}
          </Text>
        );
      })}
    </Box>
  );
};

export default SideMenu;
