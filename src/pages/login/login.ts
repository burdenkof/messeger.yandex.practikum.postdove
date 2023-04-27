
import { loginTemplate } from "./template";
import inputComponent, { StatusFormControl, TypeFormControl } from "../../components/input/input";
import Block from "../../utils/base-block";
import buttonComponent from "../../components/button/button";
import { getFormData } from "../../utils/renderDOM";
import { controllerAuth } from "../../controllers/auth";

class pageLogin extends Block {
    constructor(props: any) {

        super("div", props);
    }

    render() {
        return this.compile(loginTemplate, this.props);
    }
}

export function renderLogin():Block {

    const itemLogin: inputComponent = new inputComponent({
        name: 'login',
        placeholder: 'phone or email',
        status: StatusFormControl.success,
        label: 'Username',
        error: '',
        type: TypeFormControl.text
    })


    const itemPassword: inputComponent = new inputComponent({
        name: 'password',
        status: StatusFormControl.error,
        label: 'Password',
        placeholder: '',
        error: '',
        type: TypeFormControl.password
    })
    const btnSignIn: buttonComponent = new buttonComponent({
        name: 'Sign In',
        id: 'btn-sign-in',
        type: 'submit',
        onclick: ''
    })
    const btnSignUp: buttonComponent = new buttonComponent({
        name: 'Sign Up',
        id: 'btn-sign-up',
        type: 'button',
        onclick: `window.location.href='/signup'`
    })
    const page = new pageLogin({
        itemLogin, itemPassword, btnSignIn, btnSignUp, events: {
            submit: (e: SubmitEvent) => {
                e.preventDefault()
                let data: any
                if (e.target instanceof HTMLFormElement) {
                     data = getFormData(e.target)
                     controllerAuth.singin(data)
                }
            }
        }
    })
    return page

}
