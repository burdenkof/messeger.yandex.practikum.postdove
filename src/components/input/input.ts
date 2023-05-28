/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Block from '../../utils/base-block';
import { inputTemplate } from './template';

export enum StatusFormControl {
    success = 'success',
    error = 'error',
    hidden = 'hidden',
}
export enum TypeFormControl {
    text = 'text',
    password = 'password',
    file = 'file',
   
    email = 'email'
}


export type inputState = {
    name?: string,
    placeholder?: string,
    status?: StatusFormControl,
    label?: string,
    error?: string,
    type?: TypeFormControl,
    pattern?: string,
    events?: any,
    value?: string,
    hidden?: boolean
}
class inputComponent extends Block {
    constructor(props: inputState) {
        if(props.type == TypeFormControl.file){
            props.hidden = true
        }
        super('div', props);
    }

    render() {
        return this.compile(inputTemplate, this.props);
    }
    setProps(nextProps: inputState) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }
}
export default inputComponent