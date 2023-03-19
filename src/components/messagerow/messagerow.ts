import { messageRowTemplate } from './template'

export enum messageType { input, output }

export type messageRow = {
    delivered: Boolean,
    readed: Boolean,
    userName: String,
    type: messageType | String,
    text: String,
    time: String,
    html?: String
}

export const getMessageRow = (message: messageRow) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(messageRowTemplate)
    return template({ item: message })
}