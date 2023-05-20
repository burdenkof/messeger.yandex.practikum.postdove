import { ApiUsers } from "../api/users";


class ControllerUsers {
    private model: ApiUsers = new ApiUsers()

    async search(login: string){
        return await this.model.search(login)
    }

}
export const controllerUsers: ControllerUsers = new ControllerUsers()