import React from "react";
import { Flex } from "@chakra-ui/react";
import PostDetailCard from "../PostDetailCard/PostDetailCard";
import PostPage from "../../pages/PostPage/PostPage";
import { Post } from "../PostPreviewCard/PostPreviewCard";

const dummyComments = [
  {
    stream_id: "1",
    creator_details: {
      profile: {
        username: "username",
        pfp: "https://picsum.photos/200",
      },
    },
    timestamp: 1620000000,
    content: {
      body: "This is a comment",
    },
    count_replies: 0,
    count_likes: 0,
    count_downvotes: 0,
    count_haha: 0,
    comments: [],
  },
  {
    stream_id: "2",
    creator_details: {
      profile: {
        username: "username",
        pfp: "https://picsum.photos/200",
      },
    },

    timestamp: 1620000000,
    content: {
      body: "This is a comment",
    },
    count_replies: 0,
    count_likes: 0,
    count_downvotes: 0,
    count_haha: 0,
    comments: [],
  },
];

export const CommentsView = () => {
  return (
    <div>
      {dummyComments.map((comment) => (
        <Post
          postContent={comment.content.body}
          postAuthor={comment.creator_details.profile.username}
          authorPfp={comment.creator_details.profile.pfp}
          postTimestamp={comment.timestamp}
          replyCounts={comment.count_replies}
          downvoteCounts={comment.count_downvotes}
          hahaCounts={comment.count_haha}
          heartCounts={comment.count_likes}
          postId={comment.stream_id}
        />
      ))}
    </div>
  );
};
