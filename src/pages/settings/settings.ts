import { settingsTemplate } from "./template";
import buttonComponent from "../../components/button/button";
import Block from "../../utils/base-block";
import { profileInfo } from "../../types";


 
class pageSettings extends Block {
    constructor(props: any) {
        super('div', props)
    }
    render() {
        return this.compile(settingsTemplate, this.props)
    }
}

export function renderSettings():Block {


    const currentUser: profileInfo = {
        first_name: 'Whill',
        second_name: 'Smith',
        phone: '+7 (927) 999-99-99',
        email: 'budenkof@yandex.ru',
        display_name: 'Charmng',
        login: 'burdenkof',
        password: 'dtdtmyytt45m'
    }


    const btnEdit: buttonComponent = new buttonComponent({
        name: 'Edit',
        id: 'btn-edit-settings',
        type: 'submit',
        onclick: `window.location.href='/settings-edit'`
    })
    const btnChangePassword: buttonComponent = new buttonComponent({
        name: 'Change pass',
        id: 'btn-change-password',
        type: 'button',
        onclick: `window.location.href='/change-password'`
    })

    const page: pageSettings = new pageSettings({

        currentUser,
        btnChangePassword,
        btnEdit
    })
    return page
}
