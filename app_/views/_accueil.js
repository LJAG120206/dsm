dsm.views.accueil = {
    openForm: () =>
    {
        console.log("dsm.views.accueil.openForm();");
        $('main').innerHTML = "accueil";
        $('footer').innerHTML = "";
        $('title').innerHTML = "DANCE SCHOOL MANAGER";
    }
}