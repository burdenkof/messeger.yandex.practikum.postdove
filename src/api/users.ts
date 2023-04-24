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
        return this.http.put('/profile', { data });
    }

    setPassword(data: {
        oldPassword: string;
        newPassword: string;
    }) {
        return this.http.put('/password', { data });
    }

    setAvatar(data: FormData) {
        return this.http.put('/profile/avatar', { data });
    }

    search(login: string): Promise<profileInfo[]> {
        return this.http.post('/search', { data: { login } });
    }

    create = undefined;
    delete = undefined;
    read = undefined;

}