import { controllerChatlist } from '../../controllers/chatlist';
import  { controllerMessages } from '../../controllers/messages';
import { chatRow } from '../../types';
import Block from '../../utils/base-block'
import { store } from '../../utils/store';
import buttonComponent from '../button/button';
import { chatRowTemplate } from './template'


class chatRowComponent extends Block {
    constructor(props: chatRow) {
        const btnDeleteChat: buttonComponent = new buttonComponent({
            name: 'X',
            id: 'btn-del-chat'+props.id,
            type: 'button',
            events: {
                click: (e:Event) => {
                    e.stopPropagation()
                    const del: boolean = confirm("Удалить чат?")
                    if (del) {
                        controllerChatlist.deleteChat(this.props.id)
                    }
                }
            }
        })
        super("div", {...props, btnDeleteChat, 
            events:{
                click: ()=>{
                    store.set('currentChatId', this.props.id)
                    controllerMessages.sendMessage(this.props.id, 'ololoolo')
                }
            }
        })
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