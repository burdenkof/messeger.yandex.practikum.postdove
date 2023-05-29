import * as sanitizeHtml from 'sanitize-html';
import { profileInfo } from "../types";
import { ApiBase } from "./base";



export class ApiUsers extends ApiBase {

    constructor() {
        super('/user');
    }
    update(data: {
        first_name: string;
        second_name: string;
        display_name?: string;
        login: string;
        email: string;
        phone: string;
    }) {


        data.first_name = sanitizeHtml(data.first_name)
        data.second_name = sanitizeHtml(data.second_name)
        data.login = sanitizeHtml(data.login)
        data.email = sanitizeHtml(data.email)
        data.phone = sanitizeHtml(data.phone)

        return this.http.put('/profile', { data });
    }

    setPassword(data: {
        oldPassword: string;
        newPassword: string;
    }) {
        data.oldPassword = sanitizeHtml(data.oldPassword)
        data.newPassword = sanitizeHtml(data.newPassword)
        return this.http.put('/password', { data });
    }

    setAvatar(data: FormData) {
        return this.http.put('/profile/avatar', { data });
    }

    search(login: string): Promise<profileInfo[]> {
        login = sanitizeHtml(login)
        return this.http.post('/search', { data: { login } });
    }

    getUserInfo(userId: number): Promise<profileInfo> {
        return this.http.get(`/${userId}`);
    }
    create = undefined;
    delete = undefined;
    read = undefined;

}
