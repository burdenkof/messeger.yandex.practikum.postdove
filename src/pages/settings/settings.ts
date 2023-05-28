import { settingsTemplate } from "./template";
import buttonComponent from "../../components/button/button";
import Block from "../../utils/base-block";
import { profileInfo } from "../../types";
import { store } from "../../utils/store";
 
 
class pageSettings extends Block {
    constructor(props: any) {
        super('div', props)
    }
    render() {
        return this.compile(settingsTemplate, this.props)
    }
}

export function renderSettings():Block {


    const state = store.getState()

    const currentUser: profileInfo =  state.profileInfo


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
