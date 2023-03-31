
import inputComponent, { inputState, StatusFormControl, TypeFormControl } from "../../components/input/input";
import { Nullable, render } from "../../utils/renderDOM";
import Block from "../base-block";
import { pagelistTemplate } from "./template";

class pageList extends Block {
  constructor(props: any) {
    super('div', props)
  }
  render() {
    return this.compile(pagelistTemplate, this.props)
  }
}
export function renderPagelist(root: Nullable<HTMLDivElement>) {

  const testInput: inputComponent = new inputComponent(
    {
      item: {
        name: 'login',
        placeholder: 'phone or email',
        status: StatusFormControl.success,
        label: 'Username',
        error: '',
        type: TypeFormControl.text
      }
    }
  )
  setTimeout(() =>{
    const old:inputState = testInput.props.item
    old.status = StatusFormControl.error
    old.error = 'olololo ololo oololo'
    testInput.setProps({item: old})
  }, 2000)

  setTimeout(() =>{
    const old:inputState = testInput.props.item
    old.status = StatusFormControl.success
    old.error = ''
    testInput.setProps({item: old})
  }, 4000)

  const page: pageList = new pageList({
    testInput: testInput
  })
  render(page, root)

}


export default renderPagelist