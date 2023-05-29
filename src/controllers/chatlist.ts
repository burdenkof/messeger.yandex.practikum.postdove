import { ApiChats } from "../api/chats";
import { chatRow } from "../types";
import { store } from "../utils/store";

class ControllerChatlist {
    private model: ApiChats = new ApiChats();

    async getToken(id: number) {
        return this.model.getToken(id)
    }
    async addChat(data: { title: string }) {
        await this.model.create(data)
        await this.getChats()
    }

    async getChats(numTry: number = 0) {
        if(numTry > 5) return
        try {
            const chats: chatRow[] = await this.model.getChats()
            store.set('chats', chats)
        } catch (e) {
            console.log(e)
            setTimeout(async ()=>{
                await this.getChats(numTry+1)
              }, 1000)
        }
    }

    async getChatInfo(chatId: number): Promise<chatRow[]> {
        return this.model.getChatInfo(chatId)
    }

    async deleteChat(chatId: number) {
        await this.model.delete(chatId)
        store.set(`messages.${chatId}`, [])
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

    async deleteUserFromChat(userId: number, chatId: number) {

        const data = {
            users: [
                userId
            ],
            chatId: chatId
        }
        console.log(data)
        await this.model.deleteUserFromChat(data)
        await this.getChats()
    }
    async setAvatar(data: FormData) {
        await this.model.setAvatar(data)
    }

}
export const controllerChatlist = new ControllerChatlist()
