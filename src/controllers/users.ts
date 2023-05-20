import { ApiUsers } from "../api/users";


class ControllerUsers {
    private model: ApiUsers = new ApiUsers()

    async search(login: string){
        return await this.model.search(login)
    }    
    
    async getUserInfo(userId: number){
        return await this.model.getUserInfo(userId)
    }

}
export const controllerUsers: ControllerUsers = new ControllerUsers()