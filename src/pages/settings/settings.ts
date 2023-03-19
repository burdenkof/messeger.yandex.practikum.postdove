import { changePasswordTemplate, settingsTemplate } from "./template";
import { settingsEditTemplate } from "./template";
import { buttonTemplate } from "../../components/button/template";
import { getinput, inputState, StatusFormControl, TypeFormControl } from "../../components/input/input";

export type profileInfo = {
    firstName: String,
    secondName: String,
    phone: String,
    email: String,
    displayName: String,
    login: String,
    password: String
}

export function getSettings(type: String = 'settings') {

    let setTemplate: String = settingsTemplate
    const Handlebars = require("handlebars")
    if (type == 'settings-edit') {
        setTemplate = settingsEditTemplate
    }
    if (type == 'change-password') {
        setTemplate = changePasswordTemplate
    }
    const template = Handlebars.compile(setTemplate)

    const currentUser: profileInfo = {
        firstName: 'Whill',
        secondName: 'Smith',
        phone: '+7 (927) 999-99-99',
        email: 'budenkof@yandex.ru',
        displayName: 'Charmng',
        login: 'burdenkof',
        password: 'dtdtmyytt45m'
    }
    let inputs: inputState[] = [];

    if (type == 'change-password') {
        const itemCurrentPassword: inputState = {
            name: 'current_password',
            placeholder: '',
            status: StatusFormControl.success,
            label: 'Current password',
            error: '',
            type: TypeFormControl.password
        }
        itemCurrentPassword.html = getinput(itemCurrentPassword)
        
        inputs.push(itemCurrentPassword)

        const itemNewPassword: inputState = {
            name: 'new_password',
            placeholder: '',
            status: StatusFormControl.success,
            label: 'New password',
            error: '',
            type: TypeFormControl.password
        }
        itemNewPassword.html = getinput(itemNewPassword)

        inputs.push(itemNewPassword)

        const itemNewPassword2: inputState = {
            name: 'new_password2',
            placeholder: '',
            status: StatusFormControl.error,
            label: 'Repeat password',
            error: 'Passwords must be equal',
            type: TypeFormControl.password
        }
        itemNewPassword2.html = getinput(itemNewPassword2)
        inputs.push(itemNewPassword2)
    } else {
        // Имена полей для изменения информации о пользователе: first_name, second_name, display_name, login, email, phone;
        const itemFirstName: inputState = {
            name: 'first_name',
            placeholder: 'Jonh',
            status: StatusFormControl.success,
            label: 'First name',
            error: '',
            type: TypeFormControl.text
        }
        itemFirstName.html = getinput(itemFirstName)


        const itemSecondName: inputState = {
            name: 'second_name',
            placeholder: 'Smith',
            status: StatusFormControl.success,
            label: 'Second name',
            error: '',
            type: TypeFormControl.text
        }
        itemSecondName.html = getinput(itemSecondName)


        const itemDisplayName: inputState = {
            name: 'display_name',
            placeholder: 'Jo',
            status: StatusFormControl.success,
            label: 'Nick',
            error: '',
            type: TypeFormControl.text
        }
        itemDisplayName.html = getinput(itemDisplayName)

        const itemLogin: inputState = {
            name: 'login',
            placeholder: 'Joker',
            status: StatusFormControl.success,
            label: 'Login',
            error: '',
            type: TypeFormControl.text
        }
        itemLogin.html = getinput(itemLogin)

        const itemEmail: inputState = {
            name: 'email',
            placeholder: 'box@domain.com',
            status: StatusFormControl.error,
            label: 'Email',
            error: 'Wrong email',
            type: TypeFormControl.email
        }
        itemEmail.html = getinput(itemEmail)


        const itemPhone: inputState = {
            name: 'phone',
            placeholder: '+7 (927) 999-99-99',
            status: StatusFormControl.success,
            label: 'Phone',
            error: '',
            type: TypeFormControl.text
        }
        itemPhone.html = getinput(itemPhone)

        inputs.push(itemFirstName)
        inputs.push(itemSecondName)
        inputs.push(itemDisplayName)
        inputs.push(itemLogin)
        inputs.push(itemEmail)
        inputs.push(itemPhone)

    }
    const templateBtn = Handlebars.compile(buttonTemplate)

    const btnEdit:String = templateBtn({
        name: 'Edit',
        id: 'btn-edit-settings',
        type: 'submit',
        onclick: `window.location.href='/#settings-edit'`
    })
    const btnChangePassword:String  = templateBtn({
        name: 'Change pass',
        id: 'btn-change-password',
        type: 'button',
        onclick: `window.location.href='/#change-password'`
    })
    const btnSave:String  = templateBtn({
        name: 'Save',
        id: 'btn-save',
        type: 'submit',
        onclick: ''
    })


    return template({
        inputs: inputs,
        currentUser: currentUser,
        btnEdit: btnEdit,
        btnChangePassword: btnChangePassword,
        btnSave: btnSave
    })
}
