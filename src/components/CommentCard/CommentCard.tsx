import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ChatIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Post, ReactionType } from "../../models";
import { unixToAgo } from "../../utilities/unixToAgo";
import ReactionSection from "../ReactionSection/ReactionSection";

interface CommentCardProps {
  comment: Post;
  showReplies: boolean;
}
const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  showReplies = true,
}) => {
  const context = useContext(AppContext);

  if (context == null) return <h1>ERROR</h1>;

  const reactToPost = async (reaction: ReactionType): Promise<boolean> => {
    return await context.reactToPost(comment.stream_id, reaction);
  };

  return (
    <div className="w-full max-w-[1200px] rounded-md px-4 pt-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Avatar
            size={"small"}
            className="flex items-center justify-center cursor-pointer bg-[#D9D9D9] text-black mr-3"
            icon={<UserOutlined />}
            src={comment.creator_details.profile?.pfp ?? ""}
          />
          <p className="mr-3 text-sm">
            {comment.creator_details.profile?.username?.slice(0, 16) ??
              comment.creator_details.metadata.address.slice(0, 16)}
          </p>
          <p className="text-xs text-gray-500">
            {unixToAgo(comment.timestamp)}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="mb-1 font-semibold">{comment.content.title}</p>
          <p>{comment.content.body}</p>
        </div>
      </div>
      <div className="flex justify-between py-2 mt-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {showReplies && (
              <>
                <ChatIcon />
                <p className="ml-2">{comment.count_replies} Replies</p>
              </>
            )}
          </div>
          <ReactionSection
            downvoteCounts={comment.count_downvotes}
            hahaCounts={comment.count_haha}
            heartCounts={comment.count_likes}
            react={reactToPost}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
