import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { CreatePostModal } from "../CreatePostModal/CreatePostModal";
import { CreateChannelModal } from "../CreateChannelModal/CreateChannelModal";
import { ChannelType } from "../../models";
import { Button } from "antd";
import { PlusCircleOutlined, PlusCircleFilled } from "@ant-design/icons";

const SideMenu = () => {
  const context = useContext(AppContext);
  if (context == null) return <h1>ERROR</h1>;
  const currentChannel = context.currentChannel;

  const {
    isOpen: isCreatePostModalOpen,
    onOpen: onCreatePostModalOpen,
    onClose: onCreatePostModalClose,
  } = useDisclosure();

  const {
    isOpen: isCreateChannelModalOpen,
    onOpen: onCreateChannelModalOpen,
    onClose: onCreateChannelModalClose,
  } = useDisclosure();

  const createChannel = async (
    channelName: string,
    channelType: ChannelType
  ) => {
    context.createChannel({
      name: channelName,
      type: channelType,
      description: "",
      pfp: "",
    });
    onCreateChannelModalClose();
  };

  const createPost = async (title: string, content: string) => {
    if (!currentChannel) return;
    context.createPost(content, currentChannel.stream_id, title);
    onCreatePostModalClose();
  };

  const isAdmin = context.groupDetails?.creator == context.currentUser?.did;

  const isAllowedToPost =
    isAdmin ||
    (context.currentChannel?.content.type == ChannelType.CHAT &&
      !!context.currentUser);

  return (
    <div className="relative flex justify-end">
      <CreatePostModal
        onSubmit={createPost}
        isOpen={isCreatePostModalOpen}
        onClose={onCreatePostModalClose}
        onOpen={onCreatePostModalOpen}
      />
      <CreateChannelModal
        onSubmit={createChannel}
        isOpen={isCreateChannelModalOpen}
        onClose={onCreateChannelModalClose}
        onOpen={onCreateChannelModalOpen}
      />
      <div className="fixed flex flex-col">
        <div
          style={{
            boxShadow: "0px 0px 20px 1px rgba(175, 92, 214, 0.25)",
          }}
          className="p-4 bg-white mt-28 w-72 h-fit-content rounded-xl"
        >
          <p className="text-lg font-semibold mb-6 color-[#2D083F] border-b-1 pb-2">
            Channels
          </p>
          {context.groupDetails?.channels.map((channel) => {
            return (
              <div
                key={channel.stream_id}
                onClick={() => context.moveToChannel(channel.stream_id)}
                className={`text-sm py-2 my-2 pl-4 cursor-pointer rounded-md ${
                  currentChannel?.stream_id === channel.stream_id &&
                  "bg-[#F3E8FF] border-r-[6px solid #AF5CD6]"
                }`}
              >
                {channel.content.name}
              </div>
            );
          })}
          {isAdmin && (
            <Button
              block
              type="text"
              size="middle"
              icon={<PlusCircleOutlined />}
              onClick={() => onCreateChannelModalOpen()}
              className="flex items-center text-left"
            >
              <p className="ml-2">Create a Channel</p>
            </Button>
          )}
        </div>
        {isAllowedToPost && (
          <div
            className="py-1 mt-8 bg-white rounded-xl w-72 h-fit-content"
            style={{ boxShadow: "0px 0px 20px 1px rgba(175, 92, 214, 0.25)" }}
          >
            <Button
              block
              type="text"
              size="middle"
              icon={
                <PlusCircleFilled className="text-2xl text-gray-200 bg-black rounded-full" />
              }
              className="flex items-center pl-16"
              onClick={() => onCreatePostModalOpen()}
            >
              <p className="ml-4">Create Post</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
