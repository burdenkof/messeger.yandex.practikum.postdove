export const  messageRowTemplate: string =
`
<div class="message-list_one-row {{outType}}">
    <div class="message-list_one-row_baloon">
        <div class="message-list_one-row_user_info" >{{userInfo.first_name}}</div>
        <div>{{content}}</div>
        <div class="message-list_one-row_baloon_time" >{{time}}</div>
    </div>
</div>
`
