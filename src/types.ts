export type profileInfo = {
    first_name: String,
    second_name: String,
    phone: String,
    email: String,
    display_name: String,
    login: String,
    password: String
    id: number;
    avatar: String;
    role?:String;
}
export type chatRow = {
    isSelected?: boolean,
    id: number;
    title: string;
    avatar?: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    }
}
export type chatDeleted = {
    userId: number,
    result: {
        id: number,
        title: string,
        avatar: string,
    }
}