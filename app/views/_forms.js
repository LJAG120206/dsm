dsm.views.forms =
{
    title: "",
    records: [],

    createForm: () =>
    {
        console.log("dsm.views.forms.createForm();");
        records = dsm.models.forms.records;

        $("main").innerHTML ="";
        createElement("main","form","form");
        
        let sexe = {"M": "Masculin", "F": "Féminin", "A": "Autres"};

        for(let i=1; i<records[0].length ; i++ )
        {
            
            if(records[0][i] != "Sexe")
            {
                dsm.views.forms.createInput(records[0][i], i);
            }
            else
            {
                dsm.views.forms.createRadio(records[0][i],sexe);
            }
        }

    },

    createInput: (fieldName, index) =>
    {
        console.log("dsm.views.forms.createInput();");

        createElement("form","div","div"+fieldName);
        createElement("div"+fieldName,"input","input"+fieldName);
        $("input"+fieldName).setAttribute("value", records[1][index]);
        createElement("div"+fieldName,"label","label"+fieldName);
        $("input"+fieldName).setAttribute("placeholder", fieldName);
        $("label"+fieldName).innerHTML = fieldName;
    },

    createRadio: (fieldName, values )=>
    {
        //créer les boutons à cliquer pour selectioner le sexe 
        createElement("form","div","div"+fieldName);
        createElement("div"+fieldName,"p","p"+fieldName);
        $("p"+fieldName).innerHTML = fieldName+" : ";

        for(let v in values)
        {
            createElement("div"+fieldName, "input", "input"+values[v]);
            $("input"+values[v]).setAttribute("type","radio");
            $("input"+values[v]).setAttribute("value", v);
            $("input"+values[v]).innerHTML = values[v];
            $("input"+values[v]).setAttribute("name", fieldName.toLowerCase());
            createElement("div"+fieldName, "label", values[v]);
            $(values[v]).setAttribute("for", v);
            $(values[v]).innerHTML = values[v];
        }
    }  
}