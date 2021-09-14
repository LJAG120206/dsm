dsm.models.forms = 
{
    records : [],

    getRecord: (id)=>
    {
        console.log("dsm.models.forms.getRecord()");
        
        let ajax = new XMLHttpRequest();
        console.log("dsm.controlers.forms.view : "+dsm.controlers.forms.view);
        console.log("id : "+id);
        
        ajax.open("GET","models/sql.php?type=form&view="+dsm.controlers.forms.view+"&id="+id,true);
        ajax.onreadystatechange = ()=>
        {
            if (ajax.readyState === 4)
            {
                if(ajax.status === 200)
                {
                    dsm.controlers.forms.callback(ajax.responseText);
                }
                else
                {
                    dsm.controlers.forms.callback("Erreur "+ajax.status);
                }
            }
        }
        ajax.send();
    },

    getSelectRows: (table, value)=>
    {
        console.log('dsm.models.forms.getSelectRows('+table+');');

        let ajax = new XMLHttpRequest();

        ajax.open("GET","models/sql.php?type=select&view="+table.toLowerCase(),true);
        ajax.onreadystatechange = () =>
        {
            if (ajax.readyState == XMLHttpRequest.DONE)
            {
                if(ajax.statusText == 'OK')
                {
                    dsm.controlers.forms.callbackSelect(ajax.responseText,table, value);
                }
                else
                {
                    dsm.controlers.forms.callbackSelect("Erreur "+ajax.status);
                }
            }
        }
        ajax.send();
    }
    
}