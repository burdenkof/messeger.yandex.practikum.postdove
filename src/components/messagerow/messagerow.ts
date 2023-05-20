import Block from '../../utils/base-block'
import { messageRowTemplate } from './template'

export enum messageType { input = 'input', output = 'output' }

export type messageRow = {
    chat_id: "number",
    time: "string",
    type: "string",
    outType: messageType,
    user_id: "string",
    content: "string",
    file?: {
        id: "number",
        user_id: "number",
        path: "string",
        filename: "string",
        content_type: "string",
        content_size: "number",
        upload_date: "string",
    }   
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
