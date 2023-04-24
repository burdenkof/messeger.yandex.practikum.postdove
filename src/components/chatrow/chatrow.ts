import { chatRow } from '../../types';
import Block from '../../utils/base-block'
import { chatRowTemplate } from './template'


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