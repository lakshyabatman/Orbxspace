import { ChatIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex } from "@chakra-ui/react";
import React, { useContext, useState } from 'react'
import { AppContext } from "../../../context/AppContext";
import { unixToAgo } from "../../../utilities/unixToAgo";
import HahaIcon from '../../../assets/icons/Haha.svg';
import HeartIcon from '../../../assets/icons/Heart.svg';
import Downvote from '../../../assets/icons/Downvote.svg';
import { ReactionType } from "../../../models";

const PostPage = () => {
  const context = useContext(AppContext);

  if (context == null) return <h1>ERROR</h1>;

  const {currentPost} = context;


  const [haha,setHaha] = useState(currentPost?.count_haha ?? 0);
  const [like, setLike] = useState(currentPost?.count_likes ?? 0);

  const [downvote, setDownvote] = useState(currentPost?.count_downvotes ?? 0);


  if(currentPost == null) return <h1>ERROR</h1>;


  const reactToPost = async ( reaction: ReactionType) => {
    const res = await context.reactToPost(currentPost.stream_id, reaction);


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
    <Box className="mx-10">
      <div className="flex items-center">
            <Avatar size={"sm"} mr={3} src={currentPost.creator_details.profile.pfp} />
            <span className="text-md mr-3">
              {currentPost.creator_details.profile.username}
            </span>
            <span className="text-md text-gray-500">
              {unixToAgo(currentPost.timestamp)}
            </span>
      </div >
      <h1 className="my-4">{context.currentPost?.content.body}</h1>
      <div className="flex justify-between mb-4">
        <Flex align={"center"}>
            <ChatIcon mr={2} />
            <span>{currentPost.count_replies} Replies</span>
        </Flex>
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
      </div>
      <hr/>


    </Box>
  )
}

export default PostPage