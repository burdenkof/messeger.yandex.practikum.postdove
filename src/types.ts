export type profileInfo = {
    first_name: string,
    second_name: string,
    phone: string,
    email: string,
    display_name: string,
    login: string,
    password: string
    id: number;
    avatar: string;
    role?: string;
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
