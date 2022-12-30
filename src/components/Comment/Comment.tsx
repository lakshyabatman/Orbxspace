import { Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Post } from "../../models";
import CommentCard from "../CommentCard/CommentCard";

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
      const res = await context.createComment(
        reply,
        comment.stream_id,
        null,
        []
      );
      setReply("");

      if (res) {
        setReplies([...replies, res]);
      }
    }
  };

  useEffect(() => {
    context
      .getReplies(comment.stream_id)
      .then((replies) => setReplies(replies));
  }, []);

  return (
    <div className="my-4 ">
      <CommentCard comment={comment} showReplies />
      <div className="bg-[#EDEDED] p-3 ml-14">
        <Input
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          required={true}
          placeholder="Add a reply"
          onKeyDown={addComment}
        />
      </div>

      <div className="ml-14">
        {replies.map((cmt) => {
          return (
            <div className="my-3">
              <CommentCard comment={cmt} showReplies={false} />
            </div>
          );
        })}
      </div>
      <div className="mt-5 border-b border-black border-solid" />
    </div>
  );
};

export default Comment;
