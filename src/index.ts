import { controllerAuth } from './controllers/auth.ts'
import { controllerChatlist } from './controllers/chatlist.ts'
import { renderChatList } from './pages/chatlist/chatlist.ts'
import { renderErrorPage } from './pages/errorpage/errorpage.ts'
import { doLogout, renderLogin } from './pages/login/login.ts'
import { renderChangePassword } from './pages/settings/change-password/change-password.ts'
import { renderSettings } from './pages/settings/settings.ts'
import { renderSettingsEdit } from './pages/settings/settings-edit/settings-edit.ts'
import { renderSignup } from './pages/signup/signup.ts'
import { router, paths } from './utils/routes.ts'

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(paths.login, () => renderLogin())
    .use(paths.logout, () => doLogout())
    .use(paths.signup, () => renderSignup())
    .use(paths.settings, () => renderSettings())
    .use(paths.settingsEdit, () => renderSettingsEdit())
    .use(paths.changePassword, () => renderChangePassword())

    .use(paths.chatlist, () => renderChatList())
    .use(paths.error404, () => renderErrorPage())
    .use(paths.error500, () => renderErrorPage(500, 'Something broke', 'We are already fixing'))
  let isPublicRoute = false
  if (window.location.pathname === paths.login
    || window.location.pathname === paths.signup) {
    isPublicRoute = true
  }

  try {
    await controllerAuth.getProfile()
    await controllerChatlist.getChats()
    router.start()
  } catch (e) {
    router.start()
    if (!isPublicRoute) {
      router.go(paths.login)
    }
  }
})
