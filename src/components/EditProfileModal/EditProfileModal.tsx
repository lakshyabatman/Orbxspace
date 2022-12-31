import { Button, Input, Modal } from "antd";
import React, { useState } from "react";

export interface CreateChannelModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (name: string, bio: string, pfp: string) => Promise<void>;
}

export const EditProfileModal: React.FC<CreateChannelModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSubmit,
}) => {
  const [linkToPfp, setLinkToPfp] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const editProfile = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(userName, bio, linkToPfp);
    onClose();
    setLoading(false);
  };

  const TextArea = Input.TextArea;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      centered
      width={512}
      wrapClassName="bg-[#F2F2F2] bg-opacity-50 backdrop-filter backdrop-blur-sm"
      footer
    >
      <div>
        <div className="mb-8 text-center">
          <p className="text-2xl text-[#69248A] font-semibold">Edit Profile</p>
        </div>
        <p className="mb-1 text-xs font-semibold">LINK TO PFP</p>
        <form onSubmit={editProfile}>
          <Input
            placeholder="Add pfp link"
            value={linkToPfp}
            onChange={(e) => setLinkToPfp(e.target.value)}
            size="large"
            className="mb-8 mr-4 rounded-sm"
            style={{
              boxShadow: "0px 0px 20px 1px rgba(175, 92, 214, 0.25)",
            }}
          />

          <p className="mb-1 text-xs font-semibold">USERNAME</p>
          <Input
            placeholder="Add username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mb-8 mr-4 rounded-sm"
            size="large"
            style={{
              boxShadow: "0px 0px 20px 1px rgba(175, 92, 214, 0.25)",
            }}
          />

          <p className="mb-1 text-xs font-semibold">BIO</p>
          <TextArea
            placeholder="Add bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mb-8 rounded-md resize-none min-h-[200px]"
            style={{
              boxShadow: "0px 0px 20px 1px rgba(175, 92, 214, 0.25)",
            }}
            required={true}
            autoSize={{ minRows: 8, maxRows: 12 }}
          />

          <div className="w-full text-center">
            <Button
              type={"primary"}
              size={"large"}
              className="text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none w-48 mx-auto"
              htmlType="submit"
              loading={loading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
