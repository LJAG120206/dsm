dsm.models.login = {
    check: () =>
    {
        console.log("dsm.models.login.check();");

        let data = new FormData($('formLogin'));
        let ajax = new XMLHttpRequest();

        ajax.open("POST","models/login.php",true);
        ajax.onreadystatechange = () =>
        {
            if (ajax.readyState == XMLHttpRequest.DONE)
            {
                if(ajax.statusText == 'OK')
                {
                    dsm.controlers.login.callback(ajax.responseText);
                }
                else
                {
                    dsm.controlers.login.callback("Erreur "+ajax.status);
                }
            }
        }
        ajax.send(data);
    }
}
