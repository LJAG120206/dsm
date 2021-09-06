dsm.models.session = {
    id: '',
    userId: 0,
    userName: '',
    pid: 0,
    
    check: () =>
    {
        console.log("dsm.models.session.check();");

        let ajax = new XMLHttpRequest();

        ajax.open("GET","models/session.php?sid="+dsm.models.session.id, false);
        ajax.send();

        let response = false;
        if(ajax.statusText == 'OK')
        {
            if(ajax.responseText != '')
            {
                if(ajax.responseText == 1)
                {
                    response = true;
                }
            }
        }
        return(response);
    }
}
