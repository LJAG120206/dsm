dsm.views.login = {
    openForm: () =>
    {
        console.log("dsm.views.login.openForm();");

        let formLogin = document.createElement('form');
        formLogin.id = "formLogin";
        formLogin.method = "POST";
        formLogin.action = "javascript:void(0);";
        formLogin.innerHTML = "<h1>IDENTIFICATION</h1>";
        formLogin.onsubmit = () => { dsm.controlers.login.check('formLogin'); };

        let formLoginMsg = document.createElement('p');
        formLoginMsg.id = "formLoginMsg";
        formLoginMsg.innerHTML = "&nbsp;";

        let formLoginInputUser = document.createElement('input');
        formLoginInputUser.id = "formLoginInputUser";
        formLoginInputUser.name = "user";
        formLoginInputUser.type = "text";
        formLoginInputUser.pattern = "[0-9a-zA-Z-_.]{4,20}";
        formLoginInputUser.placeholder = "Identifiant";
        formLoginInputUser.setAttribute('required','required');

        let formLoginInputPwd = document.createElement('input');
        formLoginInputPwd.id = "formLoginInputPwd";
        formLoginInputPwd.name = "pwd";
        formLoginInputPwd.type = "password";
        formLoginInputPwd.pattern = "[0-9a-zA-Z-_.]{4,20}";
        formLoginInputPwd.placeholder = "Mot de passe";
        formLoginInputPwd.setAttribute('required','required');

        let formLoginButtons = document.createElement('div');

        let formLoginButtonReset = document.createElement('button');
        formLoginButtonReset.id = "formLoginButtonReset";
        formLoginButtonReset.innerHTML = "Reset";
        formLoginButtonReset.setAttribute('form','formLogin');
        formLoginButtonReset.setAttribute('type','reset');
        formLoginButtonReset.onclick = () => { alert('formLogin'); };

        let formLoginButtonOK = document.createElement('button');
        formLoginButtonOK.id = "formLoginButtonOK";
        formLoginButtonOK.innerHTML = "OK";
        formLoginButtonOK.setAttribute('form','formLogin');
        formLoginButtonOK.setAttribute('type','submit');
        formLoginButtonOK.onsubmit = () => { dsm.controlers.login.check('formLogin'); };

        formLogin.appendChild(formLoginMsg);
        formLogin.appendChild(formLoginInputUser);
        formLogin.appendChild(formLoginInputPwd);
        formLogin.appendChild(formLoginButtons);
        formLoginButtons.appendChild(formLoginButtonReset);
        formLoginButtons.appendChild(formLoginButtonOK);

        $('body').appendChild(formLogin);
    },

    closeForm: () =>
    {
        $('body').removeChild($('formLogin'));
    }
}