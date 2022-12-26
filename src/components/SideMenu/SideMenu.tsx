import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { CreatePostModal } from "../CreatePostModal/CreatePostModal";
import { CreateChannelModal } from "../CreateChannelModal/CreateChannelModal";

const SideMenu = () => {
  const context = useContext(AppContext);
  if (context == null) return <h1>ERROR</h1>;
  const currentChannel = context.currentChannel;

  const {
    isOpen: isCreatePostModalOpen,
    onOpen: onCreatePostModalOpen,
    onClose: onCreatePostModalClose,
  } = useDisclosure();

  const {
    isOpen: isCreateChannelModalOpen,
    onOpen: onCreateChannelModalOpen,
    onClose: onCreateChannelModalClose,
  } = useDisclosure();

  return (
    <>
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={onCreatePostModalClose}
        onOpen={onCreatePostModalOpen}
      />
      <CreateChannelModal
        isOpen={isCreateChannelModalOpen}
        onClose={onCreateChannelModalClose}
        onOpen={onCreateChannelModalOpen}
      />
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
          <Button
            leftIcon={<AddIcon />}
            aria-label="Create Channel"
            bgColor={"transparent"}
            color={"#2D083F"}
            fontWeight={"semibold"}
            fontSize={"sm"}
            _hover={{ bgColor: "transparent" }}
            _active={{ bgColor: "transparent" }}
            _focus={{ bgColor: "transparent" }}
            px={2}
            onClick={() => onCreateChannelModalOpen()}
          >
            Create a Channel
          </Button>
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
            onClick={() => onCreatePostModalOpen()}
          >
            Create a Post
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default SideMenu;
