import React from "react";
import { Post } from "../../models";
import Comment from "../Comment/Comment";


export interface CommentsViewProps {
  comments: Post[]
}

export const CommentsView: React.FC<CommentsViewProps> = ({comments}) => {
  console.log(comments)
  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment}/>
        // <PostPreviewCard
        //   postContent={comment.content.body ?? ""}
        //   postAuthor={comment.creator_details.profile?.username ?? comment.creator_details.metadata.address}
        //   authorPfp={comment.creator_details.profile?.pfp ?? ""}
        //   postTimestamp={comment.timestamp}
        //   replyCounts={comment.count_replies}
        //   downvoteCounts={comment.count_downvotes}
        //   hahaCounts={comment.count_haha}
        //   heartCounts={comment.count_likes}
        //   postId={comment.stream_id}
        // />
      )
      )}
    </div>
  );
};
