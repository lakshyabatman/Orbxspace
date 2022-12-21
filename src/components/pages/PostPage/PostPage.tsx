import { Box } from "@chakra-ui/react";
import React, { useContext } from 'react'
import { AppContext } from "../../../context/AppContext";

const PostPage = () => {
  const context = useContext(AppContext);

  if (context == null) return <h1>ERROR</h1>;

  return (
    <Box w={"full"} ml={4}>
      <h1>{context.currentPost?.content.body}</h1>
    </Box>
  )
}

export default PostPage