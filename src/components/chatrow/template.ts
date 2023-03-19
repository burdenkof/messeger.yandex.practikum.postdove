export const  chatRowTemplate =
`<div class="chat-list_one-row">
    <div class="chat-list_one-row_avatar" >
        
    </div>
    <div class="chat-list_one-row_main-info"  >
    <div class="chat-list_one-row_main-info_time">{{item.time}}</div>

        <div class="chat-list_one-row_main-info_chat-name">{{item.name}}</div>

        <div class="chat-list_one-row_main-info_description">
            <span class="chat-list_one-row_main-info_description_username">{{item.userName}}:&nbsp;</span>
            <div class="chat-list_one-row_main-info_description_text">{{item.lastText}}</div>
            
        </div>
        
    </div>
</div>`