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
} from "@chakra-ui/react";
import React from "react";

interface UserAvatarProps {
  connectedAddress: string;
  logout: () => void;
}

export const UserAvatar = ({ connectedAddress, logout }: UserAvatarProps) => {
  return (
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
          <Button
              className="mb-2"
              size={"sm"}
              onClick={() => console.log("hu")}
            >
              <>Update Profile</>
            </Button>
            <Button
              size={"sm"}
              onClick={() => {
                logout();
              }}
            >
              {" "}
              Log Out{" "}
            </Button>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
