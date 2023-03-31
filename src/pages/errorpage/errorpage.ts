import { Nullable, render } from "../../utils/renderDOM";
import Block from "../base-block";
import { errorTemplate } from "./template";
type errorPageInfo = {
    code: number,
    message: string,
    title: string
}

class pageError extends Block {
    constructor(props: errorPageInfo) {
        super('div', props)
    }
    render() {
        return this.compile(errorTemplate, this.props)
    }
}

export function renderErrorPage(root: Nullable<HTMLDivElement>, code = 404, title = 'Page not found', message = 'We are sorry, but there is no such page') {

    const page: pageError = new pageError({
        code: code,
        message: message,
        title: title
    })
    render(page, root)

}