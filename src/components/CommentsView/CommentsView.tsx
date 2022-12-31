import React from "react";
import { Post } from "../../models";
import Comment from "../Comment/Comment";

export interface CommentsViewProps {
  comments: Post[];
}

export const CommentsView: React.FC<CommentsViewProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </div>
  );
};
