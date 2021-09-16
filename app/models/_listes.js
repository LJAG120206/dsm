dsm.models.lists =
{
    records: [],

    getRowsNumber:(table)=>
    {
        console.log('dsm.models.lists.getRowsNumber('+table+');');
        let ajax = new XMLHttpRequest();

        ajax.open("GET","models/sql.php?type=list&cmd=count&view="+table);
        ajax.onreadystatechange = ()=>
        {
            if(ajax.readyState == XMLHttpRequest.DONE)
            {
                if(ajax.statusText == "OK")
                {
                    dsm.controlers.lists.callbackRowsNumber(table, ajax.responseText);
                }
                else
                {
                    dsm.controlers.lists.callbackRowsNumber(table,"Erreur "+ajax.status);
                }
            }
        }
        ajax.send();
    },

    getRows: (table,  rows) =>
    {
        console.log('dsm.models.lists.getRows('+table+');');
        let limit = dsm.controlers.lists.offset+','+rows;

        let ajax = new XMLHttpRequest();

        ajax.open("GET","models/sql.php?type=list&cmd=&view="+table+"&limit="+limit,true);
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
