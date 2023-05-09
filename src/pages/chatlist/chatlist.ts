import { chatListTemplate } from "./template"
import messageRowComponent from "../../components/messagerow/messagerow"
import { getFormData, pregCheck } from "../../utils/renderDOM"
import Block from "../../utils/base-block"
import { PregErrors, PregValidate } from "../../utils/pregValidates"
import chatRowComponent from "../../components/chatrow/chatrow"
import { StoreEvents, store } from "../../utils/store"
import { chatRow } from "../../types"
import buttonComponent from "../../components/button/button"
import { controllerChatlist } from "../../controllers/chatlist"

class pageChatList extends Block {


    constructor(props: { chats?: chatRow[], messages?: messageRowComponent[], btnAddChat: buttonComponent, events?: unknown }) {

        const chatList: chatRowComponent[] = []
        if (props.chats) {
            props.chats.map((value: chatRow) => {
                chatList.push(new chatRowComponent(value))
            })
        }

        super('div', { ...props, chatList })
        store.on(StoreEvents.Updated, () => {
            const state = store.getState();

            this.setProps({ profileInfo: state.profileInfo, chats: state.chats });
        });
    }
    componentDidUpdate(oldProps: { chats?: chatRow[], messages?: messageRowComponent[], chatList?: chatRowComponent[] },
        newProps: { chats?: chatRow[], messages?: messageRowComponent[], chatList: chatRowComponent[] }): boolean {

        let chatsUpdated: boolean = false

        let oldChatList = oldProps.chatList ?? []
        if (newProps.chats !== undefined) {
            newProps.chats.map((value: chatRow, index: number) => {
                if (!oldProps.chats || index >= oldChatList.length) {
                    oldChatList.push(new chatRowComponent(value))
                    chatsUpdated = true
                } else {

                    this.props.chatList[index].setProps(value)

                }
            })
            if(oldProps.chats && newProps.chats.length < oldProps.chats.length){
                oldChatList.pop()
               // this.setProps({chatList: oldChatList_})
            }
        }
        return true;

    }
    render() {
        return this.compile(chatListTemplate, this.props)
    }


}

export const renderChatList = (): Block => {


    const chats: chatRow[] = []
    const messages: messageRowComponent[] = []



    const validate = (e: Event) => {
        if (e.target === null) return

        let data: any
        if (e.target instanceof HTMLFormElement) {
            e.preventDefault()
            data = getFormData(e.target)
        } else {
            const target = e.target as HTMLElement
            const form: HTMLFormElement | null = target.closest('form')
            if (form === null) return
            data = getFormData(form)
        }
        if (data.message) {
            data.message = data.message.toString().trim()
        }
        let errors = 0
        if (!pregCheck(PregValidate.noEmpty, data.message)) {
            errors++
            console.log(PregErrors.noEmpty)
        } else {
            console.log(data)
        }
    }
    const btnAddChat: buttonComponent = new buttonComponent({
        name: '+',
        id: 'btn-add-chat',
        type: 'button',
        events: {
            click: () => {
                const title: string | null = prompt("Укажите название нового чата")
                if (title) {
                    controllerChatlist.addChat({ title })
                }
            }
        }
    })
    const page = new pageChatList({
        chats, messages, btnAddChat,
        events: {
            submit: (e: SubmitEvent) => {
                validate(e)
            }
        }
    })

    /*     setTimeout(()=> {
            const oldChats = JSON.parse(JSON.stringify(page.props.chats))
            oldChats.push({
                id: 1,
                title: "test2",
                unread_count:12,
                last_message: {
                    user:{
                        first_name: "ololoo",
                        second_name: "olololo",
                        avatar: "",
                        email: "bu@ya.ru",
                        phone: "t575755",
                        login: "bu"
    
                    },
                    time: "01.01.2023",
                    content:'test'
    
                }
    
            })
            page.setProps({chats: oldChats})
        }, 2000) */
    return page
}


