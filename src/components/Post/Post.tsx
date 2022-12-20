import { Box } from "@chakra-ui/react";
import React from "react";

interface PostProps {
  postContent: string;
  postAuthor: string;
  postDate: string;
}

export const Post = ({ postContent, postAuthor, postDate }: PostProps) => {
  return (
    <Box w={"full"} bgColor={"white"} mb={4} rounded={"md"} p={4}>
      <h1>{postContent}</h1>
    </Box>
  );
};
