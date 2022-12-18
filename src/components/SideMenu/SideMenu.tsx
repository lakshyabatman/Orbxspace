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
      pl={8}
    >
      <Text
        fontSize={"lg"}
        fontWeight={"semibold"}
        mb={6}
        color={"#2D083F"}
        borderBottom={"1px"}
        pb={2}
      >
        Channels
      </Text>
      {context.groupDetails?.channels.map((channel) => {
        return (
          <Box
            fontSize={"sm"}
            py={2}
            px={2}
            my={2}
            key={channel.stream_id}
            bg={
              currentChannel?.stream_id === channel.stream_id
                ? "#F3E8FF"
                : "white"
            }
            borderRight={
              currentChannel?.stream_id === channel.stream_id
                ? "6px solid #AF5CD6"
                : "none"
            }
            rounded={"md"}
            cursor={"pointer"}
          >
            {channel.content.name}
          </Box>
        );
      })}
    </Box>
  );
};

export default SideMenu;
