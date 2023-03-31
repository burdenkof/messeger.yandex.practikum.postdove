export const  inputTemplate: string =
`
<div class="form-control {{status}}">
    <label class="form-input_label" for="input-{{name}}" >{{label}}</label>
    <input class="form-control_input {{status}}" id="input-{{name}}" name="{{name}}" type="{{type}}" value="" />
    <span class="form-control_error">{{error}}</span>
</div>

`