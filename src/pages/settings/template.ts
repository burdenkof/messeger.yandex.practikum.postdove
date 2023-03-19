export const  settingsTemplate =
`
<div class="logo-big" > 
    
</div>

<div class="pages-login pages-settings">
    <h1 class="form-main-title">Profile</h1>
    <div class="pages-settings_profile-card">
        <div class="pages-settings_profile-card_avatar"></div>
        <div class="pages-settings_profile-card_info">
            <span class="pages-settings_profile-card_info_name">{{currentUser.firstName}} {{currentUser.secondName}}</span>
            <span class="pages-settings_profile-card_info_email">{{currentUser.email}}</span>
            <span class="pages-settings_profile-card_info_phone">{{currentUser.phone}}</span>
            <span class="pages-settings_profile-card_info_nickname">{{currentUser.displayName}}</span>
        </div>
    </div>
    <div class="form-buttons inline">
        {{{btnEdit}}}
        {{{btnChangePassword}}}
    </div>
</div>

`

export const  settingsEditTemplate =
`
<div class="logo-big" > 
    
</div>

<div class="pages-login  pages-edit-settings">
    <form name="form1" action="/#settings" method="post">
        <h1 class="form-main-title">Edit profile</h1>
            {{#each inputs}}
                {{{html}}}
            {{/each}}
        <div class="form-buttons inline">
            {{{btnSave}}}
        </div>
    </form>
</div>

`
export const  changePasswordTemplate =
`
<div class="logo-big" > 
    
</div>

<div class="pages-login  pages-change-password">
    <form name="form1" action="/#settings" method="post">
        <h1 class="form-main-title">Change password</h1>
            {{#each inputs}}
                {{{html}}}
            {{/each}}
        <div class="form-buttons inline">
            {{{btnSave}}}
        </div>
    </form>
</div>

`