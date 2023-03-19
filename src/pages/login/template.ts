export const  loginTemplate =
`

<div class="logo-big" > 
    
</div>

<div class="pages-login">
    <form name="form1" action="/#chatlist" method="post">
        <h1 class="form-main-title">Login</h1>
            {{#each inputs}}
                {{{html}}}
            {{/each}}
        <div class="form-buttons inline">
            {{{btnSignIn}}}
            {{{btnSignUp}}}
        </div>
    </form>
</div>

`