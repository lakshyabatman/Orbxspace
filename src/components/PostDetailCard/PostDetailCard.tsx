import React from "react";
import { ChatIcon } from "@chakra-ui/icons";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Post, ReactionType } from "../../models";
import { unixToAgo } from "../../utilities/unixToAgo";
import ReactionSection from "../ReactionSection/ReactionSection";

export interface PostDetailCardProps {
  currentPost: Post;
  react: (reactioonType: ReactionType) => Promise<boolean>;
}

const PostDetailCard: React.FC<PostDetailCardProps> = ({
  currentPost,
  react,
}) => {
  return (
    <div>
      <div className="flex items-center">
        <Avatar
          size={"small"}
          className="flex items-center justify-center cursor-pointer bg-[#D9D9D9] text-black mr-3"
          icon={<UserOutlined />}
          src={currentPost.creator_details.profile?.pfp ?? ""}
        />
        <span className="mr-3 text-md">
          {currentPost.creator_details.profile?.username?.slice(0, 16) ??
            currentPost.creator_details.metadata.address.slice(0, 16)}
        </span>
        <span className="text-gray-500 text-md">
          {unixToAgo(currentPost.timestamp)}
        </span>
      </div>
      <h1 className="mt-4 mb-1 font-semibold">{currentPost?.content.title}</h1>
      <p className="mb-4">{currentPost?.content.body}</p>
      <div className="flex justify-between mb-4">
        <div className="flex text-center">
          <ChatIcon mr={2} />
          <span>{currentPost.count_replies} Replies</span>
        </div>
        <ReactionSection
          heartCounts={currentPost.count_likes}
          downvoteCounts={currentPost.count_downvotes}
          hahaCounts={currentPost.count_haha}
          react={react}
        />
      </div>
    </div>
  );
};

export default PostDetailCard;
