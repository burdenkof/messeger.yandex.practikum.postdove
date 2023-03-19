import { chatListTemplate } from "./template"
import { chatRow, getChatRow } from "../../components/chatrow/chatrow"
import { getMessageRow, messageRow } from "../../components/messagerow/messagerow"

export const getChatList = (items:chatRow[], messages:messageRow[]) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(chatListTemplate)
    
    

    items.map((item ) =>{
        item.html = getChatRow(item)
    })

    messages.map((message ) =>{
        message.html = getMessageRow(message)
    })
 

    return template({items: items, messages: messages})
}