dsm.controlers.login =
{
    openForm: () =>
    {
        console.log("dsm.controlers.login.openForm();");

        dsm.views.overlay.start();
        dsm.views.login.openForm();
    },

    closeForm: () =>
    {
        console.log("dsm.controlers.login.closeForm();");

        dsm.views.login.closeForm();
        dsm.views.overlay.stop();
    },

    check: () =>
    {
        console.log("dsm.controlers.login.check();");

        dsm.models.login.check();
    },

    callback: (responseText) =>
    {
        console.log("dsm.controlers.login.callback();");

        if(responseText != '' && responseText.substring(0,6) != 'Erreur')
        {
            let session = JSON.parse(responseText);

            console.log(session);

            dsm.models.session.id       = session['id'];
            dsm.models.session.userId   = session['userId'];
            dsm.models.session.userName = session['userName'];
            dsm.models.session.time     = session['time'];

            sessionStorage.setItem('sessionId',dsm.models.session.id);
            sessionStorage.setItem('sessionUserId',dsm.models.session.userId);
            sessionStorage.setItem('sessionUserName',dsm.models.session.userName);
            sessionStorage.setItem('sessionTime',dsm.models.session.time);

            dsm.controlers.session.resetTimeout();
            dsm.controlers.login.closeForm();
            
            init(1);
        }
        else
        {
            $("formLoginMsg").innerHTML = "identifiant ou mot de passe incorrect"
        }
    } 
}
