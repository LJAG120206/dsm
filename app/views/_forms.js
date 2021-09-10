dsm.views.forms =
{
    title: "",
    records: [],

    openForm: () =>
    {
        console.log("dsm.views.forms.openForm();");
        records = dsm.models.forms.records;

        dsm.views.overlay.start();

        let formWindowId = "formWindow";
        createElement("body","div",formWindowId);
        
        createElement(formWindowId,"div","formWindowTitle");
        $("formWindowTitle").innerHTML = dsm.views.forms.title;
        createElement(formWindowId,"div","formWindowMain");
        createElement(formWindowId,"div","formWindowCmd");

        for(let i=1; i<records[0].length ; i++ )
        {
            dsm.views.forms.createInput(records[0][i], i);
        }
    },

    fill:()=>
    {
        console.log('dsm.views.forms.fill()');
    },

    createInput: (fieldName, index) =>
    {
        console.log("dsm.views.forms.createInput();");

        createElement("formWindowMain","div","div"+fieldName);
        createElement("div"+fieldName,"input","input"+fieldName);
        $("input"+fieldName).setAttribute("value", records[1][index]);
        createElement("div"+fieldName,"label","label"+fieldName);
        $("input"+fieldName).setAttribute("placeholder", fieldName);
        $("label"+fieldName).innerHTML = fieldName;
    },

    createSelect:() =>
    {
        





    },

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