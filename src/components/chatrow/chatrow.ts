import { controllerChatlist } from '../../controllers/chatlist';
import { chatRow } from '../../types';
import Block from '../../utils/base-block'
import buttonComponent from '../button/button';
import { chatRowTemplate } from './template'


class chatRowComponent extends Block {
    constructor(props: chatRow) {
        const btnDeleteChat: buttonComponent = new buttonComponent({
            name: 'X',
            id: 'btn-del-chat'+props.id,
            type: 'button',
            events: {
                click: () => {
                    
                    const del: boolean = confirm("Удалить чат?")
                    if (del) {
                        controllerChatlist.deleteChat(props.id)
                    }
                }
            }
        })
        super("div", {...props, btnDeleteChat});
    }

    render() {
        return this.compile(chatRowTemplate, this.props);
    }
    setProps (nextProps: chatRow) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }
}
export default chatRowComponent