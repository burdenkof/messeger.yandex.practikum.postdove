import { changePasswordTemplate } from "./template";
import { getFormData,  pregCheck } from "../../../utils/renderDOM";
import Block from "../../../utils/base-block";
import buttonComponent from "../../../components/button/button";
import inputComponent, { StatusFormControl, TypeFormControl } from "../../../components/input/input";
import { PregErrors, PregValidate } from "../../../utils/pregValidates";
import { profileInfo } from "../../../types";
import { controllerUsers } from "../../../controllers/users";
import { controllerAuth } from "../../../controllers/auth";
import { paths, router } from "../../../utils/routes";

class pageChangePassword extends Block {
    constructor(props: any) {
        super('div', props)
    }
    render() {
        return this.compile(changePasswordTemplate, this.props)
    }
}


export function renderChangePassword():Block {

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

    

        if (data.new_password && !pregCheck(PregValidate.password, data.new_password)) {
            errors++
            itemNewPassword.setProps({
                status: StatusFormControl.error,
                error: PregErrors.password,
                value: data.new_password
            })
        } else {
            itemNewPassword.setProps({
                status: StatusFormControl.success,
                error: '',
                value: data.new_password
            })
        }


        if (  data.new_password2 != data.new_password) {
            errors++
            itemNewPassword2.setProps({
                status: StatusFormControl.error,
                error: 'Пароли должны совпадать',
                value: data.new_password2
            })
        } else {
            itemNewPassword2.setProps({
                status: StatusFormControl.success,
                error: '',
                value: data.new_password2
            })
        }

        if (e.target instanceof HTMLFormElement && errors == 0) {
            try{
                await controllerUsers.changePassword({oldPassword: data.current_password, newPassword: data.new_password})
                router.go(paths.settings)
            }catch(e){
                itemCurrentPassword.setProps({
                    status: StatusFormControl.error,
                    error: e.reason
                })
                
            }

        }

    }

    const currentUser: profileInfo = {
        id:0,
        avatar:'',
        first_name: 'Whill',
        second_name: 'Smith',
        phone: '+7 (927) 999-99-99',
        email: 'budenkof@yandex.ru',
        display_name: 'Charmng',
        login: 'burdenkof',
        password: 'dtdtmyytt45m'
    }

    const itemCurrentPassword: inputComponent = new inputComponent({
        name: 'current_password',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'Current password',
        pattern:PregValidate.password,
        error: '',
        type: TypeFormControl.password
    })


    const itemNewPassword: inputComponent = new inputComponent({
        name: 'new_password',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'New password',
        error: '',
        type: TypeFormControl.password,
        pattern:PregValidate.password,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })

    const itemNewPassword2: inputComponent = new inputComponent({
        name: 'new_password2',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'Repeat password',
        error: '',
        type: TypeFormControl.password,
        pattern:PregValidate.password,
        events: {
            blur: (e: Event) => {
                validate(e)
            }
        }
    })


    const btnSave: buttonComponent = new buttonComponent({
        name: 'Save',
        id: 'btn-save',
        type: 'submit',
        onclick: ''
    })


    const page: pageChangePassword = new pageChangePassword({
        itemCurrentPassword,
        itemNewPassword,
        itemNewPassword2,
        currentUser,
        btnSave,
        events: {
            submit: (e: SubmitEvent) => {
                validate(e)
            }
        }
    })
    return page
}
