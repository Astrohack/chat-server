
export interface Community {
    id: number,
    icon: string
}

export interface User {
    id: number;
    nick: string;
    avatar: string;
}

export interface Channel {
    id: number;
    name: string;
}

export interface Message {
    id: number;
    content: string;
    user: User;
    created: string;
    channel_id: number;
    reference: Message;
    attachments: Attachment[] | null
}

export interface MessageDataObject {
    id: number;
    content: string;
    author_id: number;
    created: string;
    channel_id: number;
    reference_id: number;
}

export interface PostDataObject {
    id: number;
    author_id: number;
    community_id: number | null;
    content: string;
    has_attachment: boolean;
    created: string;
}

export interface Attachment {
    id: number;
    filename: string;
    size: number;
    type: string;
}

export type File = {
    filename: string,
    originalname: string,
    size: number,
    mimetype: string,
}