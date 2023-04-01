import buttonComponent from "../../components/button/button";
import inputComponent, { StatusFormControl, TypeFormControl } from "../../components/input/input";
import { getFormData, Nullable, pregCheck, render } from "../../utils/renderDOM";
import Block from "../../utils/base-block";
import { signupTemplate } from "./template";
import { PregErrors, PregValidate } from "../../utils/pregValidates";


class pageSignup extends Block {
    constructor(props: any) {
        super('div', props)
    }
    render() {
        return this.compile(signupTemplate, this.props)
    }
}
export function renderSignup(root: Nullable<HTMLDivElement>) {
    
    const validate = (e: Event) => {
        if (e.target === null) return
       
        let data: any
        if (e.target instanceof HTMLFormElement) {
            e.preventDefault()
            data = getFormData(e.target)
        } else {
            const target = e.target as HTMLElement
            const form: HTMLFormElement | null = target.closest('form')
            if (form === null) return
            data = getFormData(form)
        }
        let errors = 0

        if (data.first_name && !pregCheck(PregValidate.names, data.first_name)) {
            errors++
            itemFirstName.setProps({
                status: StatusFormControl.error,
                error: PregErrors.names,
                value: data.first_name
            })
        } else {
            itemFirstName.setProps({
                status: StatusFormControl.success,
                error: '',
                value: data.first_name
            })
        }

        if (data.second_name && !pregCheck(PregValidate.names, data.second_name)) {
            errors++
            itemSecondName.setProps({
                status: StatusFormControl.error,
                error: PregErrors.names,
                value: data.second_name
            })
        } else {
            itemSecondName.setProps({
                status: StatusFormControl.success,
                error: '',
                value: data.second_name
            })
        }


        if (data.display_name && !pregCheck(PregValidate.names, data.display_name)) {
            errors++
            itemDisplayName.setProps({
                status: StatusFormControl.error,
                error: PregErrors.names,
                value: data.display_name
            })
        } else {
            itemDisplayName.setProps({
                status: StatusFormControl.success,
                error: '',
                value: data.display_name
            })
        }


        if (data.login && !pregCheck(PregValidate.login, data.login)) {
            errors++
            itemLogin.setProps({
                status: StatusFormControl.error,
                error: PregErrors.login,
                value: data.login
            })
        } else {
            itemLogin.setProps({
                status: StatusFormControl.success,
                error: '',
                value: data.login
            })
        }


        if (data.password && !pregCheck(PregValidate.password, data.password)) {
            errors++
            itemPassword.setProps({
                status: StatusFormControl.error,
                error: PregErrors.password,
                value: data.password
            })
        } else {
            itemPassword.setProps({
                status: StatusFormControl.success,
                error: '',
                value: data.password
            })
        }


        if (  data.password2 != data.password) {
            errors++
            itemPassword2.setProps({
                status: StatusFormControl.error,
                error: 'Пароли должны совпадать',
                value: data.password2
            })
        } else {
            itemPassword2.setProps({
                status: StatusFormControl.success,
                error: '',
                value: data.password2
            })
        }

        if (e.target instanceof HTMLFormElement && errors == 0) {
            console.log(data)
        }

    }

    const itemFirstName: inputComponent = new inputComponent({
        name: 'first_name',
        placeholder: 'Jonh',
        status: StatusFormControl.success,
        label: 'First name',
        error: '',
        type: TypeFormControl.text,
        pattern: PregValidate.names,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })

    const itemSecondName: inputComponent = new inputComponent({
        name: 'second_name',
        placeholder: 'Smith',
        status: StatusFormControl.success,
        label: 'Second name',
        error: '',
        type: TypeFormControl.text,
        pattern: PregValidate.names,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })


    const itemDisplayName: inputComponent = new inputComponent({
        name: 'display_name',
        placeholder: 'Jo',
        status: StatusFormControl.success,
        label: 'Nick',
        error: '',
        type: TypeFormControl.text,
        pattern: PregValidate.names,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })

    const itemLogin: inputComponent = new inputComponent({
        name: 'login',
        placeholder: 'Joker',
        status: StatusFormControl.success,
        label: 'Login',
        error: '',
        type: TypeFormControl.text,
        pattern: PregValidate.login,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })

    const itemEmail: inputComponent = new inputComponent({
        name: 'email',
        placeholder: 'box@domain.com',
        status: StatusFormControl.success,
        label: 'Email',
        error: '',
        type: TypeFormControl.email,
        pattern: PregValidate.email,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })


    const itemPhone: inputComponent = new inputComponent({
        name: 'phone',
        placeholder: '+7 (999) 999-99-99',
        status: StatusFormControl.success,
        label: 'Phone',
        error: '',
        type: TypeFormControl.text,
        pattern: PregValidate.phone,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })

    const itemPassword: inputComponent = new inputComponent({
        name: 'password',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'Password',
        error: '',
        type: TypeFormControl.password,
        pattern: PregValidate.password,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })

    const itemPassword2: inputComponent = new inputComponent({
        name: 'password2',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'Repeat Password',
        error: '',
        type: TypeFormControl.password,
        pattern: PregValidate.password,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })

    const btnSignUp: buttonComponent = new buttonComponent({
        name: 'Sign Up',
        id: 'btn-sign-up',
        type: 'submit',
        onclick: ''
    })

    const page: pageSignup = new pageSignup({
        itemFirstName,
        itemSecondName,
        itemDisplayName,
        itemLogin,
        itemEmail,
        itemPhone,
        itemPassword,
        itemPassword2,
        btnSignUp,
        events: {
            submit: (e: SubmitEvent) => {
                validate(e)
            }
        }
    })
    render(page, root)

}