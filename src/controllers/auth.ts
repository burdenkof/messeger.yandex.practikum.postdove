import { ApiAuth } from "../api/auth";
import { profileInfo } from "../types";
import {  store } from "../utils/store";
import { paths, router } from "../utils/routes";
import { controllerChatlist } from "./chatlist";



class ControllerAuth {
    private model: ApiAuth = new ApiAuth();

    public async getProfile(){
        const profile: profileInfo = await this.model.read()
        store.set('profileInfo', profile)
    }

    public async singup(data: {
        first_name: string;
        second_name: string;
        login: string;
        email: string;
        password: string;
        phone: string;
    }){

        try{
            await this.model.signup(data)
            await this.getProfile()
        }catch(E: any){
            console.log(E.message)
        }
    }
    public async singin(data: {login: string; password: string;
    }){
            await this.model.signin(data)
            await controllerAuth.getProfile()
            await controllerChatlist.getChats()
            router.go(paths.chatlist)
        
    }

    public async logout(){

        try{
            await this.model.logout()
            store.clear()
            window.location.href = paths.login
        }catch(E: any){
            console.log(E.message)
        }
    }

}
export const controllerAuth: ControllerAuth = new ControllerAuth()
