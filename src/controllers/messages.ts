import { messageRow, messageType } from "../components/messagerow/messagerow";
import { Indexed } from "../utils/functions";
import { store } from "../utils/store";
import WebSocketTransport, { WebSocketEvents } from "../utils/ws";
import { controllerChatlist } from "./chatlist";

class ControllerMessages {

    private wsList: Indexed = {}
    private url = 'wss://ya-praktikum.tech/ws/chats'

    sendMessage(chatId: number, message: string) {
        if (this.wsList[chatId] === undefined) {
            this.connect(chatId)
        }

        const ws = this.wsList[chatId]

        if (ws === undefined) {
            return
        }

        ws.send({
            type: 'message',
            content: message,
        });
        controllerChatlist.getChats()
    }

    async connect(chatId: number) {

        const token = await controllerChatlist.getToken(chatId)

        const self = this
        if (this.wsList[chatId] !== undefined) {
            return
        }

        const state = store.getState()

        const userId = state.profileInfo.id;

        const ws = new WebSocketTransport(`${this.url}/${userId}/${chatId}/${token}`)

        this.wsList[chatId] = ws

        await ws.connect()

        ws.bus.on(WebSocketEvents.close_,
            () => {
                delete self.wsList[chatId]
            })

        ws.bus.on(
            WebSocketEvents.message,
            (data: any) => {
                let newMessages = []
                const parsedData = JSON.parse(data.data)
                const oldState = store.getState()

                const messages = oldState.messages??[]
                
                let old = messages[chatId]??[]
                if (Array.isArray(parsedData)) {
                    parsedData.reverse().map((value: messageRow, i) =>{
                        value.outType = value.user_id == oldState.profileInfo.id? messageType.output:messageType.input
                        newMessages.push(value)
                    })
                    old =[]
                } else {
                    if(parsedData.type !== 'message') return
                    parsedData.outType = parsedData.user_id == oldState.profileInfo.id? messageType.output:messageType.input
                    newMessages.push(parsedData);
                }


                store.set(`messages.${chatId}`, [...old, ...newMessages]);

            },
        )



        this.getAllMessages(chatId)
    }

    getAllMessages(chatId: number) {
        if (this.wsList[chatId] === undefined) {
            this.connect(chatId)
        }
        const ws = this.wsList[chatId]

        if (ws === undefined) {
            return
        }
        ws.send({ type: 'get old', content: '0' })
    }

}

export const controllerMessages = new ControllerMessages()