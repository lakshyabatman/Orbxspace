import React from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  Textarea,
  FormControl,
} from "@chakra-ui/react";



export interface CreatePostModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (title: string,body: string ) => Promise<void>
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalBody py={8}>
          <Box textAlign={"center"} mb={8}>
            <Text fontSize={"2xl"} color={"#69248A"} fontWeight={"semibold"}>
              Create a post
            </Text>
          </Box>
          <form onSubmit={(e) => {
            e.preventDefault()
            onSubmit(title, content)
          }}>
            <FormControl >
            
            <Text mb={1} fontSize={"xs"} fontWeight={"semibold"}>
              TITLE
            </Text>
            <Input
              placeholder="(Optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              mb={8}
              rounded={"none"}
              boxShadow={"0px 0px 20px 1px rgba(175, 92, 214, 0.25)"}
              focusBorderColor={"#69248A"}
              required={true}
            />
            <Text mb={1} fontSize={"xs"} fontWeight={"semibold"}>
              CONTENT
            </Text>
            <Textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rounded={"none"}
              boxShadow={"0px 0px 20px 1px rgba(175, 92, 214, 0.25)"}
              focusBorderColor={"#69248A"}
              mb={8}
              resize={"none"}
              minH={"200px"}
              required={true}
            />
            <Button
              type="submit"
              display={"block"}
              mx={"auto"}
              bg={
                "linear-gradient(90deg, rgba(239, 136, 210, 1), rgba(175, 92, 214, 1))"
              }
              color={"white"}
              rounded={"md"}
              w={32}
              h={10}
              _hover={{
                bg: "linear-gradient(90deg, rgba(239, 136, 210, 1), rgba(175, 92, 214, 1))",
              }}
              _active={{
                bg: "linear-gradient(90deg, rgba(239, 136, 210, 1), rgba(175, 92, 214, 1))",
              }}
            >
              Post
            </Button>
            </FormControl>
          </form>
          
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
