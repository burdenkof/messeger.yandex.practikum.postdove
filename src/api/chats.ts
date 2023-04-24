import { chatDeleted, chatRow, profileInfo } from "../types";
import { ApiBase } from "./base";

export class ApiChats extends ApiBase {

    constructor() {
        super('/chats');
    }

    async getToken(id: number): Promise<string> {
        const result = await this.http.post<{ token: string }>(`/token/${id}`);
        return result.token;
    }


    getChats(): Promise<chatRow[]> {
        return this.http.get('');
    }

    create(data: {title: string}) {
        return this.http.post('', {data});
    }



    delete(chatId: number): Promise<chatDeleted> {
        return this.http.delete('', {data:{ chatId }});
    }

    update(newUsersToChat:  {
        users: number[],
        chatId: number,
    }): Promise<{ reason: string }> {
        return this.http.put('/users', {data:newUsersToChat});
    }

    setAvatar(data: FormData): Promise<chatRow> {
        return this.http.put('/avatar', {data});
    }

    getChatInfo(chatId: number): Promise<chatRow[]> {
        return this.http.get(`/${chatId}/common`);
    }

    getChatUsers(chatId: number): Promise<profileInfo[]> {
        return this.http.get(`/${chatId}/users`);
    }

    read = undefined

}