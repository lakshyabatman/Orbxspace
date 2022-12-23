import { ChatIcon } from '@chakra-ui/icons'
import { Avatar, Flex } from '@chakra-ui/react'
import React from 'react'
import { Post, ReactionType } from '../../models'
import { unixToAgo } from '../../utilities/unixToAgo'
import ReactionSection from '../ReactionSection/ReactionSection'



export interface PostDetailCardProps {
    currentPost: Post,
    react: (reactioonType: ReactionType) => Promise<boolean>
}

const PostDetailCard:React.FC<PostDetailCardProps> = ({currentPost,react}) => {
    
  return (
   <div>

    <div className="flex items-center">
            <Avatar size={"sm"} mr={3} src={currentPost.creator_details.profile.pfp} />
            <span className="text-md mr-3">
              {currentPost.creator_details.profile.username}
            </span>
            <span className="text-md text-gray-500">
              {unixToAgo(currentPost.timestamp)}
            </span>
    </div >
      <h1 className="my-4">{currentPost?.content.body}</h1>
    <div className="flex justify-between mb-4">
        <Flex align={"center"}>
            <ChatIcon mr={2} />
            <span>{currentPost.count_replies} Replies</span>
        </Flex>
        <ReactionSection heartCounts={currentPost.count_likes} downvoteCounts={currentPost.count_downvotes} hahaCounts={currentPost.count_haha} react={react} />
     </div>
   </div>
  )
}

export default PostDetailCard