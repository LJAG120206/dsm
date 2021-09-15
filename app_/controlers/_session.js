dsm.controlers.session =
{
    resetTimeoutPID: null,

    resetTimeout: () =>
    {
        console.log("dsm.controlers.session.resetTimeout();");

        if(this.resetTimeoutPID != null)
        {
            clearTimeout(this.resetTimeoutPID);
        }
        this.resetTimeoutPID = setTimeout("dsm.controlers.session.logout();", 900000);
    },

    check: (next=null) =>
    {
        console.log("dsm.controlers.session.check();");

        if(dsm.models.session.check())
        {
            dsm.controlers.session.resetTimeoutPID = dsm.controlers.session.resetTimeout();
            if(next == null)
            {
                return(true)
            }
            else
            {
                next();
            }
        } 
        else
        {
            if(next == null)
            {
                return(false);
            }
            else
            {
                dsm.controlers.session.logout();
            }
        }
    },

    logout: () =>
    {
        console.log("dsm.controlers.session.logout();");

        dsm.models.session.id       = '';
        dsm.models.session.userid   = '';
        dsm.models.session.username = '';

        sessionStorage.removeItem("sessionId");
        sessionStorage.removeItem("sessionTime");
        sessionStorage.removeItem("sessionUserId");
        sessionStorage.removeItem("sessionUserName");

        document.body.innerHTML = "";

        dsm.controlers.login.openForm();
    }
}
