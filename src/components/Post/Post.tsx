import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { unixToAgo } from "../../utilities/unixToAgo";

interface PostProps {
  postContent: string;
  postAuthor: string;
  postCommentsCount: string;
  postTimestamp: number;
  authorPfp: string;
}

export const Post = ({
  postContent,
  postAuthor,
  postCommentsCount,
  postTimestamp,
  authorPfp,
}: PostProps) => {
  return (
    <Box w={"full"} bgColor={"white"} mb={4} rounded={"md"} px={4} pt={4}>
      <Flex justify={"space-between"}>
        <Text w={"75%"}>{postContent}</Text>
        <Flex align={"center"}>
          <ChatIcon mr={2} />
          <Text>{postCommentsCount} Replies</Text>
        </Flex>
      </Flex>
      <Flex
        justify={"space-between"}
        mt={4}
        py={2}
        borderTop={"1px solid black"}
      >
        <Flex align={"center"}>
          <Avatar size={"sm"} mr={3} src={authorPfp ? authorPfp : ""} />
          <Text fontSize={"sm"} mr={3}>
            {postAuthor}
          </Text>
          <Text fontSize={"xs"} color={"gray.500"}>
            {unixToAgo(postTimestamp)}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
