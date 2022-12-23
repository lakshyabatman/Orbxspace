import { Box, FormControl, Input, Textarea } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

import { PostWithComments, ReactionType } from "../../../models";
import PostDetailCard from "../../PostDetailCard/PostDetailCard";

const PostPage = () => {
  const context = useContext(AppContext);
  const [comments, setComments] = useState<PostWithComments[]>([]);
  const [comment, setComment] = useState("");

  if (context == null) return <h1>ERROR</h1>;
  const { currentPost, currentPostComments } = context;
  if (currentPost == null) return <h1>ERROR</h1>;

  const reactToPost = async (reaction: ReactionType): Promise<boolean> => {
    return await context.reactToPost(currentPost.stream_id, reaction);
  };

  useEffect(() => {
    const nestedComments: Record<string, PostWithComments> = {};
    const isComment: Record<string, boolean> = {};

    currentPostComments.forEach((comment) => {
      if (comment.reply_to && nestedComments[comment.reply_to]) {
        nestedComments[comment.reply_to].comments.push({
          ...comment,
          comments: [],
        });
        nestedComments[comment.stream_id] = { ...comment, comments: [] };
        isComment[comment.stream_id] = false;
      } else {
        nestedComments[comment.stream_id] = { ...comment, comments: [] };
        isComment[comment.stream_id] = true;
      }
    });

    const onlyMasterComments = Object.keys(nestedComments)
      .filter((comment) => isComment[comment])
      .map((commentKey) => nestedComments[commentKey]);
    setComments(onlyMasterComments);
  }, [currentPostComments]);

  const addComment = async (event: any) => {
    if (event.keyCode == 13) {
      await context.createComment(comment, currentPost.stream_id, null, []);
    }
  };

  return (
    <Box className="mx-10">
      <PostDetailCard currentPost={currentPost} react={reactToPost} />
      <hr />
      <FormControl onKeyDown={addComment} mt={6}>
        {/* <FormLabel>Email address</FormLabel> */}
        <Box bgColor={"#EDEDED"} p={3}>
          <Input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required={true}
            placeholder="Add a reply"
            bgColor={"white"}
            focusBorderColor={"#69248A"}
          />
        </Box>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
    </Box>
  );
};

export default PostPage;
