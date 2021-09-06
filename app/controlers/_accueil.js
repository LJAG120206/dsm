dsm.controlers.accueil =
{
    openForm: () =>
    {
        console.log("dsm.controlers.accueil.form();");

        dsm.controlers.session.check(dsm.views.accueil.openForm);
    }
}
