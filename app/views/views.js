dsm.views =
{
    overlay: {},
    login: {},
    accueil: {},
    listes: {},
    forms: {}
}

dsm.views.overlay = 
{
    start: () =>
    {
        let div = document.createElement('div');
        div.id = 'overlay';
        document.body.appendChild(div);
    },

    stop: () =>
    {
        document.body.removeChild($('overlay'));
    }
}
