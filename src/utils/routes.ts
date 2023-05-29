import Block from "./base-block"
import { Nullable, render } from "./renderDOM"

export enum paths {
    login = '/',
    logout = '/logout',
    signup = '/sign-up',
    settings = '/profile',
    settingsEdit = '/settings',
    changePassword = '/change-password',
    chatlist = '/messenger',
    error404 = '/error404',
    error500 = '/error500',
}
function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs
}
class Route {
    private block: Block | null = null

    constructor(
        private pathname: string,
        private BlockCreater: () => Block) {
    }

    leave() {
        this.block?.hide()
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname)
    }

    render() {

        if (!this.block) {
            const root: Nullable<HTMLDivElement> = document.getElementById('root') as HTMLDivElement
            this.block = this.BlockCreater()

            render(this.block, root)
        } else {
            this.block?.show()
        }
    }
}

class Router {
    private static __instance: Router
    private routes: Route[] = []
    private currentRoute: Route | null = null
    private history = window.history

    constructor() {
        if (Router.__instance) {
            return Router.__instance
        }

        this.routes = []

        Router.__instance = this
    }

    public use(pathname: string, BlockCreater: () => Block) {
        const route = new Route(pathname, BlockCreater)
        this.routes.push(route)

        return this
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window

            this._onRoute(target.location.pathname)
        }

        this._onRoute(window.location.pathname)
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname)

        if (!route) {
            return
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave()
        }

        this.currentRoute = route

        route.render()
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname)

        this._onRoute(pathname)
    }

    public back() {
        this.history.back()
    }

    public forward() {
        this.history.forward()
    }

    private getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname))
    }
}

export const router = new Router()
