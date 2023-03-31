export const  chatListTemplate =
`
<div class ="chat-list">
    <aside id="aside-chat-list">
        <ul class="chat-list-ul">
            {{#each chats}}
                <li>{{{this}}}</li>
            {{/each}}
        </ul>
    </aside>
    <div class="chat-list_messages-wrapper">
        <div class="chat-list_message-list">
            {{#each messages}}
                {{{this}}}
            {{/each}}
        </div>
        <div class = "chat-list_send-input">
            <form name="form1" class="chat-list_send-input_form" id="form1" action="/#chatlist" method="post">
                <input class = "chat-list_send-input_text" />
                <button type="submit" class = "chat-list_send-input_btn-send"><i class="fa-regular fa-circle-right"></i></button>
            </form>
        </div>
    </div>
</div>
`
