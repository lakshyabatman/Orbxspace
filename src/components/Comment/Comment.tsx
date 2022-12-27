import { Box, FormControl, Input } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Post } from "../../models";
import CommentCard from "../CommentCard/CommentCard";
import PostPreviewCard from "../PostPreviewCard/PostPreviewCard";

export interface CommentCardProps {
  comment: Post;
}

const Comment: React.FC<CommentCardProps> = ({ comment }) => {
  const [reply, setReply] = useState("");
  const context = useContext(AppContext);

  const [replies, setReplies] = useState<Post[]>([]);

  if (context == null) return <h1>ERROR</h1>;

  const addComment = async (event: any) => {
    if (event.keyCode == 13) {
      await context.createComment(reply, comment.stream_id, null, []);
      setReply("")
    }
  };

  useEffect(() => {
    context
      .getReplies(comment.stream_id)
      .then((replies) => setReplies(replies));
  }, []);

  return (
    <div className="my-4  ">
      <CommentCard comment={comment}/>
      <FormControl onKeyDown={addComment} mt={4} ml={6}>
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
      <div className="ml-6">
        {replies.map((cmt) => {
          return (
            <div className="my-3">
             <CommentCard comment={cmt}/>
            </div>
          );
        })}
        <div className="border-b border-solid border-black mt-3"/>
      </div>
    </div>
  );
};

export default Comment;
