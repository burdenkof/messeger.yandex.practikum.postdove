export const  chatRowTemplate: string =
`<div class="chat-list_one-row {{#if isSelected}} selected {{/if}}" >
    <div class="chat-list_one-row_avatar" >
        {{#if avatar}}
            <img width="95"  class="chat-list_one-row_avatar_img" src="https://ya-praktikum.tech/api/v2/resources{{avatar}}"/>
        {{/if}}
    </div>
    <div class="chat-list_one-row_main-info"  >
        
        <div class="chat-list_one-row_main-info_time">
        <div class="chat-list_one-row_main-info_delete">{{last_message.time}}&nbsp;&nbsp;&nbsp;&nbsp;{{{btnAddUserToChat}}}&nbsp;{{{btnDeleteUserFromChat}}}&nbsp;{{{btnDeleteChat}}}</div>
            
            
        </div>

        <div class="chat-list_one-row_main-info_chat-name">{{title}}</div>

        <div class="chat-list_one-row_main-info_description">
            <span class="chat-list_one-row_main-info_description_username">{{last_message.user.first_name}} {{last_message.user.last_name}}:&nbsp;</span>
            <div class="chat-list_one-row_main-info_description_text">{{last_message.content}}</div>
            
        </div>
        
    </div>
</div>`
