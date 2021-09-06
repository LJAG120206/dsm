dsm.models.lists =
{
    records: [],

    getRows: (table) =>
    {
        console.log('dsm.models.lists.getRows('+table+');');

        let ajax = new XMLHttpRequest();

        ajax.open("GET","models/sql.php?type=list&view="+table,true);
        ajax.onreadystatechange = () =>
        {
            if (ajax.readyState == XMLHttpRequest.DONE)
            {
                if(ajax.statusText == 'OK')
                {
                    dsm.controlers.lists.callback(ajax.responseText);
                }
                else
                {
                    dsm.controlers.lists.callback("Erreur "+ajax.status);
                }
            }
        }
        ajax.send();
    }
}
