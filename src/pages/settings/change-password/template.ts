
export const  changePasswordTemplate:string =
`
<div class="logo-big" > 
    
</div>

<div class="pages-login  pages-change-password">
    <form name="form1" id="form1"  action="/#settings" method="post">
        <h1 class="form-main-title">Change password</h1>
            {{{itemCurrentPassword}}}
            {{{itemNewPassword}}}
            {{{itemNewPassword2}}}
        <div class="form-buttons inline">
            {{{btnSave}}}
        </div>
    </form>
</div>

`