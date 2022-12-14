import React, { createContext, useEffect, useState } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";
import { Channel, CreateChannelRequest, GroupDetails, Mention, NetworkType, Post, Profile, UserConnectionResponse } from "../models";

import {notification} from 'antd'

declare global {
    interface Window { ethereum: any, phantom: any }
}

  
interface IAppContext {
    connectWallet: (network: NetworkType) => Promise<void>,
    connectedAddress: string | null,
    currentNetwork: string | null,
    currentPost: Post | null,
    loading: boolean,
    currentPostComments: Post[],
    posts: Post[],
    groupDetails: GroupDetails | null
}

export const AppContext = createContext<IAppContext | null>(null);


const AppProvider: React.FC<React.PropsWithChildren> = ({children}) => {

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message: string) => {
        api.error({
          message: message,
          placement: 'topRight'
        });
      };
      

    const [orbis, setOrbis] = useState(new Orbis());

    const appContextId = "kjzl6cwe1jw146bflbengus71iqrkzqhrqxfhotdjd3kzyo3hvx96p5fvo9c5ci"

    const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

    const [currentNetwork, setCurrentNetwork] = useState<NetworkType | null>(null);

    const [currentPost, setCurrentPost] = useState<Post | null>(null);

    const [loading, setLoading] = useState(false);


    const [currentPostComments, setCurrentPostComments] = useState<Post[]>([]);

    const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);

    const [posts, setPosts] = useState<Post[]>([])

    const [currentGroup, setCurrentGroup] = useState<GroupDetails | null>(null);

    const [currentUser, setCurrentUser] = useState<Profile | null>(null);



    const connectWallet = async (network: NetworkType) => {
        try {
            let res: UserConnectionResponse = await orbis.connect_v2({
                provider: network == NetworkType.Solana ?  window.phantom?.solana : window.ethereum,
                chain: network.toString(),
            });
            if(res.status != 200) {
                throw new Error(res.result)
            }
            await getProfile(res.did)
            setConnectedAddress(res.details.metadata.address)      
            setConnectedAddress(network)
        }catch(err: any) {
            console.error(err)
             openNotification(err.message ?? err)

            // error handle
        }
    }


    const createPost = async (message: string, channel: string) => {
        try {
            let res = await orbis.createPost({body: message, context: channel});
            if(res.status == 200) {
                // here fetch post and add it inside post lsit
                const post = await orbis.getPost(res.doc);
                setPosts(
                    [...posts, post]
                )
            }else {
                throw new Error(res.error)
            }

            return res
        }catch(err : any) {
            console.error(err)
            openNotification(err.message ?? err)
            // error handle
        }
    }


    // const createGroup = async () => {
    //     const res = await orbis.createGroup({
    //         pfp: "https://lakshyabatman.github.io/static/media/me.d2ae65f7.jpeg",
    //         name: "cool community to test rn ",
    //         description:"sup degens"
    //       })
    //     console.log(res);
    // }
    

    const createChannel = async (groupId: string,createChannelRequest: CreateChannelRequest) => {
        let res = await orbis.createChannel(
            groupId,
            {
              group_id: groupId,
              pfp: createChannelRequest.pfp,
              name: createChannelRequest.name,
              description: createChannelRequest.description,
              type: createChannelRequest.type
            }
          );  
        // console.log(res)
    }


    const getPost = async (id: string) => {
        try {
            const res = await orbis.getPost(id);
            if(res.status != 200) {
                throw new Error(res.error)
            }
            // console.log(res)
            setCurrentPost({...res.data})
        }catch(err : any) {
            console.error(err)
            // error handle
            openNotification(err.message ?? err)
        }
    }

    const deletePost = async (id: string) => {
        try {
            const res = await orbis.deletePost(id);
            if(res.status !=200) {
                throw new Error("Something went wrong while deleting Post")
            }
            const newPosts = posts.filter(post => post.stream_id !=res.doc)
            setPosts([...newPosts])
        }catch(err) {
            console.error(err)
            // error handle
        }
    }

    const createComment = async (message: string, postId: string, parentComment: string | null, mentions: Mention[]) => {
        try {
            let res = await orbis.createPost({body: message, context: appContextId, master: postId, reply_to: parentComment, mentions});
            if(res.status == 200) {
                // HERE FETCH THE COMMENT AND ADD IT INSIDE COMMENT LIST
                const comment = await orbis.getPost(res.doc)
                setCurrentPostComments(
                    [...currentPostComments, comment],      
                )
            }else {
                throw new Error(res.error)
            }
        }catch(err: any) {
            console.error(err);
            openNotification(err.message ?? err)
            // error handle
        }
    }

    const getPosts = async (channel:string): Promise<Post[]>  => {
        try {
            const res =  await orbis.getPosts({context: channel});
            if(res.status == 200) {
                return res.data
            }else {
                throw new Error(res.error)
            }
        }catch(err) {
            return Promise.reject(err)
        }
    }


    const getAllPostsFromChannels = async () => {
        if(!currentGroup) {
            throw new Error("There is no group!")
        }
        try {
            const posts = (await Promise.all(currentGroup.channels.map(channel => getPosts(channel.stream_id)))).flat()
            setPosts([...posts])
        }catch(err: any) {
            console.error(err);
            openNotification(err.message ?? err)
            // error handle
        }

    }

    
    
    const getComments = async (master: string)  => {
        try {
            const res =  await orbis.getPosts({context: appContextId, master});
            if(res.status == 200) {
                // setup comments (posts)
                setCurrentPostComments(
                    [...res.data]
                )
            }else {
                throw new Error(res.error)
            }
        }catch(err: any) {
            
            console.error(err)
            openNotification(err.message ?? err)
        }
    }

    const getGroupDetails = async () => {
        try {
            const res = await orbis.getGroup(appContextId);
            if(res.status!=200) {
                throw new Error(res.error)
            }

            setCurrentGroup({
                ...res.data
            })
        }catch(err: any) {
            console.error(err)
            openNotification(err.message ?? err)
        }
    }


    const isConnected = async () => {
        let res = await orbis.isConnected();
        if(res.status != 200) return false
        setConnectedAddress(res.details.metadata.address);
        await getProfile(res.did)
        if((res.details.metadata.chain as String).includes("solana")) {
            setCurrentNetwork(NetworkType.Solana)
        }else {
            setCurrentNetwork(NetworkType.Ethereum)
        }
        return true;
    }


    const joinGroup = async () => {
        try {
            await orbis.setGroupMember(appContextId, true);
            
        }catch(err: any) {
            console.error(err)
            openNotification(err.message ?? err)
            // handle error
        }
    }

    const getProfile = async (did: string) => {
        try {
            let res = await orbis.getProfile(did);
            if(res.status != 200) {
                throw new Error(res.error)
            }
            setCurrentUser({
                ...res.data
            })

        }catch (err: any) {
            console.error(err)
            openNotification(err.message ?? err)
            // handle error
        }
    }


    const updateProfile = async (pfp: string, username: string, description: string) => {
        try {
            let res = await orbis.updateProfile({
                pfp,
                username,
                description
            });
            if(res.status == 200) {
                
            }else {
                throw new Error(res.error)
            }
        }catch(err: any) {
            console.error(err)
            openNotification(err.message ?? err)
        }
    }


    const moveToChannel = (channelId: string)=> {
        try {
            if(!currentGroup) {
                throw new Error("Group doesn't exist")
            }
            const ch = currentGroup.channels.find(channel => channel.stream_id == channelId);
            if(!ch) throw new Error("Channel doesn't existi")
            setCurrentChannel({
                ...ch
            })
        }catch(err: any) {
            console.error(err)
            openNotification(err.message ?? err)
            // handle error
        }
    }

    useEffect(() => {
        (async() => {
            if(!(await isConnected())) {
                await connectWallet(NetworkType.Ethereum)
            }

            // const p = await updateProfile(
            //     "https://lakshyabatman.github.io/static/media/me.d2ae65f7.jpeg",
            //     "lakshya",
            //     "dev"
            
            // )
            // console.log(p)

            // const p = await getProfile("did:pkh:solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:2z4vRZuspCy6WEBBZmTqyRv4mPnnHrvRj1wLEjVXuob8")
            // console.log(p)
            // await createGroup()
            // await createChannel("kjzl6cwe1jw146bflbengus71iqrkzqhrqxfhotdjd3kzyo3hvx96p5fvo9c5ci")

            // await getPosts()
            // await getGroupDetails()
           
            // console.log(currentGroup)
            // const posts =await Promise.all(
            //     currentGroup?.channels.map(channel => getPosts(channel.stream_id)) ?? []
            // )
            // console.log(posts)
            // await getPosts()

        })()
        
        // isConnected()
    },[])


    useEffect(() => {
        (async () => {
            // await createPost("gm", "kjzl6cwe1jw146bflbengus71iqrkzqhrqxfhotdjd3kzyo3hvx96p5fvo9c5ci")
            // await createPost("gm from other channel", "kjzl6cwe1jw146bflbengus71iqrkzqhrqxfhotdjd3kzyo3hvx96p5fvo9c5ci")
            if(currentGroup) {
                

                // currentGroup.channels.map(async channel => {
                //     await createPost("gm", channel.stream_id)
                // })
                getAllPostsFromChannels()
            }
        })()
             
    }, [currentGroup])


    return (
        <AppContext.Provider value={{connectWallet, currentNetwork, currentPost, currentPostComments, posts, connectedAddress, loading, groupDetails: currentGroup}}>
            <>
            {contextHolder}
            {children}
            </>
        </AppContext.Provider>
    )

}

//  group -> kjzl6cwe1jw146bflbengus71iqrkzqhrqxfhotdjd3kzyo3hvx96p5fvo9c5ci
// channel -> kjzl6cwe1jw145ncgmvq48yorhi9qmmgce485yig98pauhz4seuiz4c8taszua6


export default AppProvider


 