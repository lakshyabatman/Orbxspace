import React, { useContext, useState } from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { unixToAgo } from "../../utilities/unixToAgo";

import { ReactionType } from "../../models";
import { AppContext } from "../../context/AppContext";
import ReactionSection from "../ReactionSection/ReactionSection";

interface PostProps {
  postContent: string;
  postAuthor: string;
  postTimestamp: number;
  authorPfp: string;
  downvoteCounts: number;
  heartCounts: number;
  hahaCounts: number;
  replyCounts: number;
  postId: string;
}

const PostPreviewCard = ({
  postContent,
  postAuthor,
  postTimestamp,
  authorPfp,
  heartCounts,
  hahaCounts,
  replyCounts,
  downvoteCounts,
  postId,
}: PostProps) => {
  const context = useContext(AppContext);

  if (context == null) return <h1>ERROR</h1>;

  const reactToPost = async (reaction: ReactionType): Promise<boolean> => {
    return await context.reactToPost(postId, reaction);
  };

  return (
    <Box w={"full"} bgColor={"white"} mb={4} rounded={"md"} px={4} pt={4}>
      <Flex
        justify={"space-between"}
        cursor={"pointer"}
        onClick={() => context.getPost(postId)}
      >
        <Text w={"75%"}>{postContent}</Text>
        <Flex align={"center"}>
          <ChatIcon mr={2} />
          <Text>{replyCounts} Replies</Text>
        </Flex>
      </Flex>
      <Flex
        justify={"space-between"}
        mt={4}
        py={2}
        borderTop={"1px solid black"}
      >
        <Flex align={"center"} justify={"space-between"} className="w-full">
          <div className="flex items-center">
            <Avatar size={"sm"} mr={3} src={authorPfp ? authorPfp : ""} />
            <Text fontSize={"sm"} mr={3}>
              {postAuthor}
            </Text>
            <Text fontSize={"xs"} color={"gray.500"}>
              {unixToAgo(postTimestamp)}
            </Text>
          </div>
          <ReactionSection
            downvoteCounts={downvoteCounts}
            hahaCounts={hahaCounts}
            heartCounts={heartCounts}
            react={reactToPost}
          />
        </Flex>
      </Flex>
    </Box>
  );
};


export default PostPreviewCard;