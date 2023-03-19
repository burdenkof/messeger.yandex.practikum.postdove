
import { loginTemplate } from "./template";
import { buttonTemplate } from "../../components/button/template";
import { getinput, inputState, StatusFormControl, TypeFormControl } from "../../components/input/input";

export function getLogin() {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(loginTemplate)

    const inputs: inputState[] = [];
    //Авторизация (с формой, имена полей: login, password).  
    const itemLogin: inputState = {
        name: 'login',
        placeholder: 'phone or email',
        status: StatusFormControl.success,
        label: 'Username',
        error: '',
        type: TypeFormControl.text
    }
    itemLogin.html = getinput(itemLogin)

    const itemPassword: inputState = {
        name: 'password',
        status: StatusFormControl.error,
        label: 'Password',
        placeholder: '',
        error: 'Wrong user name or password',
        type: TypeFormControl.password
    }
    itemPassword.html = getinput(itemPassword)

    inputs.push(itemLogin)
    inputs.push(itemPassword)

    const templateBtn = Handlebars.compile(buttonTemplate)

    const btnSignIn = templateBtn({
        name: 'Sign In',
        id: 'btn-sign-in',
        type: 'submit',
        onclick: ''
    })
    const btnSignUp = templateBtn({
        name: 'Sign Up',
        id: 'btn-sign-up',
        type: 'button',
        onclick: `window.location.href='/#signup'`
    })


    return template({ inputs: inputs, btnSignIn: btnSignIn, btnSignUp: btnSignUp })
}
