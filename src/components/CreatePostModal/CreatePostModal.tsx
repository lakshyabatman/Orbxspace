import { Button, Input, Modal } from "antd";
import React from "react";

export interface CreatePostModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (title: string, body: string) => Promise<void>;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const TextArea = Input.TextArea;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      centered
      footer
      width={720}
      wrapClassName="bg-[#F2F2F2] bg-opacity-50 backdrop-filter backdrop-blur-sm"
    >
      <div>
        <div className="mb-8 text-center">
          <p className="text-2xl text-[#69248A] font-semibold">Create a post</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(title, content);
          }}
        >
          <p className="mb-1 text-xs font-semibold">TITLE</p>
          <Input
            placeholder="(Optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-8 rounded-sm"
            style={{
              boxShadow: "0px 0px 20px 1px rgba(175, 92, 214, 0.25)",
            }}
            required={true}
            size="large"
          />
          <p className="mb-1 text-xs font-semibold">CONTENT</p>
          <TextArea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-8 rounded-sm resize-none min-h-[200px]"
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
              className="text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none w-48 h-10 mx-auto"
              htmlType="submit"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
