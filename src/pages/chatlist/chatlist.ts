import { chatListTemplate } from "./template"
import messageRowComponent, { messageRow } from "../../components/messagerow/messagerow"
import { getFormData, pregCheck } from "../../utils/renderDOM"
import Block from "../../utils/base-block"
import { PregErrors, PregValidate } from "../../utils/pregValidates"
import chatRowComponent from "../../components/chatrow/chatrow"
import { StoreEvents, store } from "../../utils/store"
import { chatRow } from "../../types"
import buttonComponent from "../../components/button/button"
import { controllerChatlist } from "../../controllers/chatlist"
import { controllerMessages } from "../../controllers/messages"
import { paths, router } from "../../utils/routes"

class pageChatList extends Block {


    constructor(props: { chats?: chatRow[], messages?: messageRow[], btnAddChat: buttonComponent, btnProfile: buttonComponent, events?: unknown }) {

        const chatList: chatRowComponent[] = []
        if (props.chats) {
            props.chats.map((value: chatRow) => {
                chatList.push(new chatRowComponent(value))
            })
        }

        const messagesList: messageRowComponent[] = []
        if (props.messages) {
            props.messages.map((value: messageRow) => {
                messagesList.push(new messageRowComponent(value))
            })
        }


        super('div', { ...props, chatList, messagesList })
        store.on(StoreEvents.Updated, () => {
            const state = store.getState()

            this.setProps({ profileInfo: state.profileInfo, chats: state.chats })
            if(state.currentChatId && state.messages && state.messages[state.currentChatId]){
                this.setProps({messages: state.messages[state.currentChatId]})
            }
        });
    }
    componentDidUpdate(oldProps: { chats?: chatRow[], messages?: messageRow[], chatList?: chatRowComponent[], messagesList?: messageRowComponent[] },
        newProps: { chats?: chatRow[], messages?: messageRow[], chatList: chatRowComponent[], messagesList?: messageRowComponent[] }): boolean {

        let chatsUpdated: boolean = false
        let messagesUpdated: boolean = false

        let oldChatList = oldProps.chatList ?? []

        let oldMessagesList = oldProps.messagesList ?? []

        if (newProps.chats !== undefined) {
            newProps.chats.map((value: chatRow, index: number) => {
                value.isSelected = value.id == store.getState().currentChatId
                if (!oldProps.chats || index >= oldChatList.length) {
                    oldChatList.push(new chatRowComponent(value))
                    chatsUpdated = true
                } else {

                    this.props.chatList[index].setProps(value)

                }
            })
            if (oldProps.chats && newProps.chats.length < oldProps.chats.length) {
                oldChatList.pop()
                chatsUpdated = true
                // this.setProps({chatList: oldChatList_})
            }
        }


        if (newProps.messages !== undefined) {
            newProps.messages.map((value: messageRow, index: number) => {
                if (!oldProps.messages || index >= oldMessagesList.length) {
                    oldMessagesList.push(new messageRowComponent(value))
                    messagesUpdated = true
                } else {

                    this.props.messagesList[index].setProps(value)

                }
            })
            if (oldProps.messages && newProps.messages.length < oldProps.messages.length) {
                while(newProps.messages.length < oldMessagesList.length){
                    oldMessagesList.pop()
                }
                messagesUpdated = true
               //  this.setProps({messagesList: oldMessagesList})
            }
        }
        return chatsUpdated || messagesUpdated;

    }
    render() {
        return this.compile(chatListTemplate, this.props)
    }


}

export const renderChatList = (): Block => {


    const chats: chatRow[] = []
    const messages: messageRow[] = []



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
            const state = store.getState()
            if (state.currentChatId) {
                const sendInput = document.getElementById('input-message') as HTMLInputElement
                if (sendInput) {
                    sendInput.value = ''
                    controllerMessages.sendMessage(state.currentChatId, data.message)
                }

            }
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
    const btnProfile: buttonComponent = new buttonComponent({
        name: 'Profile',
        id: 'btn-profile',
        type: 'button',
        events: {
            click: () => {
                router.go(paths.settings)
            }
        }
    })
    const page = new pageChatList({
        chats, messages, btnAddChat,btnProfile, 
        events: {
            submit: (e: SubmitEvent) => {
                validate(e)
            }
        }
    })
    controllerChatlist.getChats()


    return page
}


