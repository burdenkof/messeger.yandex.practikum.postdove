import { settingsTemplate } from "./template";
import buttonComponent from "../../components/button/button";
import Block from "../../utils/base-block";
import { profileInfo } from "../../types";
import { store } from "../../utils/store";
import { controllerUsers } from "../../controllers/users";
import { controllerAuth } from "../../controllers/auth";
 
 
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
        btnEdit,
        events: {
            click: (e: PointerEvent) => {
 
                const target:HTMLInputElement|null = (e.target as HTMLInputElement)
            
                console.log(target)
                if(target != null && (target.className == 'pages-settings_profile-card_avatar' || target.className ==   'pages-settings_profile-card_avatar_img')){
                    const input = document.createElement('input');
                    input.type = 'file';


                    input.onchange = async e => { 
                        if(e.target === null) return
                        const targetInput:HTMLInputElement|null = (e.target as HTMLInputElement)
                       
                        if(targetInput.files === null) return
                       // getting a hold of the file reference
                       const file = targetInput.files[0]
                       const formData = new FormData()
                       formData.append('avatar', file)
                       await controllerUsers.setAvatar(formData)
                       await controllerAuth.getProfile()
                                  
                    }
                    
                    input.click()
                }
            }
        }
    })
    return page
}
