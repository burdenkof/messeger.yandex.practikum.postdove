export const  chatRowTemplate: string =
`<div class="chat-list_one-row">
    <div class="chat-list_one-row_avatar" >
        
    </div>
    <div class="chat-list_one-row_main-info"  >
        
        <div class="chat-list_one-row_main-info_time">
        <div class="chat-list_one-row_main-info_delete">{{{btnAddUserToChat}}}&nbsp;{{{btnDeleteChat}}}</div>
            {{last_message.time}}
            
        </div>

        <div class="chat-list_one-row_main-info_chat-name">{{title}}</div>

        <div class="chat-list_one-row_main-info_description">
            <span class="chat-list_one-row_main-info_description_username">{{last_message.user.first_name}} {{last_message.user.last_name}}:&nbsp;</span>
            <div class="chat-list_one-row_main-info_description_text">{{last_message.content}}</div>
            
        </div>
        
    </div>
</div>`
