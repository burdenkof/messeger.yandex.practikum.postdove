import Block from '../../utils/base-block'
import { inputTemplate } from './template'
export enum StatusFormControl { success = 'success', error = 'error'}
export enum TypeFormControl { text = 'text', password = 'password', email = 'email'}
export type inputState = {
    name?: string,
    placeholder?: string,
    status?: StatusFormControl,
    label?: string,
    error?: string,
    type?: TypeFormControl,
    pattern?: string,
    events?:any,
    value?: string
}
class inputComponent extends Block {
    constructor(props: inputState) {
        super("div", props);
    }

    render() {
        return this.compile(inputTemplate, this.props);
    }
    setProps (nextProps: inputState) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }
}
export default inputComponent