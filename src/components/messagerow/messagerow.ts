import Block from '../../utils/base-block'
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
