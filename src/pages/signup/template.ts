import { paths } from "../../utils/routes";

export const  signupTemplate =
`
<div class="logo-big" > 
    
</div>

<div class="pages-login  pages-edit-settings">
    {{{btnBack}}}
    <form name="form1"    action="/#${paths.chatlist}" method="post">
        <h1 class="form-main-title">Sign up</h1>
            {{{itemFirstName}}}
            {{{itemSecondName}}}
            {{{itemDisplayName}}}
            {{{itemLogin}}}
            {{{itemEmail}}}
            {{{itemPhone}}}
            {{{itemPassword}}}
            {{{itemPassword2}}}
        <div class="form-buttons inline">
            {{{btnSignUp}}}
        </div>
    </form>
</div>

`
