import Handlebars from "handlebars";
import { errorTemplate } from "./template.js";
 

export function getErrorPage(code = 404, title = 'Page not found', message = 'We are sorry, but there is no such page') {

    const template = Handlebars.compile(errorTemplate)
    return template({
        code: code,
        message: message,
        title: title
    })
}