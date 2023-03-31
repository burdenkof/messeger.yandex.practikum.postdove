export const  chatRowTemplate: string =
`<div class="chat-list_one-row">
    <div class="chat-list_one-row_avatar" >
        
    </div>
    <div class="chat-list_one-row_main-info"  >
    <div class="chat-list_one-row_main-info_time">{{time}}</div>

        <div class="chat-list_one-row_main-info_chat-name">{{name}}</div>

        <div class="chat-list_one-row_main-info_description">
            <span class="chat-list_one-row_main-info_description_username">{{userName}}:&nbsp;</span>
            <div class="chat-list_one-row_main-info_description_text">{{lastText}}</div>
            
        </div>
        
    </div>
</div>`