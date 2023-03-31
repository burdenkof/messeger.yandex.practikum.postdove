import { changePasswordTemplate } from "./template";
import { Nullable, render } from "../../../utils/renderDOM";
import Block from "../../base-block";
import { profileInfo } from "../settings";
import buttonComponent from "../../../components/button/button";
import inputComponent, { StatusFormControl, TypeFormControl } from "../../../components/input/input";

class pageChangePassword extends Block {
    constructor(props: any) {
        super('div', props)
    }
    render() {
        return this.compile(changePasswordTemplate, this.props)
    }
}


export function renderChangePassword(root: Nullable<HTMLDivElement>) {



    const currentUser: profileInfo = {
        firstName: 'Whill',
        secondName: 'Smith',
        phone: '+7 (927) 999-99-99',
        email: 'budenkof@yandex.ru',
        displayName: 'Charmng',
        login: 'burdenkof',
        password: 'dtdtmyytt45m'
    }

    const itemCurrentPassword: inputComponent = new inputComponent({
        name: 'current_password',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'Current password',
        error: '',
        type: TypeFormControl.password
    })


    const itemNewPassword: inputComponent = new inputComponent({
        name: 'new_password',
        placeholder: '',
        status: StatusFormControl.success,
        label: 'New password',
        error: '',
        type: TypeFormControl.password
    })

    const itemNewPassword2: inputComponent = new inputComponent({
        name: 'new_password2',
        placeholder: '',
        status: StatusFormControl.error,
        label: 'Repeat password',
        error: 'Passwords must be equal',
        type: TypeFormControl.password
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
        btnSave
    })
    render(page, root)
}
