import { getChatRow } from "./components/chatrow/chatrow";
import { pagelist } from "./pages/pagelist/pagelist";
import { getChatList } from "./pages/chatlist/chatlist";
import { getLogin } from "./pages/login/login";
import { getSettings } from "./pages/settings/settings";
import { getErrorPage } from "./pages/errorpage/errorpage";
import { getSignup } from "./pages/signup/signup";
export const getPage = (url) => {
  switch (url) {

    case "#error-404": return getErrorPage()
    case "#error-500": return getErrorPage(500, 'Something broke', 'We are already fixing')
    case "#login": return getLogin()
    case "#signup": return getSignup()

    case "#settings": return getSettings()
    case "#settings-edit": return getSettings('settings-edit')
    case "#change-password": return getSettings('change-password')


    case "#chatlist":

      let list = []; let messages = [];
      for (let i = 0; i < 15; i++) {
        list.push(
          {
            name: 'Chat Name',
            userName: 'Will smith',
            lastText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            time: '09.09.2023 19:45'
          })

        messages.push(
          {
            userName: 'Will smith',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            time: '09.09.2023 19:45',
            type: i % 2 == 0 ? 'input' : 'output',
            delivered: i % 2 == 0,
            readed: i % 3 == 0,
          })



      }

      return getChatList(list, messages)


    default:
      return pagelist()
  }
}
