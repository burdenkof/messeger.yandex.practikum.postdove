
import { pagelistTemplate } from "./template";

export function pagelist() {
  const Handlebars = require("handlebars")
  const template = Handlebars.compile(pagelistTemplate)
  return template({})
}
