function menu()
{
    let ajax = new XMLHttpRequest();
    
    ajax.open("GET","menu.php?sid="+dsm.models.session.id, false);
    ajax.send();

    if(ajax.statusText == 'OK')
    {
        if(ajax.responseText != '')
        {
            $('menu').innerHTML = ajax.responseText;
        }
    }    
}
