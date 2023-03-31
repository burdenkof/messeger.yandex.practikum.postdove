import Block from '../../pages/base-block'
import { messageRowTemplate } from './template'

export enum messageType { input = 'input', output = 'output' }

export type messageRow = {
    delivered?: Boolean,
    readed?: Boolean,
    userName?: String,
    type?: messageType,
    text?: String,
    time?: String,
    html?: String
}

export const getMessageRow = (message: messageRow) => {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(messageRowTemplate)
    return template({ item: message })
}

class messageRowComponent extends Block {
    constructor(props: messageRow) {
        super("div", props);
    }

    render() {
        return this.compile(messageRowTemplate, this.props);
    }
    setProps (nextProps: messageRow) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }
}
export default messageRowComponent