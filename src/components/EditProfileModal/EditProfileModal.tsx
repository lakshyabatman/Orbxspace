import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  Flex,
  Textarea,
  FormControl,
} from "@chakra-ui/react";

import { ChannelType } from "../../models";

export interface CreateChannelModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (name: string, bio: string, pfp: string)=> Promise<void>
}

export const EditProfileModal: React.FC<CreateChannelModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSubmit
}) => {
  const [linkToPfp, setLinkToPfp] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);


  const editProfile = async (e : any) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(userName, bio, linkToPfp);
    onClose()
    setLoading(false);

  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalBody py={8}>
          <Box textAlign={"center"} mb={8}>
            <Text fontSize={"2xl"} color={"#69248A"} fontWeight={"semibold"}>
              Edit Profile
            </Text>
          </Box>
          <Text mb={1} fontSize={"xs"} fontWeight={"semibold"}>
            LINK TO PFP
          </Text>
          <form onSubmit={editProfile}>
            <FormControl>
              <Flex alignItems={"center"} mb={8}>
              <Input
                placeholder="Add pfp link"
                value={linkToPfp}
                onChange={(e) => setLinkToPfp(e.target.value)}
                rounded={"sm"}
                boxShadow={"0px 0px 20px 1px rgba(175, 92, 214, 0.25)"}
                focusBorderColor={"#69248A"}
                mr={4}
              />
            </Flex>
            <Text mb={1} fontSize={"xs"} fontWeight={"semibold"}>
              USERNAME
            </Text>
            <Flex alignItems={"center"} mb={8}>
              <Input
                placeholder="Add username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                rounded={"sm"}
                boxShadow={"0px 0px 20px 1px rgba(175, 92, 214, 0.25)"}
                focusBorderColor={"#69248A"}
                mr={4}
              />
            </Flex>
            <Text mb={1} fontSize={"xs"} fontWeight={"semibold"}>
              BIO
            </Text>
            <Flex alignItems={"center"} mb={8}>
              <Textarea
                placeholder="Add bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rounded={"sm"}
                boxShadow={"0px 0px 20px 1px rgba(175, 92, 214, 0.25)"}
                focusBorderColor={"#69248A"}
                mr={4}
                resize={"none"}
                height={48}
              />
            </Flex>

            <Button
              isLoading={loading}
              type="submit"
              display={"block"}
              mx={"auto"}
              bg={
                "linear-gradient(90deg, rgba(239, 136, 210, 1), rgba(175, 92, 214, 1))"
              }
              color={"white"}
              rounded={"md"}
              w={48}
              h={10}
              _hover={{
                bg: "linear-gradient(90deg, rgba(239, 136, 210, 1), rgba(175, 92, 214, 1))",
              }}
              _active={{
                bg: "linear-gradient(90deg, rgba(239, 136, 210, 1), rgba(175, 92, 214, 1))",
              }}
            >
              Save Changes
            </Button>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
