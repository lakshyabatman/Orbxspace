import { Button, Modal } from "antd";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { NetworkType } from "../../../models";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal = ({ isOpen, onClose }: ConnectModalProps) => {
  const context = useContext(AppContext);

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        centered
        footer
        wrapClassName="bg-[#F2F2F2] bg-opacity-50 backdrop-filter backdrop-blur-sm"
      >
        {/* <ModalOverlay backdropFilter="blur(10px)" /> */}

        <div className="py-8">
          <div className="text-center">
            <p className="text-3xl text-[#69248A] font-semibold">
              Connect to Orbis
            </p>
            <p className="mb-8 font-xl">With your wallet</p>
            <hr />
          </div>
          <div className="flex flex-col items-center w-full py-8">
            <Button
              onClick={() => context?.connectWallet(NetworkType.Ethereum)}
              className="w-96 h-16 bg-[#B45008] text-white mb-4 text-3xl"
            >
              Metamask
            </Button>
            <Button
              onClick={() => {
                context?.connectWallet(NetworkType.Solana);
              }}
              className="w-96 h-16 bg-[#201191] text-white mb-4 text-3xl"
            >
              Phantom
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
