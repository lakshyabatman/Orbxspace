import React from "react";
import { Avatar, Button, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Profile } from "../../models";
import { useDisclosure } from "../../hooks/useDisclosure";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";

interface UserAvatarProps {
  connectedUser: Profile;
  logout: () => void;
  onEditProfileSubmit: (
    user: string,
    bio: string,
    pfp: string
  ) => Promise<void>;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  connectedUser,
  logout,
  onEditProfileSubmit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onSubmit={onEditProfileSubmit}
      />
      <Popover
        content={
          <div className="flex flex-col items-center w-32">
            <Button
              className="mb-2 hover:bg-[#F3E7F9] w-full py-1 rounded-lg"
              onClick={() => onOpen()}
            >
              <>Update Profile</>
            </Button>
            <Button
              className="hover:bg-[#F3E7F9] w-full py-1 rounded-lg"
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </Button>
          </div>
        }
        trigger="click"
      >
        <Avatar
          size={"large"}
          icon={<UserOutlined />}
          src={connectedUser.details.profile?.pfp ?? ""}
          className="flex items-center justify-center cursor-pointer bg-[#D9D9D9] text-black"
        />
      </Popover>
    </>
  );
};
