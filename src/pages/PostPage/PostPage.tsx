import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AppState, ReactionType } from "../../models";
import PostDetailCard from "../../components/PostDetailCard/PostDetailCard";
import { CommentsView } from "../../components/CommentsView/CommentsView";
import { Button, Input } from "antd";

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
      setComment("");
    }
  };

  return (
    <div className="flex flex-1">
      <Button
        type="text"
        onClick={() => context.setAppState(AppState.HOME_PAGE)}
        aria-label="Search database"
        icon={<ArrowBackIcon />}
        className="bg-transparent text-[#69248A] text-2xl font-semibold ml-[25px] py-0"
      />
      <div className="ml-[40px] w-full max-w-4xl py-4">
        <PostDetailCard currentPost={currentPost} react={reactToPost} />
        <div className="pt-3 mt-6 border-t border-black border-solid" >
          <div className="bg-[#EDEDED] p-3">
            <Input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required={true}
              placeholder="Add a reply"
              onKeyDown={addComment}
            />
          </div>
        </div>
        <CommentsView comments={currentPostComments} />
      </div>
    </div>
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
