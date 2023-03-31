
import buttonComponent from "../../components/button/button";
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
      name: 'login',
      placeholder: 'phone or email',
      status: StatusFormControl.success,
      label: 'Username',
      error: '',
      type: TypeFormControl.text
    }
  )
  const testBtn: buttonComponent = new buttonComponent(
    {
      name: 'Sign In',
      id: 'btn-sign-in',
      type: 'submit',
      onclick: ''
    }
  )
  setTimeout(() => {
    testInput.setProps({ status: StatusFormControl.error, error: 'olololo ololo oololo' })
  }, 2000)

  setTimeout(() => {
    testInput.setProps({ status: StatusFormControl.success, error: '' })
  }, 4000)

  const page: pageList = new pageList({
    testInput, testBtn
  })
  render(page, root)

}


export default renderPagelist