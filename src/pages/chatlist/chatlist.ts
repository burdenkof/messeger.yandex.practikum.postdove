import { chatListTemplate } from "./template"
import messageRowComponent, { messageRow } from "../../components/messagerow/messagerow"
import { getFormData, pregCheck } from "../../utils/renderDOM"
import Block from "../../utils/base-block"
import { PregErrors, PregValidate } from "../../utils/pregValidates"
import chatRowComponent from "../../components/chatrow/chatrow"
import { chatRow } from "../../types"

class pageChatList extends Block {
    constructor(props: { chats?: chatRowComponent[], messages?: messageRowComponent[], events?: unknown }) {
        super('div', props)
    }
    render() {
        return this.compile(chatListTemplate, this.props)
    }

}

export const renderChatList = ():Block => {


    const chats: chatRowComponent[] = []
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
    const page = new pageChatList({
        chats, messages,
        events: {
            submit: (e: SubmitEvent) => {
                validate(e)
            }
        }
    })
    return page
}
