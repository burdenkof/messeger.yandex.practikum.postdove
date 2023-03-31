import { settingsEditTemplate } from "./template";
import { Nullable, render } from "../../../utils/renderDOM";
import Block from "../../base-block";
import { profileInfo } from "../settings";
import buttonComponent from "../../../components/button/button";
import inputComponent, { StatusFormControl, TypeFormControl } from "../../../components/input/input";

class pageSettingsEdit extends Block {
    constructor(props: any) {
        super('div', props)
    }
    render() {
        return this.compile(settingsEditTemplate, this.props)
    }
}


export function renderSettingsEdit(root: Nullable<HTMLDivElement>) {



    const currentUser: profileInfo = {
        firstName: 'Whill',
        secondName: 'Smith',
        phone: '+7 (927) 999-99-99',
        email: 'budenkof@yandex.ru',
        displayName: 'Charmng',
        login: 'burdenkof',
        password: 'dtdtmyytt45m'
    }

    // Имена полей для изменения информации о пользователе: first_name, second_name, display_name, login, email, phone;
    const itemFirstName: inputComponent = new inputComponent({
        name: 'first_name',
        placeholder: 'Jonh',
        status: StatusFormControl.success,
        label: 'First name',
        error: '',
        type: TypeFormControl.text
    })


    const itemSecondName: inputComponent = new inputComponent({
        name: 'second_name',
        placeholder: 'Smith',
        status: StatusFormControl.success,
        label: 'Second name',
        error: '',
        type: TypeFormControl.text
    })


    const itemDisplayName: inputComponent = new inputComponent({
        name: 'display_name',
        placeholder: 'Jo',
        status: StatusFormControl.success,
        label: 'Nick',
        error: '',
        type: TypeFormControl.text
    })

    const itemLogin: inputComponent = new inputComponent({
        name: 'login',
        placeholder: 'Joker',
        status: StatusFormControl.success,
        label: 'Login',
        error: '',
        type: TypeFormControl.text
    })

    const itemEmail: inputComponent = new inputComponent({
        name: 'email',
        placeholder: 'box@domain.com',
        status: StatusFormControl.success,
        label: 'Email',
        error: '',
        type: TypeFormControl.email
    })


    const itemPhone: inputComponent = new inputComponent({
        name: 'phone',
        placeholder: '+7 (927) 999-99-99',
        status: StatusFormControl.success,
        label: 'Phone',
        error: '',
        type: TypeFormControl.text
    })



    const btnSave: buttonComponent = new buttonComponent({
        name: 'Save',
        id: 'btn-save',
        type: 'submit',
        onclick: ''
    })


    const page: pageSettingsEdit = new pageSettingsEdit({
        itemFirstName,
        itemSecondName,
        itemDisplayName,
        itemLogin,
        itemEmail,
        itemPhone,
        currentUser,

        btnSave
    })
    render(page, root)
}
