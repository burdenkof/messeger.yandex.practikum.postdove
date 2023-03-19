export const  chatListTemplate =
`
<div class ="chat-list">
    <aside id="aside-chat-list">
        <ul class="chat-list-ul">
            {{#each items}}
                <li>{{{html}}}</li>
            {{/each}}
        </ul>
    </aside>
    <div class="chat-list_messages-wrapper">
        <div class="chat-list_message-list">
            {{#each messages}}
                {{{html}}}
            {{/each}}
        </div>
        <div class = "chat-list_send-input"></div>
    </div>
</div>
`
