
export interface Community {
    id: number,
    icon: string
}

export interface User {
    id: number;
    username: string;
    avatar: string;
}

export interface UserDTO {
    id: number;
    username: string;
    email: string;
    password: string;
    avatar: string;
}

export interface UserEditOptions {
    username?: string;
}

export interface UserPasswordDTO {
    id: number
    password: string;
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
    attachments: Attachment[] | undefined
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
    community_id: number | undefined;
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