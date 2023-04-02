export const  settingsEditTemplate:string =
`
<div class="logo-big" > 
    
</div>

<div class="pages-login  pages-edit-settings">
    <form name="form1"   action="/#settings" method="post">
        <h1 class="form-main-title">Edit profile</h1>
            {{{itemFirstName}}}
            {{{itemSecondName}}}
            {{{itemDisplayName}}}
            {{{itemLogin}}}
            {{{itemEmail}}}
            {{{itemPhone}}}
                
        <div class="form-buttons inline">
            {{{btnSave}}}
        </div>
    </form>
</div>

`
