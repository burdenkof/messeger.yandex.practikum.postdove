import { controllerChatlist } from '../../controllers/chatlist';
import { controllerMessages } from '../../controllers/messages';
import { controllerUsers } from '../../controllers/users';
import { chatRow, profileInfo } from '../../types';
import Block from '../../utils/base-block'
import { bus } from '../../utils/event-bus';
import { store } from '../../utils/store';
import buttonComponent from '../button/button';
import { chatRowTemplate } from './template'


class chatRowComponent extends Block {
    constructor(props: chatRow) {



        const btnDeleteChat: buttonComponent = new buttonComponent({
            name: 'X',
            id: 'btn-del-chat' + props.id,
            type: 'button',
            events: {
                click: (e: Event) => {
                    e.stopPropagation()
                    const del: boolean = confirm("Удалить чат?")
                    if (del) {
                        controllerChatlist.deleteChat(this.props.id)
                    }
                }
            }
        })
        const btnAddUserToChat: buttonComponent = new buttonComponent({
            name: '+',
            id: 'btn-add-user-to-chat' + props.id,
            type: 'button',
            events: {
                click: async (e: Event) => {
                    e.stopPropagation()
                    const login: string | null = prompt("Укажите логин  пользователя для добавления в чат")
                    if (login) {
                        const searchInfo: profileInfo[] = await controllerUsers.search(login)
                        console.log(searchInfo)
                        if (searchInfo) {
                            controllerChatlist.addUserToChat(searchInfo[0].id, props.id)
                        } else {
                            alert("Данный логин не найден")
                        }
                    }
                }
            }
        })
        super("div", {
            ...props, btnDeleteChat, btnAddUserToChat,
            events: {
                click: (e: PointerEvent) => {
                    store.set('currentChatId', this.props.id)
                    store.set(`messages.${this.props.id}`, [])
                    controllerMessages.getAllMessages(this.props.id)
                    const target:HTMLInputElement|null = (e.target as HTMLInputElement)
                
                    if(target != null && (target.className == 'chat-list_one-row_avatar' || target.className ==   'chat-list_one-row_avatar_img')){
                        const input = document.createElement('input');
                        input.type = 'file';


                       bus.emit('chatAvatarClicked', {chatId:this.props.id, input: input})
                    }
                }
            }
        })
    }

    render() {
        return this.compile(chatRowTemplate, this.props);
    }
    setProps(nextProps: chatRow) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }
}
export default chatRowComponent
