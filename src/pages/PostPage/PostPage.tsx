import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AppState, PostWithComments, ReactionType } from "../../models";
import PostDetailCard from "../../components/PostDetailCard/PostDetailCard";
import { CommentsView } from "../../components/CommentsView/CommentsView";

const PostPage = () => {
  const context = useContext(AppContext);
  const [comment, setComment] = useState("");

  if (context == null) return <h1>ERROR</h1>;
  const { currentPost, currentPostComments } = context;
  if (currentPost == null) return <h1>ERROR</h1>;

  const reactToPost = async (reaction: ReactionType): Promise<boolean> => {
    return await context.reactToPost(currentPost.stream_id, reaction);
  };

  const addComment = async (event: any) => {
    if (event.keyCode == 13) {
      await context.createComment(comment, currentPost.stream_id, null, []);
      setComment("")
    }
  };

  return (
    <Flex flex={1}>
      <IconButton
        onClick={() => context.setAppState(AppState.HOME_PAGE)}
        aria-label="Search database"
        icon={<ArrowBackIcon />}
        bgColor={"transparent"}
        color={"#69248A"}
        _hover={{ bgColor: "transparent" }}
        _active={{ bgColor: "transparent" }}
        _focus={{ bgColor: "transparent" }}
        fontSize={"2xl"}
        fontWeight={"semibold"}
        ml={"25px"}
        py={0}
        display={"flex"}
        alignItems={"flex-start"}
      />
      <Box ml={"40px"} w={"full"} maxW={"900px"}>
        <PostDetailCard currentPost={currentPost} react={reactToPost} />
        <FormControl onKeyDown={addComment} mt={6} borderTop={"1px solid black"} pt={3}>
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
        <CommentsView comments={currentPostComments} />
      </Box>
    </Flex>
  );
};

export default PostPage;

// const nestedComments: Record<string, PostWithComments> = {};
// const isComment: Record<string, boolean> = {};

// currentPostComments.forEach((comment) => {
//   if (comment.reply_to && nestedComments[comment.reply_to]) {
//     nestedComments[comment.reply_to].comments.push({
//       ...comment,
//       comments: [],
//     });
//     nestedComments[comment.stream_id] = { ...comment, comments: [] };
//     isComment[comment.stream_id] = false;
//   } else {
//     nestedComments[comment.stream_id] = { ...comment, comments: [] };
//     isComment[comment.stream_id] = true;
//   }

// });

// console.log()

// const onlyMasterComments = Object.keys(nestedComments)
//   .filter((comment) => isComment[comment])
//   .map((commentKey) => nestedComments[commentKey]);
// setComments(onlyMasterComments);
