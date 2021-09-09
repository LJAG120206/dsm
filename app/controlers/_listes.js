dsm.controlers.lists =
{
    view: '',
    selected: Array(),
    click : 0,
    pid : null,
    delay: 0,

    

    openForm: (view) =>
    {
        console.log("dsm.controlers.lists.openForm();");
        if(dsm.controlers.session.check() == true)
        {
            dsm.controlers.lists.view = view;
            dsm.models.lists.getRows(view);
        }
        else
        {
            dsm.controlers.session.logout();
        }
    },

    callback: (responseText) =>
    {
        console.log("dsm.controlers.lists.callback();");

        if(responseText != '' && responseText.substring(0,6) != 'Erreur')
        {
            dsm.models.lists.records = JSON.parse(responseText);

            switch(dsm.controlers.lists.view)
            {
                case 'adherents'    :   dsm.views.lists.widths = ['50px','15%','15%','5%','15%','15%','7%','*'];
                                        dsm.views.lists.title  = "Liste des Adhérents";
                                        break;
                case 'eleves'       :   dsm.views.lists.widths = ['50px','15%','15%','5%','15%','15%','7%','*'];
                                        dsm.views.lists.title  = "Liste des Élèves";
                                        break;
                case 'professeurs'  :   dsm.views.lists.widths = ['50px','15%','15%','5%','15%','15%','7%','*'];
                                        dsm.views.lists.title  = "Liste des Professeurs";
                                        break;
                case 'benevoles'  :     dsm.views.lists.widths = ['50px','10%','10%','5%','15%','15%','7%','*'];
                                        dsm.views.lists.title  = "Liste des Bénévoles";
                                        break;
            }


            dsm.views.lists.openForm();
            dsm.views.lists.fill();
        }
    },

    select:()=>
    {
        console.log("dsm.controlers.lists.select()");
    },


    onclick:(n,v,r)=>
    {
        console.log("r="+r);
        console.log("v="+v);

        if(dsm.controlers.lists.click == 0)
        {
            console.log("click=0");
            dsm.controlers.lists.delay = Date.now();
            console.log(Date.now()-dsm.controlers.lists.delay);
            
            dsm.controlers.lists.click++;
            dsm.controlers.lists.pid = setTimeout("dsm.controlers.lists.select(); dsm.controlers.lists.delay=0; dsm.controlers.lists.click = 0;", 500);

        }  
        else if(dsm.controlers.lists.click > 0)
        {
            console.log("click>0");
            console.log(Date.now());
            console.log(Date.now()-dsm.controlers.lists.delay);

            if((Date.now()-dsm.controlers.lists.delay) < 500)
            {
                console.log("test click");
                dsm.controlers.forms.openForm(v,r);
                clearTimeout(dsm.controlers.lists.pid);
                dsm.controlers.lists.click = 0;
                dsm.controlers.lists.delay = 0;                    
            }   
             
        }
    }
}
