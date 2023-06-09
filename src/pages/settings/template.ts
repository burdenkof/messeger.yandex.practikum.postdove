export const  settingsTemplate:string =
`
<div class="logo-big" > 

</div>

<div class="pages-login pages-settings">
{{{btnBack}}}
    <h1 class="form-main-title">Profile</h1>
    <div class="pages-settings_profile-card">
    
        <div class="pages-settings_profile-card_avatar">
        {{#if currentUser.avatar}}
             <img width="220"  class="pages-settings_profile-card_avatar_img" src="https://ya-praktikum.tech/api/v2/resources{{currentUser.avatar}}"/>
         {{/if}}
        </div>
        <div class="pages-settings_profile-card_info">
            <span class="pages-settings_profile-card_info_name">{{currentUser.first_name}} {{currentUser.second_name}}</span>
            <span class="pages-settings_profile-card_info_email">{{currentUser.email}}</span>
            <span class="pages-settings_profile-card_info_phone">{{currentUser.phone}}</span>
            <span class="pages-settings_profile-card_info_nickname">{{currentUser.display_name}}</span>
        </div>
    </div>
    <div class="form-buttons inline">
        {{{btnEdit}}}
        {{{btnChangePassword}}}
    </div>
</div>

`
