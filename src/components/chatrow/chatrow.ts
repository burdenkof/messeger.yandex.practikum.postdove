import { chatRowTemplate } from './template'

export const getChatRow = (item) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(chatRowTemplate)
    return template({ item })
}