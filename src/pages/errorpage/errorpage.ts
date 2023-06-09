import Block from "../../utils/base-block";
import { errorTemplate } from "./template";
type errorPageInfo = {
    code: number,
    message: string,
    title: string
}

class PageError extends Block {
    constructor(props: errorPageInfo) {
        super('div', props)
    }
    render() {
        return this.compile(errorTemplate, this.props)
    }
}

export function renderErrorPage(code = 404, title = 'Page not found', message = 'We are sorry, but there is no such page'): Block {

    const page: PageError = new PageError({
        code: code,
        message: message,
        title: title
    })
    return page

}
