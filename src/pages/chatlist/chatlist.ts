import { chatListTemplate } from "./template"
import { getChatRow } from "../../components/chatrow/chatrow"
import { getMessageRow } from "../../components/messagerow/messagerow"

export const getChatList = (items, messages) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(chatListTemplate)
    
    

    items.map((item, i) =>{
        item.html = getChatRow(item)
    })

    messages.map((message, i) =>{
        message.html = getMessageRow(message)
    })
 

    return template({items: items, messages: messages})
}