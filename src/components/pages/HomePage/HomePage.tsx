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
        return (
          <Post
            postContent={post.content.body ? post.content.body : ""}
            postAuthor={""}
            postDate={""}
          />
        );
      })}
    </Box>
  );
};

export default HomePage;
