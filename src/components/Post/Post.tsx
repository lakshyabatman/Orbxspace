import React, { useContext, useState } from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { unixToAgo } from "../../utilities/unixToAgo";
import HahaIcon from '../../assets/icons/Haha.svg';
import HeartIcon from '../../assets/icons/Heart.svg';
import Downvote from '../../assets/icons/Downvote.svg';
import { ReactionType } from "../../models";
import { AppContext } from "../../context/AppContext";

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

export const Post = ({
  postContent,
  postAuthor,
  postTimestamp,
  authorPfp,
  heartCounts,
  hahaCounts,
  replyCounts,
  downvoteCounts,
  postId
}: PostProps) => {


  const context = useContext(AppContext);

  const [haha,setHaha] = useState(hahaCounts);
  const [like, setLike] = useState(heartCounts);

  const [downvote, setDownvote] = useState(downvoteCounts);


  if (context == null) return <h1>ERROR</h1>;

  const reactToPost = async ( reaction: ReactionType) => {
    const res = await context.reactToPost(postId, reaction);


    switch(reaction) {
      case ReactionType.Haha:
        setHaha(haha+ (res ? 1 : 0))
        return;
      case ReactionType.Downvote:
        setDownvote(downvote+ (res ? 1 : 0))
        return;
      case ReactionType.Like:
        setLike(like+ (res ? 1 : 0))
        return;
    }
    
  }


  return (
    <Box w={"full"} bgColor={"white"} mb={4} rounded={"md"} px={4} pt={4} onClick={() => context.getPost(postId)}>
      <Flex justify={"space-between"}>
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
          <div className="flex ">
            <div className="flex items-center" >
              <div onClick={() =>  reactToPost(ReactionType.Haha)}>
                <HahaIcon />
              </div>
             <span className="ml-1">
              {haha}
             </span>
            </div>
            <div className="ml-3 mr-1 flex items-center" >
              <div onClick={() =>  reactToPost(ReactionType.Like)}>
                <HeartIcon />
              </div>
              <span className="ml-1">
                {like}
              </span>
            </div>      
            <div className="flex items-center" onClick={() =>  reactToPost(ReactionType.Downvote)}>
              <div onClick={() =>  reactToPost(ReactionType.Downvote)}>
                <Downvote/>
              </div>
              {downvote}
            </div>
          </div>
        </Flex>
      </Flex>
    </Box>
  );
};
