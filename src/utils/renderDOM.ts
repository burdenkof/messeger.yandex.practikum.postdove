import { Exception } from 'handlebars';
import Block from './base-block'
export type Nullable<T> = T | null;
export function getFormData(form: HTMLFormElement): Object{
    const formData = [...new FormData(form)]
    const entries = new Map(formData );
    return Object.fromEntries(entries);
   
}
export function pregCheck (pattern: string, value: string): boolean  {

    const regular = new RegExp(pattern)
    return regular.test(value)
}
export function render(block: Block, root: Nullable<HTMLDivElement>) {
     

    if (root !== null) {
        root.textContent = ''
        root.appendChild(block.getContent());

        block.dispatchComponentDidMount();
    } else{
        throw(new Exception('root elemtnt not found'))
    }
    return root;
}