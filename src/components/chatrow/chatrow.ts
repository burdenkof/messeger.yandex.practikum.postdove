import Block from '../../utils/base-block'
import { chatRowTemplate } from './template'
export type chatRow = {
    html?: String,
    time?: String,
    name?: String,
    userName?: String,
    lastText?: String,
    avatar?: String
}

class chatRowComponent extends Block {
    constructor(props: chatRow) {
        super("div", props);
    }

    render() {
        return this.compile(chatRowTemplate, this.props);
    }
    setProps (nextProps: chatRow) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }
}
export default chatRowComponent