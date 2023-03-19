export const  inputTemplate =
`
<div class="form-control {{item.status}}">
    <label class="form-input_label" for="input-{{item.name}}" >{{item.label}}</label>
    <input class="form-control_input {{item.status}}" id="input-{{item.name}}" name="{{item.name}}" type="{{item.type}}" value="" />
    <span class="form-control_error">{{item.error}}</span>
</div>

`