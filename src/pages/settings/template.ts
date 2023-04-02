export const  settingsTemplate:string =
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
