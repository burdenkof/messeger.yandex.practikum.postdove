import Block from '../../utils/base-block'
import { buttonTemplate } from './template'
 
export type buttonState = {
    name?: string,
    id?: string,
    type?: string,
    onclick?: string,
    events?: unknown
}

class buttonComponent extends Block {
    constructor(props: buttonState) {
        super("div", props);
    }

    render() {
        return this.compile(buttonTemplate, this.props);
    }
    setProps (nextProps: buttonState) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }
}
export default buttonComponent