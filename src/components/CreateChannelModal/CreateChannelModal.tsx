import React, { useState } from "react";
import { ChannelType } from "../../models";
import { Input, Select, Modal, Button } from "antd";

export interface CreateChannelModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (channelName: string, channelType: ChannelType) => Promise<void>;
}
export const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSubmit,
}) => {
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState<ChannelType>(ChannelType.CHAT);

  const [loading, setLoading] = useState(false);

  return (
    <Modal open={isOpen} onCancel={onClose} centered className="w-xl" footer>
      <div className="py-8">
        <div className="mb-24 text-center">
          <p className="text-2xl text-[#69248A] font-semibold">
            Add a New Channel
          </p>
        </div>
        <p className="mb-1 text-xs font-semibold">CHANNEL NAME</p>
        <div className="flex items-center mb-24">
          <Input
            size="large"
            placeholder="Eg: Chill Sesh"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="rounded-md focus:border-[#69248A] mr-4"
            style={{
              boxShadow: "0px 0px 20px 1px rgba(175, 92, 214, 0.25)",
            }}
          />
          <Select
            size="large"
            className="w-32 rounded-md"
            value={channelType}
            options={[
              { label: "Chat", value: "chat" },
              { label: "Feed", value: "feed" },
            ]}
            onChange={(e) => setChannelType(e)}
            style={{
              boxShadow: "0px 0px 20px 1px rgba(175, 92, 214, 0.25)",
            }}
          />
        </div>
        <div className="flex justify-center w-full">
          <Button
            type={"primary"}
            size={"large"}
            className="text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none w-48 h-10 mx-auto"
            loading={loading}
            onClick={async () => {
              try {
                setLoading(true);
                await onSubmit(channelName, channelType);
              } catch (err) {
              } finally {
                setLoading(false);
              }
            }}
          >
            Create Channel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
