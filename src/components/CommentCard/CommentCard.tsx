import { Box, FormControl, Input } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Post } from '../../models'
import PostPreviewCard from '../PostPreviewCard/PostPreviewCard'

export interface CommentCardProps {
    comment: Post
}

const CommentCard:React.FC<CommentCardProps> = ({comment}) => {
    const [reply, setReply] = useState("");
    const context = useContext(AppContext);

    const [replies, setReplies] = useState<Post[]>([]);



    if (context == null) return <h1>ERROR</h1>;


    const addComment = async (event: any) => {
        if (event.keyCode == 13) {
          await context.createComment(reply, comment.stream_id, null, []);
        }
      };

    useEffect(() => {
        context.getReplies(comment.stream_id).then((replies) => setReplies(replies))
    },[])

    return (
    <div className='my-4'>
         <PostPreviewCard
          postContent={comment.content.body ?? ""}
          postAuthor={comment.creator_details.profile?.username ?? comment.creator_details.metadata.address}
          authorPfp={comment.creator_details.profile?.pfp ?? ""}
          postTimestamp={comment.timestamp}
          replyCounts={comment.count_replies}
          downvoteCounts={comment.count_downvotes}
          hahaCounts={comment.count_haha}
          heartCounts={comment.count_likes}
          postId={comment.stream_id}
        />
        <FormControl onKeyDown={addComment} mt={6}>
            {/* <FormLabel>Email address</FormLabel> */}
            <Box bgColor={"#EDEDED"} p={3}>
            <Input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required={true}
                placeholder="Add a reply"
                bgColor={"white"}
                focusBorderColor={"#69248A"}
            />
            </Box>
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <div className='ml-6'>
            {replies.map(cmt => {
                return (
                    <div className='my-3'>
                         <PostPreviewCard
                        postContent={cmt.content.body ?? ""}
                        postAuthor={cmt.creator_details.profile?.username ?? comment.creator_details.metadata.address}
                        authorPfp={cmt.creator_details.profile?.pfp ?? ""}
                        postTimestamp={cmt.timestamp}
                        replyCounts={cmt.count_replies}
                        downvoteCounts={cmt.count_downvotes}
                        hahaCounts={cmt.count_haha}
                        heartCounts={cmt.count_likes}
                        postId={cmt.stream_id}
                        />
                    </div>
                )
            })}
        </div> 
    </div>
  )
}

export default CommentCard