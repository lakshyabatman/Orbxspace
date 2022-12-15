
export enum NetworkType {
    Ethereum = 'ethereum',
    Solana = 'solana'
}

export enum AppState {
    NO_GROUP_FOUND = 'NO_GROUP_FOUND',
    HOME_PAGE = 'HOME_PAGE',
    POST_PAGE = 'POST_PAGE'
}


export interface Profile {
    username: string,
    pfp: string
}

export interface CreatorDetails {
    did: string,
    profile: Profile
}
// "kjzl6cwe1jw149q0dz6sfqmw6scb9qvtc7bqpceqz7t0g6m2o7nfdoc33zpm0y9"

export interface Post {
    stream_id: string,
    creator: string,
    creator_details: CreatorDetails | null,
    content: {
        body: string | null,
        context: string | null
    },
    context_details: {
        group_id: string | null,
        group_details: string | null,
        channel_id: string | null,
        channel_details: string | null
    },
    master: string | null,
    reply_to: string | null,
    reply_to_details: {
        body: string | null,
        context: string | null
    },
    count_likes: number,
    count_haha: number,
    count_downvotes: number,
    count_replies: number,
}



export interface GroupDetails {
	stream_id: string,
	creator: string,
	content: {
		pfp: string | null,
		name: string,
		description: string
	},
	channels:Channel[],
	count_members: number,
	last_activity_timestamp: number
}

export interface Channel {
    stream_id: string,
    content: {
        name: string,
        type: string,
        group_id: string,
        description: string
    }

}

export interface Mention {
    did: string,
    username: string
}

export interface Profile {
	did: string,
    address: string,
	details: {
        profile : {
            username: string | null,
            description: string | null,
            pfp: string | null,
        } | null,
        metadata: {
            address: string,
            chain: string,
            ensName: string | null
        }
	},
	count_followers: number,
	count_following: number,
	last_activity_timestamp: number
}


export interface UserConnectionResponse {
    status: number,
    did: string,
    details: {
      did: number,
      metadata: {
        address: string
      }
      profile: {
        username: string | null,
        description: string | null,
        pfp: string | null,
        } | null
    },
    result: string
  }


enum ChannelType {
    CHAT = 'chat',
    FEED = 'feed'
}

export interface CreateChannelRequest {
    pfp?: string,
    name: string,
    description:string,
    type: ChannelType
}