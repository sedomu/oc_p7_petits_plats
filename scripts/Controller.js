class Controller{

    initApp(model, vue, searchBar){
        vue.displayCards(model.getAllRecipes())
        vue.displayAppliancesOptions(model.getAvailableOptions())

        searchBar.domSearchInput.addEventListener("searching", () => {
            console.log("je récupère l'event au niveau du controller");
            console.log("avec les données de sugg:", searchBar.suggestions);
            vue.displayCards(searchBar.suggestions);
        });
    }
}