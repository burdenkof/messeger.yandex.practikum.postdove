import { chatRow } from "./components/chatrow/chatrow";
import { renderPagelist } from "./pages/pagelist/pagelist";
import { renderChatList } from "./pages/chatlist/chatlist";
import { renderSettings } from "./pages/settings/settings";
import { renderErrorPage } from "./pages/errorpage/errorpage";
import { renderSignup } from "./pages/signup/signup";
import { messageRow, messageType } from "./components/messagerow/messagerow";
import { Nullable } from "./utils/renderDOM";
import { renderLogin } from "./pages/login/login";
import { renderChangePassword } from "./pages/settings/change-password/change-password";
import { renderSettingsEdit } from "./pages/settings/settings-edit/settings-edit";
export const getPage = (url: String, root:Nullable<HTMLDivElement>) => {
  switch (url) {

    case "#error-404": return renderErrorPage(root)
    case "#error-500": return renderErrorPage(root, 500, 'Something broke', 'We are already fixing')
    case "#login": return renderLogin(root)
    case "#signup": return renderSignup(root)

    case "#settings": return renderSettings(root)
    case "#settings-edit": return renderSettingsEdit(root)
    case "#change-password": return renderChangePassword(root)


    case "#chatlist":

      let list: chatRow[] = []; let messages: messageRow[] = [];
      for (let i = 0; i < 15; i++) {
        list.push(
          {
            name: 'Chat Name',
            userName: 'Will smith',
            lastText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            time: '09.09.2023 19:45',
          })

        messages.push(
          {
            userName: 'Will smith',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            time: '09.09.2023 19:45',
            type: i % 2 == 0 ?  messageType[messageType.input]: messageType[messageType.output],
            delivered: i % 2 == 0,
            readed: i % 3 == 0,
          })



      }

      return renderChatList(root, list, messages)


    default:
      return renderPagelist(root)
  }
}