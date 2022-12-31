import React, { useContext } from "react";
import { ChatIcon } from "@chakra-ui/icons";
import { unixToAgo } from "../../utilities/unixToAgo";

import { ReactionType } from "../../models";
import { AppContext } from "../../context/AppContext";
import ReactionSection from "../ReactionSection/ReactionSection";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

interface PostProps {
  postTitle: string;
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
  postTitle,
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
    <div
      className="w-full max-w-[1200px] bg-white mb-8 rounded-md px-4 pt-4"
      style={{ boxShadow: "0px 0px 20px 1px rgba(175, 92, 214, 0.25)" }}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => context.getPost(postId)}
      >
        <div className="w-3/4">
          <p className="mb-1 font-semibold">{postTitle}</p>
          <p>{postContent}</p>
        </div>
        <div className="flex items-center">
          <ChatIcon mr={2} />
          <p>{replyCounts} Replies</p>
        </div>
      </div>
      <div className="flex justify-between py-2 mt-4 border-black border-t-1">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Avatar
              size={"small"}
              className="flex items-center justify-center cursor-pointer bg-[#D9D9D9] text-black mr-3"
              icon={<UserOutlined />}
              src={authorPfp ? authorPfp : ""}
            />

            <p className="mr-3 text-sm">{postAuthor}</p>
            <p className="text-gray-500 font-xs">{unixToAgo(postTimestamp)}</p>
          </div>
          <ReactionSection
            downvoteCounts={downvoteCounts}
            hahaCounts={hahaCounts}
            heartCounts={heartCounts}
            react={reactToPost}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPreviewCard;
