import { Nullable, render } from "../../utils/renderDOM";
import Block from "../base-block";
import { pagelistTemplate } from "./template";

class pageList extends Block {
  constructor() {
    super('div', {})
  }
  render() {
    return this.compile(pagelistTemplate, this.props)
  }
}
export function renderPagelist(root: Nullable<HTMLDivElement>) {
 

  const page: pageList = new pageList()
  render(page, root)

}


export default renderPagelist