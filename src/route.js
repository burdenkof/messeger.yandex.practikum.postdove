import { getChatRow } from "../components/chatrow/chatrow";
import { pagelist } from "../pages/pagelist/pagelist";
import { getChatList } from "../components/chatlist/chatlist";

export const getPage = (url) => {
    switch (url) {
      case "#chatlist":

      let list =[];
      for(let i =0; i < 15; i++){
          list.push(
              {
                  name:'Chat Name', 
                  userName:'Will smith', 
                  text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                  time: '09.09.2023 19:45'
              })
  
      }

        return getChatList(list)
      default:
        return pagelist()
    }
}
  