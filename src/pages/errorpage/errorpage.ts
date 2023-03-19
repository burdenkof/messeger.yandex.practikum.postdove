import { errorTemplate } from "./template";
 

export function getErrorPage(code = 404, title = 'Page not found', message = 'We are sorry, but there is no such page') {
    const Handlebars = require("handlebars")
    const template = Handlebars.compile(errorTemplate)
    return template({
        code: code,
        message: message,
        title: title
    })
}