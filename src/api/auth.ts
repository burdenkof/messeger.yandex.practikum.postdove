import * as sanitizeHtml from 'sanitize-html';
import { profileInfo } from "../types";
import { ApiBase } from "./base";
 
export class ApiAuth extends ApiBase {
    constructor() {
        super('/auth');
    }

    signin(data: {login: string, password: string}) {
        data.login = sanitizeHtml(data.login)
        data.password = sanitizeHtml(data.password)
        return this.http.post('/signin', {data});
    }

    signup(data: {
        first_name: string;
        second_name: string;
        login: string;
        email: string;
        password: string;
        phone: string;
    }) {

        data.first_name = sanitizeHtml(data.first_name)
        data.second_name = sanitizeHtml(data.second_name)
        data.login = sanitizeHtml(data.login)
        data.email = sanitizeHtml(data.email)
        data.password = sanitizeHtml(data.password)
        data.phone = sanitizeHtml(data.phone)

        return this.http.post('/signup', {data});
    }

    read(): Promise<profileInfo> {
        return this.http.get('/user');
    }

    logout() {
        return this.http.post('/logout');
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}
