import { messageRow, messageType } from "./components/messagerow/messagerow";
import { controllerAuth } from "./controllers/auth";
import { controllerChatlist } from "./controllers/chatlist";
import { renderChatList } from "./pages/chatlist/chatlist";
import { renderErrorPage } from "./pages/errorpage/errorpage";
import { doLogout, renderLogin } from "./pages/login/login";
import renderPagelist from "./pages/pagelist/pagelist";
import { renderChangePassword } from "./pages/settings/change-password/change-password";
import { renderSettings } from "./pages/settings/settings";
import { renderSettingsEdit } from "./pages/settings/settings-edit/settings-edit";
import { renderSignup } from "./pages/signup/signup";
import { chatRow } from "./types";
import { router, paths } from "./utils/routes";

window.addEventListener('DOMContentLoaded', async () => {

  router
    .use(paths.main, () => renderPagelist())
    .use(paths.login, () => renderLogin())
    .use(paths.logout,  () =>  doLogout())
    .use(paths.signup, () => renderSignup())
    .use(paths.settings, () => renderSettings())
    .use(paths.settingsEdit, () => renderSettingsEdit())
    .use(paths.changePassword, () => renderChangePassword())
    .use(paths.chatlist, () => renderChatList())
    .use(paths.error404, () => renderErrorPage())
    .use(paths.error500, () => renderErrorPage(500, 'Something broke', 'We are already fixing'))

    let isPublicRoute = false

    if(window.location.pathname == paths.main
      || window.location.pathname == paths.login
      || window.location.pathname == paths.signup){
            isPublicRoute = true
      }



   
    try{
      //router.start()  
      
      await controllerAuth.getProfile()
      await controllerChatlist.getChats()

      
      if(isPublicRoute ){
        router.go(paths.chatlist)
      }

    router.start();
      }catch(e){
        router.start()  
        if(!isPublicRoute){
           router.go(paths.login)
        }
      }
 
})