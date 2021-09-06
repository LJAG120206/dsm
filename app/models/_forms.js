dsm.models.forms = 
{
    formCall: (view, id)=>
    {
        console.log("dsm.models.forms.formCall()");
        
        let ajax = new XMLHttpRequest();
        
        ajax.open("GET","models/sql.php?type=form&view="+view+"&id="+id,true);
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