import { controllerChatlist } from '../../controllers/chatlist';
import { controllerUsers } from '../../controllers/users';
import { profileInfo } from '../../types';
import Block from '../../utils/base-block'
import buttonComponent from '../button/button';
import { messageRowTemplate } from './template'

export enum messageType { input = 'input', output = 'output' }

export type messageRow = {
    chat_id: number,
    time: string,
    type: string,
    outType: messageType,
    user_id: number,
    content: string,
    userInfo: profileInfo,
    file?: {
        id: number,
        user_id: number,
        path: string,
        filename: string,
        content_type: string,
        content_size: number,
        upload_date: string,
    }
}

class messageRowComponent extends Block {
    constructor(props: messageRow) {

        const deleteUserFromChat: buttonComponent = new buttonComponent({
            name: '<i class="fa-solid fa-user-slash"></i>',
            type: 'button',
            className: 'message-row_btn-del-from-chat',
            events: {
                click: async (e: Event) => {
                    e.stopPropagation()
                    const userInfo: profileInfo = await controllerUsers.getUserInfo(props.user_id)
                    const del: boolean = confirm(`Удалить пользователя ${userInfo.first_name} ${userInfo.login} из чата?`)
                    if (del) {
                        try{
                            await controllerChatlist.deleteUserFromChat(props.user_id, props.chat_id)
                            alert('Готово. Пользователь больше не может писать в чат')
                        }catch(e){
                            alert('Ошибка удаления пользователя '+e.message)
                        }
                    }
                }
            }
        })
        super("div", { ...props, deleteUserFromChat });
    }

    render() {
        return this.compile(messageRowTemplate, this.props);
    }
    setProps(nextProps: messageRow) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }
}
export default messageRowComponent
