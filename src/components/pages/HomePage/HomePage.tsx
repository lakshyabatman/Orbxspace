import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { Post } from "../../Post/Post";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  const context = useContext(AppContext);

  if (context == null) return <h1>ERROR</h1>;

  return (
    <Box w={"full"} ml={4}>
      {context.posts.map((post) => {
        console.log(post);
        return (
          <Post
            postContent={post.content.body ? post.content.body : ""}
            postAuthor={
              post.creator_details.profile.username
                ? post.creator_details.profile.username
                : "anonymous"
            }
            authorPfp={post.creator_details.profile.pfp}
            postTimestamp={post.timestamp}
            postCommentsCount={post.count_replies.toString()}
          />
        );
      })}
    </Box>
  );
};

export default HomePage;
