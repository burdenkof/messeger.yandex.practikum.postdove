import Handlebars from "handlebars";
import { pagelistTemplate } from "./template.js";

export function pagelist() {
    
  const template = Handlebars.compile(pagelistTemplate)
  return template({})
}
