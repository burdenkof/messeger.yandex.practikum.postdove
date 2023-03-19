import { signupTemplate } from "./template";
import { buttonTemplate } from "../../components/button/template";
import { getinput, inputState,StatusFormControl,   TypeFormControl} from "../../components/input/input";

export function getSignup() {

    const Handlebars = require("handlebars")
    const template = Handlebars.compile(signupTemplate)

    const inputs: inputState[] = [];
    const itemFirstName: inputState = {
        name: 'first_name',
        placeholder: 'Jonh',
        status: StatusFormControl.success,
        label: 'First name',
        error: '',
        type: TypeFormControl.text
    }
    itemFirstName.html = getinput(itemFirstName)


    const itemSecondName: inputState = {
        name: 'second_name',
        placeholder: 'Smith',
        status: StatusFormControl.success,
        label: 'Second name',
        error: '',
        type: TypeFormControl.text
    }
    itemSecondName.html = getinput(itemSecondName)


    const itemDisplayName: inputState = {
        name: 'display_name',
        placeholder: 'Jo',
        status: StatusFormControl.success,
        label: 'Nick',
        error: '',
        type: TypeFormControl.text
    }
    itemDisplayName.html = getinput(itemDisplayName)

    const itemLogin: inputState = {
        name: 'login',
        placeholder: 'Joker',
        status: StatusFormControl.success,
        label: 'Login',
        error: '',
        type: TypeFormControl.text
    }
    itemLogin.html = getinput(itemLogin)

    const itemEmail: inputState = {
        name: 'email',
        placeholder: 'box@domain.com',
        status: StatusFormControl.error,
        label: 'Email',
        error: 'Wrong email',
        type: TypeFormControl.email
    }
    itemEmail.html = getinput(itemEmail)


    const itemPhone: inputState = {
        name: 'phone',
        placeholder: '+7 (927) 999-99-99',
        status: StatusFormControl.success,
        label: 'Phone',
        error: '',
        type: TypeFormControl.text
    }
    itemPhone.html = getinput(itemPhone)

    const itemPassword: inputState = {
        name: 'password',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'Password',
        error: '',
        type: TypeFormControl.password
    }
    itemPassword.html = getinput(itemPassword)

    const itemPassword2: inputState = {
        name: 'password2',
        placeholder: '',
        status: StatusFormControl.error,
        label: 'Repeat Password',
        error: 'Passwords must be equal',
        type: TypeFormControl.password
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

    const btnSignUp: String = templateBtn({
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