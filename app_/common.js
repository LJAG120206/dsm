let dsm = {
    models: {},
    controlers: {},
    views: {},
    reports: {}
};

function $(id)
{
    return(document.getElementById(id));
}

function createElement(parentId, tag, id)
{
    console.log("createElement('"+parentId+"','"+tag+"','"+id+"');");

    if(!$(id))
    {
        let e = document.createElement(tag);
        e.id = id;
        $(parentId).appendChild(e);
    }
}

function getCookie(cookieName)
{
    console.log("getCookie('"+cookieName+"');");

    cookieName = cookieName + "=";
    let cookies = document.cookie.split(';');
    for (let i=0; i < cookies.length; i++)
    {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ')
        {
            cookie = cookie.substring(1);
        }
        if(cookie.indexOf(cookieName) != -1)
        {
            return(cookie.substring(cookieName.length, cookie.length));
        }
    }
    return('');
}

function loadJS(file, o)
{
    console.log("loadJS("+file+");");

    let ajax = new XMLHttpRequest();

    ajax.open("GET",file,true);
    ajax.onreadystatechange = () =>
    {
        if (ajax.readyState == XMLHttpRequest.DONE)
        {
            dsm.code[o] = ajax.responseText;
        }
    }
    ajax.send();
}

function init(cmd=0)
{
    console.log("init("+cmd+");");

    if(cmd == 0)
    {
        dsm.models.session.id       = sessionStorage.getItem('sessionId');
        dsm.models.session.userId   = sessionStorage.getItem('sessionUserId');
        dsm.models.session.userName = sessionStorage.getItem('sessionUserName');
        dsm.models.session.time     = sessionStorage.getItem('sessionTime');
        
        if(dsm.models.session.id != '' && dsm.controlers.session.check() == true && ((Date.now() / 1000) - dsm.models.session.time) < 900)
        {
            cmd = 1;
        }
        else
        {
            document.body.innerHTML = '';
            dsm.controlers.login.openForm();
        }
    }

    if(cmd == 1)
    {
        createElement('body','header','header');
            createElement('header','img','logo');
            createElement('header','div','title');
            createElement('header','div','user');

        createElement('body','nav','menu');
        createElement('body','main','main');
        createElement('body','footer','footer');

        $('logo').src = 'images/logo.svg';
        $('title').innerHTML = 'DANCE SCHOOL MANAGER';
        $('user').innerHTML  = dsm.models.session.userName;
        
        menu();
        dsm.controlers.accueil.openForm();
    }
}
