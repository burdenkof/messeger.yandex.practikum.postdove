import { chatRowTemplate } from './template'
export type chatRow = {
    html?: String,
    time: String,
    name: String,
    userName: String,
    lastText: String,
    avatar?: String
}
export const getChatRow = (item: chatRow) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(chatRowTemplate)
    return template({ item })
}