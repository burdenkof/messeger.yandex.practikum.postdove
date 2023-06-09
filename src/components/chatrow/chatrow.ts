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
        if(props.last_message){
            let time = new Date(props.last_message.time)
            props.last_message.time = time.toLocaleString()
        }


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
                            alert(searchInfo[0].login + ' добавлен в чат')
                        } else {
                            alert("Данный логин не найден")
                        }
                    }
                }
            }
        })        
        const btnDeleteUserFromChat: buttonComponent = new buttonComponent({
            name: '<i class="fa-solid fa-user-slash"></i>',
            id: 'btn-delete-user-from-chat' + props.id,
            type: 'button',
            events: {
                click: async (e: Event) => {
                    e.stopPropagation()
                    const login: string | null = prompt("Укажите логин  пользователя для удаления из чат")
                    if (login) {
                        const searchInfo: profileInfo[] = await controllerUsers.search(login)
                        console.log(searchInfo)
                        if (searchInfo) {
                            controllerChatlist.deleteUserFromChat(searchInfo[0].id, props.id)
                            alert(searchInfo[0].login + ' удален из чата')
                        } else {
                            alert("Данный логин не найден")
                        }
                    }
                }
            }
        })
        super("div", {
            ...props, btnDeleteChat, btnAddUserToChat,btnDeleteUserFromChat,
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

        if(nextProps.last_message){
            let time = new Date(nextProps.last_message.time)
            nextProps.last_message.time = time.toLocaleString()
        }
        Object.assign(this.props, nextProps)
    }
}
export default chatRowComponent
