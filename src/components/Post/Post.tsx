import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

interface PostProps {
  postContent: string;
  postAuthor: string;
  postDate: string;
}

export const Post = ({ postContent, postAuthor, postDate }: PostProps) => {
  return (
    <Box w={"full"} bgColor={"white"} mb={4} rounded={"md"} p={4}>
      <Flex justify={"space-between"}>
        <Text w={"75%"}>{postContent}</Text>
        <Flex align={"center"}>
          <ChatIcon mr={2} />
          <Text>10 Replies</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
