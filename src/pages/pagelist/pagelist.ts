import Block from "../../utils/base-block";
import { pagelistTemplate } from "./template";

class pageList extends Block {
  constructor() {
    super('div', {})
  }
  render() {
    return this.compile(pagelistTemplate, this.props)
  }
}
export function renderPagelist():Block {
 

  const page: pageList = new pageList()
  return page

}


export default renderPagelist