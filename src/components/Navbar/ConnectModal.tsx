import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { AppContext } from "../../context/AppContext";
import { NetworkType } from "../../models";
import { useContext } from "react";
import React from "react";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal = ({ isOpen, onClose }: ConnectModalProps) => {
  const context = useContext(AppContext);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalBody py={8}>
            <Box textAlign={"center"}>
              <Text fontSize={"3xl"} color={"#69248A"} fontWeight={"semibold"}>
                Connect to Orbis
              </Text>
              <Text mb={8} fontSize={"xl"}>
                With your wallet
              </Text>
              <hr />
            </Box>
            <Flex flexDir={"column"} align={"center"} w={"full"} py={8}>
              <Button
                onClick={() => context?.connectWallet(NetworkType.Ethereum)}
                colorScheme="orange"
                width={56}
                mb={4}
              >
                Metamask
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => context?.connectWallet(NetworkType.Solana)}
                width={56}
              >
                Phantom
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
