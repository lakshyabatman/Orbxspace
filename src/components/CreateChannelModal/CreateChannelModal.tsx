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
  Textarea,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const CreateChannelModal = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("Chat");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalBody py={8}>
          <Box textAlign={"center"} mb={24}>
            <Text fontSize={"2xl"} color={"#69248A"} fontWeight={"semibold"}>
              Add a New Channel
            </Text>
          </Box>
          <Text mb={1} fontSize={"xs"} fontWeight={"semibold"}>
            CHANNEL NAME
          </Text>
          <Flex alignItems={"center"} mb={24}>
            <Input
              placeholder="Eg: Chill Sesh"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              rounded={"sm"}
              boxShadow={"0px 0px 20px 1px rgba(175, 92, 214, 0.25)"}
              focusBorderColor={"#69248A"}
              mr={4}
            />
            <Menu>
              <MenuButton
                as={Button}
                w={32}
                rightIcon={<ChevronDownIcon />}
                rounded={"sm"}
                boxShadow={"0px 0px 20px 1px rgba(175, 92, 214, 0.25)"}
                focusBorderColor={"#69248A"}
                background={"white"}
              >
                {channelType}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setChannelType("Chat");
                  }}
                >
                  Chat
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setChannelType("Feed");
                  }}
                >
                  Feed
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          <Button
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
            onClick={() => {
              console.log("name", channelName);
              console.log("type", channelName);
            }}
          >
            Create Channel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
