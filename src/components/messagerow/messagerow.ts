import { messageRowTemplate } from './template'

export const getMessageRow = (message) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(messageRowTemplate)
    return template({ item: message })
}