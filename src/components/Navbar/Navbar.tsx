import { Modal } from "antd";
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
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { NetworkType } from "../../models";
import { Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const connectWallet = (network: NetworkType) => {
    context?.connectWallet(network);
    setIsModalOpen(false);
  };
  if (context == null) return <h1>ERROR</h1>;

  return (
    <>
      <Modal open={isModalOpen}>
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-[#69248A]">
            Connect to Orbis
          </h3>
          <p className="my-3 text-xl">With your wallet</p>
          <hr />
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <Button
            className="mb-4 bg-[#B45008] text-white w-44 "
            onClick={() => connectWallet(NetworkType.Ethereum)}
          >
            Metamask
          </Button>
          <Button
            className="bg-[#201191] text-white  w-44 "
            onClick={() => connectWallet(NetworkType.Solana)}
          >
            Phantom
          </Button>
        </div>
      </Modal>
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
          {context.connectedAddress ? (
            // <Button className="text-white" disabled>
            //   <span className="text-white">
            //
            //   </span>
            // </Button>
            <Popover>
              <PopoverTrigger>
                <Avatar size={"sm"} />
              </PopoverTrigger>
              <PopoverContent width={64}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  {context.connectedAddress.slice(0, 8) + `...`}
                </PopoverHeader>
                <PopoverBody textAlign={"center"}>
                  <Button
                    size={"sm"}
                    onClick={() => {
                      context.logout();
                    }}
                  >
                    {" "}
                    Log Out{" "}
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Button onClick={openModal} size={"sm"}>
              Connect Wallet
            </Button>
          )}
        </div>
      </Flex>
    </>
  );
};

export default Navbar;
