import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import { EditProfileModal } from "../EditProfileModal/EditProfileModal";

interface UserAvatarProps {
  connectedAddress: string;
  logout: () => void;
}

export const UserAvatar = ({ connectedAddress, logout }: UserAvatarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EditProfileModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Popover>
        <PopoverTrigger>
          <Avatar size={"sm"} />
        </PopoverTrigger>
        <PopoverContent width={64}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{connectedAddress.slice(0, 8) + `...`}</PopoverHeader>
          <PopoverBody textAlign={"center"}>
            <div className="flex flex-col items-center">
              <Button className="mb-2" size={"sm"} onClick={() => onOpen()}>
                <>Update Profile</>
              </Button>
              <Button
                size={"sm"}
                onClick={() => {
                  logout();
                }}
              >
                Log Out
              </Button>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
