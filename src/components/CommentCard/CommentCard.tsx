import { ChatIcon } from '@chakra-ui/icons'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { comment } from 'postcss'
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Post, ReactionType } from '../../models'
import { unixToAgo } from '../../utilities/unixToAgo'
import ReactionSection from '../ReactionSection/ReactionSection'


interface CommentCardProps {
    comment: Post,
    showReplies: boolean
}
const CommentCard: React.FC<CommentCardProps> = ({comment, showReplies = true}) => {

    const context = useContext(AppContext);

    if (context == null) return <h1>ERROR</h1>;

    const reactToPost = async (reaction: ReactionType): Promise<boolean> => {
        return await context.reactToPost(comment.stream_id, reaction);
    };

  return (
    <Box
      w={"full"}
      maxW={"1200px"}
      rounded={"md"}
      px={4}
      pt={4}
    >
        <Flex align={"center"} justify={"space-between"} className="w-full">
          <div className="flex items-center">
            <Avatar size={"sm"} mr={3} src={comment.creator_details.profile?.pfp ?? ""} />
            <Text fontSize={"sm"} mr={3}>
              {comment.creator_details.profile?.username?.slice(0,16) ?? comment.creator_details.metadata.address.slice(0,16)}
            </Text>
            <Text fontSize={"xs"} color={"gray.500"}>
              {unixToAgo(comment.timestamp)}
            </Text>
          </div>
        </Flex>
      <Flex
        justify={"space-between"}
      >
        <div >
          <Text fontWeight={"semibold"} mb={1}>
            {comment.content.title}
          </Text>
          <Text>{comment.content.body}</Text>
        </div>
        
      </Flex>
      <Flex
        justify={"space-between"}
        mt={4}
        py={2}
      >
        <Flex align={"center"} justify={"space-between"} className="w-full">
            <Flex align={"center"}>
            {showReplies && (
                <>
                <ChatIcon mr={2} />
                <Text>{comment.count_replies} Replies</Text>
                </>
            )}
            </Flex>
            <ReactionSection
                downvoteCounts={comment.count_downvotes}
                hahaCounts={comment.count_haha}
                heartCounts={comment.count_likes}
                react={reactToPost}
            />
        </Flex>
      </Flex>
    </Box>
  )
}

export default CommentCard


