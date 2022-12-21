import React, { createContext, useEffect, useState } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";
import {
  AppState,
  Channel,
  CreateChannelRequest,
  GroupDetails,
  Mention,
  NetworkType,
  Post,
  Profile,
  ReactionType,
  UserConnectionResponse,
} from "../models";

import { notification, Spin } from "antd";

declare global {
  interface Window {
    ethereum: any;
    phantom: any;
  }
}

interface IAppContext {
  connectWallet: (network: NetworkType) => Promise<void>;
  isConnected: () => Promise<boolean>;
  logout: () => Promise<void>;
  connectedAddress: string | null;
  currentNetwork: string | null;
  currentPost: Post | null;
  currentChannel: Channel | null;
  moveToChannel: (channelId: string) => Promise<void>;
  loading: boolean;
  currentPostComments: Post[];
  posts: Post[];
  groupDetails: GroupDetails | null;
  appState: AppState;
  currentUser: Profile | null,
  reactToPost: (postId: string, reaction: ReactionType) => Promise<boolean>;
  getPost: (id: string) => Promise<void>
}

export const AppContext = createContext<IAppContext | null>(null);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string) => {
    api.error({
      message: message,
      placement: "topRight",
    });
  };

  const [orbis, setOrbis] = useState(new Orbis());

  const appContextId =
    "kjzl6cwe1jw146bflbengus71iqrkzqhrqxfhotdjd3kzyo3hvx96p5fvo9c5ci";

  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  const [currentNetwork, setCurrentNetwork] = useState<NetworkType | null>(
    null
  );

  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(false);

  const [currentPostComments, setCurrentPostComments] = useState<Post[]>([]);

  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);

  const [currentGroup, setCurrentGroup] = useState<GroupDetails | null>(null);

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  const [appState, setAppState] = useState(AppState.NO_GROUP_FOUND);

  const isConnected = async () => {
    let res = await orbis.isConnected();
    if (res.status != 200) return false;
    setConnectedAddress(res.details.metadata.address);
    await getProfile(res.did);
    if ((res.details.metadata.chain as String).includes("solana")) {
      setCurrentNetwork(NetworkType.Solana);
    } else {
      setCurrentNetwork(NetworkType.Ethereum);
    }
    return true;
  };

  const connectWallet = async (network: NetworkType) => {
    try {
      setLoading(true);
      let res: UserConnectionResponse = await orbis.connect_v2({
        provider:
          network == NetworkType.Solana
            ? window.phantom?.solana
            : window.ethereum,
        chain: network.toString(),
      });
      if (res.status != 200) {
        throw new Error(res.result);
      }
      await getProfile(res.did);

      setConnectedAddress(res.details.metadata.address);
      setConnectedAddress(network);
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);

      // error handle
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      let res = await orbis.logout();
      if (res.status != 200) {
        throw new Error(res.result);
      }
      setConnectedAddress(null);
      setCurrentNetwork(null);
      setCurrentUser(null);
      setAppState(AppState.HOME_PAGE);
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);
    } finally {
      setLoading(false);
    }
  };

  const getGroupDetails = async () => {
    try {
      setLoading(true);
      const res = await orbis.getGroup(appContextId);
      if (res.status != 200) {
        throw new Error(res.error);
      }
      setCurrentGroup({
        ...res.data,
      });
      if (res.data.channels.length > 0) {
        setCurrentChannel(res.data.channels[0]);
      }
      await getPosts(
        res.data.channels.length > 0 ? res.data.channels[0].stream_id : ""
      );
      setAppState(AppState.HOME_PAGE);
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (body: string, channel: string, title: string) => {
    try {
      setLoading(true);
      let res = await orbis.createPost({ body, context: channel, title });
      if (res.status == 200) {
        // here fetch post and add it inside post lsit
        setTimeout(async () => {
          const post = await orbis.getPost(res.doc);
          setPosts([...posts, post]);
        }, 2000);
      } else {
        throw new Error(res.error);
      }

      return res;
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);
      // error handle
    } finally {
      setLoading(false);
    }
  };

  const createChannel = async (
    groupId: string,
    createChannelRequest: CreateChannelRequest
  ) => {
    let res = await orbis.createChannel(groupId, {
      group_id: groupId,
      pfp: createChannelRequest.pfp,
      name: createChannelRequest.name,
      description: createChannelRequest.description,
      type: createChannelRequest.type,
    });
    // console.log(res)
  };

  const getPost = async (id: string) => {
    try {
      setLoading(true);
      const res = await orbis.getPost(id);
      if (res.status != 200) {
        throw new Error(res.error);
      }
      // console.log(res)
      setCurrentPost({ ...res.data });
      setAppState(AppState.POST_PAGE)
    } catch (err: any) {
      console.error(err);
      // error handle
      openNotification(err.message ?? err);
    } finally {
      setLoading(false);
    }
  };


  const deletePost = async (id: string) => {
    try {
      setLoading(true);
      const res = await orbis.deletePost(id);
      if (res.status != 200) {
        throw new Error("Something went wrong while deleting Post");
      }
      const newPosts = posts.filter((post) => post.stream_id != res.doc);
      setPosts([...newPosts]);
    } catch (err) {
      console.error(err);
      // error handle
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (
    message: string,
    postId: string,
    parentComment: string | null,
    mentions: Mention[]
  ) => {
    try {
      setLoading(true);
      let res = await orbis.createPost({
        body: message,
        context: appContextId,
        master: postId,
        reply_to: parentComment,
        mentions,
      });
      if (res.status == 200) {
        // HERE FETCH THE COMMENT AND ADD IT INSIDE COMMENT LIST
        const comment = await orbis.getPost(res.doc);
        setCurrentPostComments([...currentPostComments, comment]);
      } else {
        throw new Error(res.error);
      }
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);
      // error handle
    } finally {
      setLoading(false);
    }
  };

  const getPosts = async (context: string): Promise<void> => {
    try {
      setLoading(true);
      // it'll fetch posts based on channels and if no channel is opened then the posts from the group itself
      const res = await orbis.getPosts({ context });
      console.log(res.data, "posts");
      if (res.status == 200) {
        // it might fetch comments or something so we can check on that, maybe aggregate comment counts on posts
        setPosts([...res.data]);
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  const getComments = async (master: string) => {
    try {
      setLoading(true);
      const res = await orbis.getPosts({ context: appContextId, master });
      if (res.status == 200) {
        // setup comments (posts)
        setCurrentPostComments([...res.data]);
      } else {
        throw new Error(res.error);
      }
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async () => {
    try {
      await orbis.setGroupMember(appContextId, true);
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);
      // handle error
    }
  };

  const getProfile = async (did: string) => {
    try {
      setLoading(true);
      let res = await orbis.getProfile(did);
      if (res.status != 200) {
        throw new Error(res.error);
      }
      setCurrentUser({
        ...res.data,
      });
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    pfp: string,
    username: string,
    description: string
  ) => {
    try {
      setLoading(true);
      let res = await orbis.updateProfile({
        pfp,
        username,
        description,
      });
      if (res.status == 200) {
      } else {
        throw new Error(res.error);
      }
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);
    } finally {
      setLoading(false);
    }
  };

  const moveToChannel = async (channelId: string) => {
    try {
      setLoading(true);
      if (!currentGroup) {
        throw new Error("Group doesn't exist");
      }
      const ch = currentGroup.channels.find(
        (channel) => channel.stream_id == channelId
      );
      if (!ch) throw new Error("Channel doesn't existi");
      setCurrentChannel({
        ...ch,
      });
      console.log(channelId);
      await getPosts(channelId);
    } catch (err: any) {
      console.error(err);
      openNotification(err.message ?? err);
      // handle error
    } finally {
      setLoading(false);
    }
  };



  const reactToPost = async (postId: string, reaction: ReactionType): Promise<boolean> => {
    try {
      const resp = await orbis.react(
        postId,
        reaction.toString()
      )
      if(resp.status == 200) {
        return true;
      }
      return false
    }catch(err: any) {
      console.log(err);
      openNotification(err.message ?? err);
      return false
    }
  }

  useEffect(() => {
    isConnected();
    getGroupDetails();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading">
      <AppContext.Provider
        value={{
          connectWallet,
          isConnected,
          logout,
          currentChannel,
          moveToChannel,
          currentNetwork,
          currentPost,
          currentPostComments,
          posts,
          connectedAddress,
          loading,
          groupDetails: currentGroup,
          appState,
          currentUser,
          reactToPost,
          getPost
        }}
      >
        <>
          {contextHolder}
          {children}
        </>
      </AppContext.Provider>
    </Spin>
  );
};

//  group -> kjzl6cwe1jw146bflbengus71iqrkzqhrqxfhotdjd3kzyo3hvx96p5fvo9c5ci
// channel -> kjzl6cwe1jw145ncgmvq48yorhi9qmmgce485yig98pauhz4seuiz4c8taszua6

export default AppProvider;
