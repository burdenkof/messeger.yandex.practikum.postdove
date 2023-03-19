import Handlebars from "handlebars";
import { signupTemplate } from "./template.js";
import { buttonTemplate } from "../../components/button/template.js";
import { getinput } from "../../components/input/input.js";

export function getSignup() {


    const template = Handlebars.compile(signupTemplate)

    const inputs = [];
    const itemFirstName = {
        name: 'first_name',
        placeholder: 'Jonh',
        status: 'success',
        label: 'First name',
        error: '',
        type: 'text'
    }
    itemFirstName.html = getinput(itemFirstName)


    const itemSecondName = {
        name: 'second_name',
        placeholder: 'Smith',
        status: 'success',
        label: 'Second name',
        error: '',
        type: 'text'
    }
    itemSecondName.html = getinput(itemSecondName)


    const itemDisplayName = {
        name: 'display_name',
        placeholder: 'Jo',
        status: 'success',
        label: 'Nick',
        error: '',
        type: 'text'
    }
    itemDisplayName.html = getinput(itemDisplayName)

    const itemLogin = {
        name: 'login',
        placeholder: 'Joker',
        status: 'success',
        label: 'Login',
        error: '',
        type: 'text'
    }
    itemLogin.html = getinput(itemLogin)

    const itemEmail = {
        name: 'email',
        placeholder: 'box@domain.com',
        status: 'error',
        label: 'Email',
        error: 'Wrong email',
        type: 'email'
    }
    itemEmail.html = getinput(itemEmail)


    const itemPhone = {
        name: 'phone',
        placeholder: '+7 (927) 999-99-99',
        status: 'success',
        label: 'Phone',
        error: '',
        type: 'text'
    }
    itemPhone.html = getinput(itemPhone)

    const itemPassword = {
        name: 'password',
        placeholder: '',
        status: 'success',
        label: 'Password',
        error: '',
        type: 'password'
    }
    itemPassword.html = getinput(itemPassword)

    const itemPassword2 = {
        name: 'password2',
        placeholder: '',
        status: 'error',
        label: 'Repeat Password',
        error: 'Passwords must be equal',
        type: 'password'
    }
    itemPassword2.html = getinput(itemPassword2)





    inputs.push(itemFirstName)
    inputs.push(itemSecondName)
    inputs.push(itemDisplayName)
    inputs.push(itemLogin)
    inputs.push(itemEmail)
    inputs.push(itemPhone)
    inputs.push(itemPassword)
    inputs.push(itemPassword2)


    const templateBtn = Handlebars.compile(buttonTemplate)

    const btnSignUp = templateBtn({
        name: 'Sign Up',
        id: 'btn-sign-up',
        type: 'submit',
        onclick: ''
    })

    return template({
        inputs: inputs,
        btnSignUp: btnSignUp
    })
}