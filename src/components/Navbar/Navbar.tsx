import React, { useContext, useEffect } from "react";
import { Avatar, Button, useDisclosure } from "@chakra-ui/react";
import { AppContext } from "../../context/AppContext";
import { Flex, Text } from "@chakra-ui/react";
import { UserAvatar } from "./UserAvatar";
import { ConnectModal } from "./modals/ConnectModal";

const Navbar = () => {
  const context = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onClose();
  }, [context?.currentUser]);

  if (context == null) return <h1>ERROR</h1>;

  return (
    <>
      <ConnectModal isOpen={isOpen} onClose={onClose} />
      <Flex
        w={"full"}
        h={20}
        bgColor={"#69248A"}
        position="fixed"
        px={16}
        top={0}
        zIndex={1}
        justify={"space-between"}
        align={"center"}
      >
        <Flex align={"center"}>
          {/* Community data */}
          {context.groupDetails?.content.pfp ? (
            <Avatar
              src={context.groupDetails?.content.pfp}
              name="group pfp"
              mr={8}
            />
          ) : null}

          <Text color={"white"} fontSize={"xl"}>
            {context.groupDetails?.content.name
              ? context.groupDetails.content.name.toUpperCase()
              : null}
          </Text>
        </Flex>
        <div>
          {context.currentUser ? (
            <UserAvatar
              connectedUser={context.currentUser}
              logout={context.logout}
              onEditProfileSubmit={context.updateProfile}
            />
          ) : (
            <Button onClick={onOpen} size={"sm"}>
              Connect Wallet
            </Button>
          )}
        </div>
      </Flex>
    </>
  );
};

export default Navbar;
