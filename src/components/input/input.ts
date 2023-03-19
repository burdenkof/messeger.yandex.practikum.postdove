import { inputTemplate } from './template'
export enum StatusFormControl {error, success}
export enum TypeFormControl {text, password, email}
export type inputState ={
    name: String,
    placeholder: String,
    status: StatusFormControl,
    label: String,
    error?: String,
    type: TypeFormControl,
    html?: String
}
export const getinput = (input:inputState) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(inputTemplate)
    return template({ item: input })
}