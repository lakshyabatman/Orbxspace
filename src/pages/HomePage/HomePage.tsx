import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import PostPreviewCard from "../../components/PostPreviewCard/PostPreviewCard";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  const context = useContext(AppContext);

  if (context == null) return <h1>ERROR</h1>;

  return (
    <Box w={"full"} ml={4}>
      {context.posts.map((post) => {
        return (
          <PostPreviewCard
            postContent={post.content.body ? post.content.body : ""}
            postAuthor={
              post.creator_details.profile?.username ?? post.creator_details.metadata.address
            }
            authorPfp={post.creator_details.profile?.pfp ?? ""}
            postTimestamp={post.timestamp}
            downvoteCounts={post.count_downvotes}
            hahaCounts={post.count_haha}
            heartCounts={post.count_likes}
            replyCounts={post.count_replies}
            postId={post.stream_id}
          />
        );
      })}
    </Box>
  );
};

export default HomePage;
