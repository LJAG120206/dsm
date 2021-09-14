dsm.views.forms =
{
    title: "",
    records: [],


    openForm: () =>
    {
        console.log("dsm.views.forms.openForm();");
        this.records = dsm.models.forms.records;

        dsm.views.overlay.start();

        document.body.setAttribute("onresize","dsm.views.forms.resize();");

        let formWindowId = "formWindow";
        createElement("body","form",formWindowId);

        createElement(formWindowId,"div","formWindowTitle");
        $("formWindowTitle").innerHTML = dsm.views.forms.title;
        createElement(formWindowId,"div","formWindowMain");
        createElement('formWindowMain','div','formContent');
        createElement(formWindowId,"div","formWindowCmd");
        createElement('formWindowCmd','button','Enregistrer');
        $('Enregistrer').innerHTML = "Enregistrer";
        createElement('formWindowCmd','button','Fermer');
        $('Fermer').innerHTML = "Fermer";
        $('Fermer').onclick = function(){
            dsm.views.overlay.stop();
            $('formWindow').remove();
         }
        createElement('formWindowCmd','button','Supprimer');
        $('Supprimer').innerHTML = "Supprimer";


        for(let i=1; i<this.records[0].length ; i++ )
        {
            let comment = this.records[0][i].split("_");
            let fieldName = comment[0];
            let type = comment[1];
            let value = this.records[1][i];

            switch (type)
            {
                case "S":
                dsm.views.forms.createSelect(fieldName, value);
                break;
                case "TA":
                dsm.views.forms.createTextArea(fieldName, value);
                break;
                default:
                dsm.views.forms.createInput(fieldName, value);
                break;
            }
        }

        dsm.views.forms.resize();
                
    },

    resize:()=>
    {
        let maxH = window.innerHeight -40 -30 -40;
        let formH = parseInt ($("formContent").getBoundingClientRect().height) +30 +40 +10;
        console.log($("formContent").getBoundingClientRect().height);
        let marge = maxH - formH;

        console.log("maxH : "+maxH+" , formH : "+formH+" , marge : "+marge);

        if(marge >= 0)
        {
            console.log("test du form 1");
            $("formWindow").style.top = ((marge / 2) + 70) + 'px';
            $("formWindow").style.bottom = ((marge / 2) + 40) + 'px';
        }
        else
        {
            console.log("test du form 2");

            $("formWindow").style.top = '71px';
            $("formWindow").style.bottom = '41px';
        }
    },

    fill:()=>
    {
        console.log('dsm.views.forms.fill()');
    },

    createInput: (fieldName, value) =>
    {
        console.log("dsm.views.forms.createInput();");

        createElement("formContent","div","div"+fieldName);
        createElement("div"+fieldName,"input","input"+fieldName);
        $("input"+fieldName).setAttribute("value", value);
        createElement("div"+fieldName,"label","label"+fieldName);
        $("input"+fieldName).setAttribute("placeholder", fieldName);
        $("label"+fieldName).innerHTML = fieldName;
    },

    createSelect: (fieldName, value) =>
    {
        console.log(fieldName);

        createElement("formContent","div","div"+fieldName);
        createElement("div"+fieldName,"select","input"+fieldName);

        createElement("div"+fieldName,"label","label"+fieldName);
        $("label"+fieldName).innerHTML = fieldName;
        dsm.controlers.forms.fillSelect(fieldName, value);
    },

    fillSelect:(options,fieldName, value)=>
    {
        console.log("dsm.views.forms.fillSelect();");
        // faire un forEach pour créer les options du select,
        options.forEach(option => 
        {
            createElement("input"+fieldName,"option","option"+option[0]);   
            $("option"+option[0]).value = option[0];
            $("option"+option[0]).innerHTML = option[1];
            if(option[0] == value)
            {
                $("option"+option[0]).setAttribute("selected",true);
            }
        });
    },

    createTextArea: (fieldName, value) =>
    {
        console.log(fieldName);

        createElement("formContent","div","div"+fieldName);
        createElement("div"+fieldName,"textArea","input"+fieldName);
        createElement("div"+fieldName,"label","label"+fieldName);
        $("input"+fieldName).innerHTML = value;
        $("label"+fieldName).innerHTML = fieldName;
    }

    // createRadio: (fieldName, values )=>
    // {
    //     //créer les boutons à cliquer pour selectioner le sexe 
    //     createElement("form","div","div"+fieldName);
    //     createElement("div"+fieldName,"p","p"+fieldName);
    //     $("p"+fieldName).innerHTML = fieldName+" : ";

    //     for(let v in values)
    //     {
    //         createElement("div"+fieldName, "input", "input"+values[v]);
    //         $("input"+values[v]).setAttribute("type","radio");
    //         $("input"+values[v]).setAttribute("value", v);
    //         $("input"+values[v]).innerHTML = values[v];
    //         $("input"+values[v]).setAttribute("name", fieldName.toLowerCase());
    //         createElement("div"+fieldName, "label", values[v]);
    //         $(values[v]).setAttribute("for", v);
    //         $(values[v]).innerHTML = values[v];
    //     }
    // }  
}