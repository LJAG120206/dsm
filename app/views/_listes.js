dsm.views.lists = 
{
    widths: [],
    title: '',

    openForm: () =>
    {
        let cols = dsm.models.lists.records[0].length;
        console.log('dsm.views.lists.openForm('+cols+');');

        $('title').innerHTML = dsm.views.lists.title.toUpperCase();

        mainHeight = parseInt($('main').getBoundingClientRect().height) - 35;
        rows = (mainHeight/30|0);

        // --- Construction du tableau ---
        let HTML = '';
        
        HTML += "<table cellspacing='0' cellpadding='0'>";
        HTML += "<thead id='thead'>";
        HTML += "<tr>";
        for(c=0; c < cols; c++) 
        {
            HTML += "<th id='r0c"+c+"'></th>";
        }
        HTML += "</tr>";
        HTML += "</thead>";

        HTML += "<tbody id='tbody'>";
        for(r=1; r<=rows; r++) 
        {
            HTML += "<tr id='r"+r+"' onclick=\"dsm.controlers.lists.onclick(this.id,'"+dsm.controlers.lists.view+"',"+r+");\">";
            for(c=0; c < cols; c++) 
            {
                //HTML += "<td id='r"+r+"c"+c+"' onclick='dsm.controlers.lists.select(this.id);' ondblclick=\"dsm.controlers.form.openForm("+dsm.models.lists.view+","+r+");\"></td>";
                HTML += "<td id='r"+r+"c"+c+"'></td>";
               
            }
            HTML += "</tr>";
        }
        HTML += "</tbody>";

        HTML += "</table>"
        
        $('main').innerHTML = HTML;

        // --- Construction du Panel ---
        HTML = '';

        HTML += "<div id='cmdList'>";
        HTML += '<button title="Ajouter un adhérent" onclick="dsm.controlers.accueil.openForm()">Ajouter</button>';
        HTML += '<button title="Supprimer un plusieurs adhérents" onclick="dsm.controlers.accueil.openForm()">Supprimer</button>';
        HTML += '<button title="Fermer la liste" onclick="dsm.controlers.accueil.openForm()">Fermer</button>';
        HTML += "</div>";

        $('footer').innerHTML = HTML;
    },

    fill: () =>
    {

        console.log('dsm.views.lists.fill();');


        dsm.models.lists.rows = dsm.models.lists.records.length;
        dsm.models.lists.cols = dsm.models.lists.records[0].length;

        for(c=0; c<dsm.models.lists.cols; c++)
        {
            $('r0c'+c).style.width    = dsm.views.lists.widths[c];
            //$('r0c'+c).style.minWidth = dsm.views.lists.widths[c];
            //$('r0c'+c).style.maxWidth = dsm.views.lists.widths[c];
        }

        for(r=0; r<dsm.models.lists.rows; r++)
        {
            for(c=0; c<dsm.models.lists.cols; c++)
            {
                $('r'+r+'c'+c).innerHTML = dsm.models.lists.records[r][c];
                $('r'+r+'c'+c).title = dsm.models.lists.records[r][c];
            }
        }
    }
}
