export const  loginTemplate: string =
`

<div class="logo-big" > 
    
</div>

<div class="pages-login">
    <form name="form1" id="form1" action="/#chatlist" method="post">
        <h1 class="form-main-title">Login</h1>
                {{{itemLogin}}}
                {{{itemPassword}}}
        <div class="form-buttons inline">
            {{{btnSignIn}}}
            {{{btnSignUp}}}
        </div>
    </form>
</div>

`