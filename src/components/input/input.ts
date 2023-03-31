import Block from '../../pages/base-block'
import { inputTemplate } from './template'
export enum StatusFormControl { success = 'success', error = 'error'}
export enum TypeFormControl { text = 'text', password = 'password', email = 'email'}
export type inputState = {
    name?: String,
    placeholder?: String,
    status?: StatusFormControl,
    label?: String,
    error?: String,
    type?: TypeFormControl,
    html?: String
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