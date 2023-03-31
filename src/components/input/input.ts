import Block from '../../pages/base-block'
import { inputTemplate } from './template'
export enum StatusFormControl { success = 'success', error = 'error'}
export enum TypeFormControl { text = 'text', password = 'password', email = 'email'}
export type inputState = {
    name: String,
    placeholder: String,
    status: StatusFormControl,
    label: String,
    error?: String,
    type: TypeFormControl,
    html?: String
}
export const getinput = (input: inputState) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(inputTemplate)
    return template({ item: input })
}

class inputComponent extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(inputTemplate, this.props);
    }
}
export default inputComponent