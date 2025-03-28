class Controller{

    initApp(model, vue, searchBar){
        // affichage des 50 recettes de base = initialisation de l'application
        vue.displayCards(model.searchDataPipeline());

        // event listeners
        // dans la barre de recherche, j'ai 3 caractères+
        searchBar.domSearchInput.addEventListener("searchTermComplete", (e) => {
            vue.displayCards(model.searchDataPipeline(e.target.value), e.target.value);
        })

        searchBar.domSearchInput.addEventListener("searchTermTooShort", () => {
            vue.displayCards(model.getAllRecipes())
        })

        document.querySelector(".appliances-dropdown-button").addEventListener("click", () => {
            const appliancesDropdown = document.querySelector('.appliances-options');
            vue.displayOptions(appliancesDropdown, model.getAvailableOptions());
        })


        document.addEventListener("useDropdown", (e) => {
            console.log("j'ai utilisé le dropdown avec ", e.detail)
            // vue.displayCards(model.handleTags(e.detail));
            // vue.displayCards(model.handleTags("add", "appliance", e.detail))
            model.handleTags("add", "appliance", e.detail);
            vue.displayCards(model.searchDataPipeline());
        })
    }
}