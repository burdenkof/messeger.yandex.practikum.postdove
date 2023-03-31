import buttonComponent from "../../components/button/button";
import inputComponent, { StatusFormControl, TypeFormControl } from "../../components/input/input";
import { Nullable, render } from "../../utils/renderDOM";
import Block from "../base-block";
import { signupTemplate } from "./template";
 
 
class pageSignup extends Block{
    constructor(props: any){
        super('div',props)
    }
    render(){
        return this.compile(signupTemplate, this.props)
    }
}
export function renderSignup(root:  Nullable<HTMLDivElement>) {
 

    const itemFirstName: inputComponent = new inputComponent( {
        name: 'first_name',
        placeholder: 'Jonh',
        status: StatusFormControl.success,
        label: 'First name',
        error: '',
        type: TypeFormControl.text
    })

    const itemSecondName: inputComponent = new inputComponent( {
        name: 'second_name',
        placeholder: 'Smith',
        status: StatusFormControl.success,
        label: 'Second name',
        error: '',
        type: TypeFormControl.text
    })


    const itemDisplayName: inputComponent = new inputComponent( {
        name: 'display_name',
        placeholder: 'Jo',
        status: StatusFormControl.success,
        label: 'Nick',
        error: '',
        type: TypeFormControl.text
    })

    const itemLogin: inputComponent = new inputComponent( {
        name: 'login',
        placeholder: 'Joker',
        status: StatusFormControl.success,
        label: 'Login',
        error: '',
        type: TypeFormControl.text
    })

    const itemEmail: inputComponent = new inputComponent( {
        name: 'email',
        placeholder: 'box@domain.com',
        status: StatusFormControl.success,
        label: 'Email',
        error: '',
        type: TypeFormControl.email
    })


    const itemPhone: inputComponent = new inputComponent( {
        name: 'phone',
        placeholder: '+7 (999) 999-99-99',
        status: StatusFormControl.success,
        label: 'Phone',
        error: '',
        type: TypeFormControl.text
    })

    const itemPassword: inputComponent = new inputComponent( {
        name: 'password',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'Password',
        error: '',
        type: TypeFormControl.password
    })

    const itemPassword2: inputComponent = new inputComponent( {
        name: 'password2',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'Repeat Password',
        error: '',
        type: TypeFormControl.password
    })

    const btnSignUp: buttonComponent = new buttonComponent({
        name: 'Sign Up',
        id: 'btn-sign-up',
        type: 'submit',
        onclick: ''
    })

    const page:pageSignup = new pageSignup({
        itemFirstName,
        itemSecondName,
        itemDisplayName,
        itemLogin,
        itemEmail,
        itemPhone,
        itemPassword,
        itemPassword2,
        btnSignUp
    })
    render(page, root)
 
}