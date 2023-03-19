import Handlebars from "handlebars";
import { changePasswordTemplate, settingsTemplate } from "./template.js";
import { settingsEditTemplate } from "./template.js";
import { buttonTemplate } from "../../components/button/template.js";
import { getinput } from "../../components/input/input.js";

export function getSettings(type = 'settings') {

    let setTemplate = settingsTemplate

    if (type == 'settings-edit') {
        setTemplate = settingsEditTemplate
    }
    if (type == 'change-password') {
        setTemplate = changePasswordTemplate
    }
    const template = Handlebars.compile(setTemplate)

    const currentUser = {
        firstName: 'Whill',
        secondName: 'Smith',
        phone: '+7 (927) 999-99-99',
        email: 'budenkof@yandex.ru',
        displayName: 'Charmng',
        login: 'burdenkof',
        password: 'dtdtmyytt45m'
    }
    let inputs = [];
    if (type == 'change-password') {
        let itemCurrentPassword = {
            name: 'current_password',
            placeholder: '',
            status: 'success',
            label: 'Current password',
            error: '',
            type: 'password'
        }
        itemCurrentPassword.html = getinput(itemCurrentPassword)
        inputs.push(itemCurrentPassword)

        let itemNewPassword = {
            name: 'new_password',
            placeholder: '',
            status: 'success',
            label: 'New password',
            error: '',
            type: 'password'
        }
        itemNewPassword.html = getinput(itemNewPassword)

        inputs.push(itemNewPassword)

        let itemNewPassword2 = {
            name: 'new_password2',
            placeholder: '',
            status: 'error',
            label: 'Repeat password',
            error: 'Passwords must be equal',
            type: 'password'
        }
        itemNewPassword2.html = getinput(itemNewPassword2)
        inputs.push(itemNewPassword2)
    } else {
        // Имена полей для изменения информации о пользователе: first_name, second_name, display_name, login, email, phone;
        let itemFirstName = {
            name: 'first_name',
            placeholder: 'Jonh',
            status: 'success',
            label: 'First name',
            error: '',
            type: 'text'
        }
        itemFirstName.html = getinput(itemFirstName)


        let itemSecondName = {
            name: 'second_name',
            placeholder: 'Smith',
            status: 'success',
            label: 'Second name',
            error: '',
            type: 'text'
        }
        itemSecondName.html = getinput(itemSecondName)


        let itemDisplayName = {
            name: 'display_name',
            placeholder: 'Jo',
            status: 'success',
            label: 'Nick',
            error: '',
            type: 'text'
        }
        itemDisplayName.html = getinput(itemDisplayName)

        let itemLogin = {
            name: 'login',
            placeholder: 'Joker',
            status: 'success',
            label: 'Login',
            error: '',
            type: 'text'
        }
        itemLogin.html = getinput(itemLogin)

        let itemEmail = {
            name: 'email',
            placeholder: 'box@domain.com',
            status: 'error',
            label: 'Email',
            error: 'Wrong email',
            type: 'email'
        }
        itemEmail.html = getinput(itemEmail)


        let itemPhone = {
            name: 'phone',
            placeholder: '+7 (927) 999-99-99',
            status: 'success',
            label: 'Phone',
            error: '',
            type: 'text'
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

    let btnEdit = templateBtn({
        name: 'Edit',
        id: 'btn-edit-settings',
        type: 'submit',
        onclick: `window.location.href='/#settings-edit'`
    })
    let btnChangePassword = templateBtn({
        name: 'Change pass',
        id: 'btn-change-password',
        type: 'button',
        onclick: `window.location.href='/#change-password'`
    })
    let btnSave = templateBtn({
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
