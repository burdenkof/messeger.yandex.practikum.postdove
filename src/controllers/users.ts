import { ApiUsers } from "../api/users";
import { profileInfo } from "../types";


class ControllerUsers {
    private model: ApiUsers = new ApiUsers()

    async search(login: string){
        return await this.model.search(login)
    }    
    
    async getUserInfo(userId: number){
        return await this.model.getUserInfo(userId)
    }    
    
    async saveUserInfo(data: profileInfo){
        return await this.model.update(data)
    }

}
export const controllerUsers: ControllerUsers = new ControllerUsers()