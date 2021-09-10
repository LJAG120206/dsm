dsm.views.forms =
{
    title: "",
    records: [],

    openForm: () =>
    {
        console.log("dsm.views.forms.openForm();");
        this.records = dsm.models.forms.records;

        dsm.views.overlay.start();

        let formWindowId = "formWindow";
        createElement("body","form",formWindowId);
        
        createElement(formWindowId,"div","formWindowTitle");
        $("formWindowTitle").innerHTML = dsm.views.forms.title;
        createElement(formWindowId,"div","formWindowMain");
        console.log("Offset : "+$("formWindowMain").scrollHeight);
        $("formWindowMain").style.height = scrollHeight 
        createElement(formWindowId,"div","formWindowCmd");

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
    },

    fill:()=>
    {
        console.log('dsm.views.forms.fill()');
    },

    createInput: (fieldName, value) =>
    {
        console.log("dsm.views.forms.createInput();");

        createElement("formWindowMain","div","div"+fieldName);
        createElement("div"+fieldName,"input","input"+fieldName);
        $("input"+fieldName).setAttribute("value", value);
        createElement("div"+fieldName,"label","label"+fieldName);
        $("input"+fieldName).setAttribute("placeholder", fieldName);
        $("label"+fieldName).innerHTML = fieldName;
    },

    createSelect: (fieldName, value) =>
    {
        console.log(fieldName);

        createElement("formWindowMain","div","div"+fieldName);
        createElement("div"+fieldName,"select","input"+fieldName);
        createElement("div"+fieldName,"label","label"+fieldName);
        $("label"+fieldName).innerHTML = fieldName;
    },

    createTextArea: (fieldName, value) =>
    {
        console.log(fieldName);

        createElement("formWindowMain","div","div"+fieldName);
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