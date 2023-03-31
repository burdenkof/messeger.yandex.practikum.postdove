import Block from '../pages/base-block'
export type Nullable<T> = T | null;

export function render(block: Block, root: Nullable<HTMLDivElement>) {
     

    if (root !== null) {
        root.appendChild(block.getContent());

        block.dispatchComponentDidMount();
    }
    return root;
}