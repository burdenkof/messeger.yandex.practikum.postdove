import Block from "../../utils/base-block";
import { pagelistTemplate } from "./template";

class PageList extends Block {
  constructor() {
    super('div', {})
  }
  render() {
    return this.compile(pagelistTemplate, this.props)
  }
}
export function renderPagelist():Block {
 

  const page: PageList = new PageList()
  return page

}


export default renderPagelist
