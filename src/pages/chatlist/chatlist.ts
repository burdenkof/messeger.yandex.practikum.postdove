import { chatListTemplate } from "./template"
import chatRowComponent, { chatRow } from "../../components/chatrow/chatrow"
import messageRowComponent, { messageRow } from "../../components/messagerow/messagerow"
import { Nullable, render } from "../../utils/renderDOM"
import Block from "../../utils/base-block"

class pageChatList extends Block {
    constructor(props: { chats?: chatRowComponent[], messages?: messageRowComponent[] }) {
        super('div', props)
    }
    render() {
        return this.compile(chatListTemplate, this.props)
    }

}

export const renderChatList = (root: Nullable<HTMLDivElement>, chatItems: chatRow[], messageItems: messageRow[]) => {


    const chats: chatRowComponent[] = []
    const messages: messageRowComponent[] = []

    chatItems.map((item: chatRow) => {
        chats.push(new chatRowComponent(item))
    })

    messageItems.map((item: messageRow) => {
        messages.push(new messageRowComponent(item))
    })


    const page = new pageChatList({
        chats, messages
    })
    render(page, root)
}