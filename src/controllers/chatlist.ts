import { ApiChats } from "../api/chats";
import { chatRow } from "../types";
import { store } from "../utils/store";

class ControllerChatlist {
    private model: ApiChats = new ApiChats();

    async getToken(id: number) {
        return this.model.getToken(id)
    }
    async addChat(data: {title: string}) {
        await this.model.create(data)
        await this.getChats()
    }

    async getChats() {
        const chats: chatRow[] = await this.model.getChats()
        store.set('chats', chats)
    }

    async getChatInfo(chatId: number): Promise<chatRow[]> {
        return this.model.getChatInfo(chatId)
    }
    
    async deleteChat(chatId: number) {
        await this.model.delete(chatId)
        this.getChats()
    }
    async addUserToChat(userId: number, chatId: number) {

        const data = {
            users: [
              userId
            ],
            chatId: chatId
          }
        await this.model.update(data)
        await this.getChats()
    }


}
export const controllerChatlist = new ControllerChatlist()