import React, { useContext, useEffect } from "react";
import { Avatar, Button } from "antd";
import { useDisclosure } from "../../hooks/useDisclosure";
import { AppContext } from "../../context/AppContext";
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
      <div className="w-full flex h-20 bg-[#69248A] fixed px-16 top-0 z-10 justify-between items-center">
        <div className="items-center">
          {/* Community data */}
          {context.groupDetails?.content.pfp ? (
            <Avatar
              src={context.groupDetails?.content.pfp}
              className="mr-4"
              size={"default"}
            />
          ) : null}

          <p className="text-xl text-white" color={"white"}>
            {context.groupDetails?.content.name
              ? context.groupDetails.content.name.toUpperCase()
              : null}
          </p>
        </div>
        <div>
          {context.currentUser ? (
            <UserAvatar
              connectedUser={context.currentUser}
              logout={context.logout}
              onEditProfileSubmit={context.updateProfile}
            />
          ) : (
            <Button
              type={"primary"}
              onClick={onOpen}
              size={"large"}
              className="text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
