import { settingsEditTemplate } from "./template";
import { getFormData, pregCheck } from "../../../utils/renderDOM";
import Block from "../../../utils/base-block";
 
import buttonComponent from "../../../components/button/button";
import inputComponent, { StatusFormControl, TypeFormControl } from "../../../components/input/input";
import { PregErrors, PregValidate } from "../../../utils/pregValidates";
import { profileInfo } from "../../../types";
import { store } from "../../../utils/store";
import { controllerUsers } from "../../../controllers/users";
import { paths, router } from "../../../utils/routes";

class PageSettingsEdit extends Block {
    constructor(props: any) {
        super('div', props)
    }
    render() {
        return this.compile(settingsEditTemplate, this.props)
    }
}


export function renderSettingsEdit():Block {


    const validate = async (e: Event) => {
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

        if (e.target instanceof HTMLFormElement && errors == 0) {
            console.log(data)
            const state = store.getState()

            let currentUser: profileInfo = state.profileInfo
            Object.assign(currentUser, data)
            console.log(currentUser)
            await controllerUsers.saveUserInfo(currentUser)
            router.go(paths.settings)
        }

    }
    const state = store.getState()

    const currentUser: profileInfo = state.profileInfo

    // Имена полей для изменения информации о пользователе: first_name, second_name, display_name, login, email, phone;
    const itemFirstName: inputComponent = new inputComponent({
        value: currentUser.first_name,
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
        value: currentUser.second_name,
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
        value: currentUser.display_name,
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
        value: currentUser.login,
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
        value: currentUser.email,
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
        value: currentUser.phone,
        name: 'phone',
        placeholder: '+7 (927) 999-99-99',
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

    const btnBack: buttonComponent = new buttonComponent({
        name: '<i class="fa-solid fa-angles-left"></i>',
        id: 'btn-back',
        type: 'button',
        className:'btn-back',
        onclick: `window.location.href='${paths.settings}'`
    })

    const btnSave: buttonComponent = new buttonComponent({
        name: 'Save',
        id: 'btn-save',
        type: 'submit',
        onclick: ''
    })


    const page: PageSettingsEdit = new PageSettingsEdit({
        itemFirstName,
        itemSecondName,
        itemDisplayName,
        itemLogin,
        itemEmail,
        itemPhone,
        currentUser,
        btnBack,
        btnSave,
        events: {
            submit: (e: SubmitEvent) => {
                validate(e)
            }
        }
    })
    return page
}
