export const  chatListTemplate =
`
<div class ="chat-list">

    <aside id="aside-chat-list">
        <div class="chat-list_toolbar">{{{btnAddChat}}}</div>
        <ul class="chat-list-ul">
            {{#each chatList}}
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
            <form name="form1" class="chat-list_send-input_form"   action="/#chatlist" method="post">
                <input class = "chat-list_send-input_text" id="input-message" name="message" />
                <button type="submit" class = "chat-list_send-input_btn-send"><i class="fa-regular fa-circle-right"></i></button>
            </form>
        </div>
    </div>
</div>
`
