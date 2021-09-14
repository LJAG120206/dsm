dsm.controlers.forms = 
{
    view :'',
    
    openForm(view, id)
    {
        console.log("dsm.controlers.forms.openForm()");
        if(dsm.controlers.session.check() == true)
        {
            dsm.controlers.forms.view = view;
            dsm.models.forms.getRecord(dsm.models.lists.records[id][0]);
        }
        else
        {
            dsm.controlers.session.logout();
        }
        
        console.log("records[id][0] = "+dsm.models.lists.records[id][0]);
    },

    callback: (responseText) =>
    {
        console.log("dsm.controlers.forms.callback();");
        if(responseText != '' && responseText.substring(0,6) != 'Erreur')
        {
            dsm.models.forms.records = JSON.parse(responseText);

            switch(dsm.controlers.forms.view)
            {
                case 'adherents'    :   dsm.views.forms.title  = "Formulaire des Adhérents";
                                        break;
                case 'eleves'       :   dsm.views.forms.title  = "Formulaire des Élèves";
                                        break;
                case 'professeurs'  :   dsm.views.forms.title  = "Formulaire des Professeurs";
                                        break;
                case 'benevoles'  :     dsm.views.forms.title  = "Formulaire des Bénévoles";
                                        break;
            }

            console.log("dsm.views.forms.title : "+dsm.views.forms.title);

            dsm.views.forms.openForm();
            dsm.views.forms.fill();
        }
    },

    fillSelect:(tableName, value)=>
    {
        console.log("dsm.controlers.forms.fillSelect();");
        if(dsm.controlers.session.check() == true)
        {
            dsm.models.forms.getSelectRows(tableName, value);
        }
        else
        {
            dsm.controlers.session.logout();
        }
    },

    callbackSelect: (responseText,table, value)=>
    {
        console.log("dsm.controler.forms.callbackSelect();");

        if(responseText != '' && responseText.substring(0,6) != 'Erreur')
        {
            let options = JSON.parse(responseText);

            dsm.views.forms.fillSelect(options,table,value);
        }
    }

}