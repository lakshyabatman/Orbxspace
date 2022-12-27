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
import { Profile } from "../../models";

import { EditProfileModal } from "../EditProfileModal/EditProfileModal";

interface UserAvatarProps {
  connectedUser: Profile
  logout: () => void;
  onEditProfileSubmit: (user: string, bio: string, pfp: string) => Promise<void>
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ connectedUser, logout , onEditProfileSubmit}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EditProfileModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} onSubmit={onEditProfileSubmit} />
      <Popover>
        <PopoverTrigger>
          <Avatar size={"sm"} src={connectedUser.details.profile?.pfp ?? ""}/>
        </PopoverTrigger>
        <PopoverContent width={64}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{connectedUser.address.slice(0, 8) + `...`}</PopoverHeader>
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
