import { inputTemplate } from './template'

export const getinput = (input) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(inputTemplate)
    return template({ item: input })
}