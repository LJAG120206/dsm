dsm.controlers.lists =
{
    view: '',
    selected: Array(),
    click : 0,
    pid : null,
    delay: 0,
    length: 0,
    rows : 0,
    totalRows: 0,
    offset: 0,

    

    openForm: (view) =>
    {
        let mainHeight = parseInt($('main').getBoundingClientRect().height) - 35;
        dsm.controlers.lists.rows = (mainHeight/30|0);
        console.log("dsm.controlers.lists.openForm();");
                
        if(dsm.controlers.session.check() == true)
        {
            if(view !== dsm.controlers.lists.view)
            {
                dsm.controlers.lists.offset = 0;
            }
            dsm.controlers.lists.view = view;
            dsm.models.lists.getRowsNumber(view);
        }
        else
        {
            dsm.controlers.session.logout();
        }
    },

    callback: (responseText) =>
    {
        console.log("dsm.controlers.lists.callback();");
        console.log("responseText:"+responseText);

        if(responseText != '' && responseText.substring(0,6) != 'Erreur')
        {
            dsm.models.lists.records = JSON.parse(responseText);

            dsm.models.lists.rows = dsm.models.lists.records.length;
            dsm.models.lists.cols = dsm.models.lists.records[0].length;

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

    callbackRowsNumber:(view,responseText)=>
    {
        console.log("dsm.controlers.lists.callbackRowsNumber();");

        dsm.controlers.lists.totalRows =(responseText != '' && responseText.substring(0,6) != 'Erreur') ? parseInt(responseText) : 0;
        console.log("totalRows = "+dsm.controlers.lists.totalRows);
        dsm.models.lists.getRows(view, dsm.controlers.lists.rows);
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
            dsm.controlers.lists.pid = setTimeout("dsm.controlers.lists.select('"+n+"'); dsm.controlers.lists.delay=0; dsm.controlers.lists.click = 0;", 500);

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
    },

    select:(id)=>
    {
        console.log("dsm.controlers.lists.select()");
        
        let selected = dsm.controlers.lists.selected;
        if($(id+"c0").innerHTML != "")
        {
            let found = false;
            for(let i = 0 ; i < selected.length; i ++)
            {
                if(selected[i] == id)
                {
                    $(id).style.boxShadow = "none";
                    selected.splice(i,1);
                    found = true;
                    break;
                }
            }

            if(found == false)
            {
                $(id).style.boxShadow = "0px 0px 30px 15px lightblue  inset";
                selected.push(id);
            }
        }
    },

    delete:()=>
    {
        let selected = dsm.controlers.lists.selected;
        let ids_ = [];
        let ids = '';

        selected.forEach(tr =>
        {
            ids += $(tr+'c0').innerHTML + ',';   
        });
        ids = ids.substring(0,ids.length -1);
        
        let data = new FormData;
        data.append('ids',ids);

        // AJAX

        let ajax = new XMLHttpRequest();

        ajax.open("POST","models/sql.php?type=delete&view="+dsm.controlers.lists.view);

        ajax.onreadystatechange = () =>
        {
            if(ajax.readyState == XMLHttpRequest.DONE)
            {
                if(ajax.statusText == 'OK')
                {
                    dsm.controlers.lists.deleteCallback(ajax.responseText);
                }
                else
                {
                    dsm.controlers.lists.deleteCallback("Erreur "+ajax.status);
                }
            }
        }

        ajax.send(data);

        /*
        let selected = dsm.controlers.lists.selected;
        console.log("longueur "+selected.length);
        let l = selected.length;
        for(let i = 0; i<l ; i++)
        {
            console.log("test "+i+" s[i] ="+selected[i]);
            $(selected[0]).remove();
            selected.shift();
            console.log(selected);
        }
        */
    },

    deleteCallback: (responseText) =>
    {
        console.log("dsm.controlers.lists.deleteCallback(\""+responseText+"\")");

        let ids = responseText.split("\n");
        ids.forEach(id_r => 
        {
            console.log(id_r);
            let id_r_ = id_r.split(':');
            id = id_r_[0];
            r  = id_r_[1];
            console.log(id+'='+r);
        });
    }
}
