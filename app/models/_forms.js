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
    }
    
}