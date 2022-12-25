import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const SideMenu = () => {
  const context = useContext(AppContext);
  if (context == null) return <h1>ERROR</h1>;

  const currentChannel = context.currentChannel;

  return (
    <Flex flexDir={"column"}>
      <Box
        mt={24}
        rounded={"xl"}
        w={"72"}
        bg={"white"}
        height={"fit-content"}
        p={4}
        pl={8}
        boxShadow={"0px 0px 20px 1px rgba(175, 92, 214, 0.25)"}
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
              onClick={() => context.moveToChannel(channel.stream_id)}
            >
              {channel.content.name}
            </Box>
          );
        })}
      </Box>
      <Box
        mt={8}
        rounded={"xl"}
        w={"72"}
        bg={"white"}
        height={"fit-content"}
        px={4}
        py={1}
        pl={8}
        boxShadow={"0px 0px 20px 1px rgba(175, 92, 214, 0.25)"}
      >
        <Button
          leftIcon={<AddIcon />}
          aria-label="Create Post"
          bgColor={"transparent"}
          color={"#2D083F"}
          fontWeight={"semibold"}
          fontSize={"sm"}
          _hover={{ bgColor: "transparent" }}
          _active={{ bgColor: "transparent" }}
          _focus={{ bgColor: "transparent" }}
          onClick={() => console.log("Create Channel")}
        >
          Create a Post
        </Button>
      </Box>
    </Flex>
  );
};

export default SideMenu;
