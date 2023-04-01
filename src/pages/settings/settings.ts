import { settingsTemplate } from "./template";
import { Nullable, render } from "../../utils/renderDOM";
import buttonComponent from "../../components/button/button";
import Block from "../../utils/base-block";

export type profileInfo = {
    firstName: String,
    secondName: String,
    phone: String,
    email: String,
    displayName: String,
    login: String,
    password: String
}
class pageSettings extends Block {
    constructor(props: any) {
        super('div', props)
    }
    render() {
        return this.compile(settingsTemplate, this.props)
    }
}

export function renderSettings(root: Nullable<HTMLDivElement>) {


    const currentUser: profileInfo = {
        firstName: 'Whill',
        secondName: 'Smith',
        phone: '+7 (927) 999-99-99',
        email: 'budenkof@yandex.ru',
        displayName: 'Charmng',
        login: 'burdenkof',
        password: 'dtdtmyytt45m'
    }


    const btnEdit: buttonComponent = new buttonComponent({
        name: 'Edit',
        id: 'btn-edit-settings',
        type: 'submit',
        onclick: `window.location.href='/#settings-edit'`
    })
    const btnChangePassword: buttonComponent = new buttonComponent({
        name: 'Change pass',
        id: 'btn-change-password',
        type: 'button',
        onclick: `window.location.href='/#change-password'`
    })

    const page: pageSettings = new pageSettings({

        currentUser,
        btnChangePassword,
        btnEdit
    })
    render(page, root)
}
