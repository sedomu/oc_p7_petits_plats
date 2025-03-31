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
            vue.displayCards(model.searchDataPipeline(""),"");
        })

        document.querySelector(".ingredients-dropdown-button").addEventListener("click", () => {
            const ingredientsDropdown = document.querySelector('.ingredients-options');
            vue.displayOptions("ingredient", ingredientsDropdown, model.getAvailableOptions("ingredients"));
        })

        document.querySelector(".appliances-dropdown-button").addEventListener("click", () => {
            const appliancesDropdown = document.querySelector('.appliances-options');
            vue.displayOptions("appliance", appliancesDropdown, model.getAvailableOptions("appliances"));
        })

        document.querySelector(".ustensils-dropdown-button").addEventListener("click", () => {
            const ustensilsDropdown = document.querySelector('.ustensils-options');
            vue.displayOptions("ustensil", ustensilsDropdown, model.getAvailableOptions("ustensils"));
        })

        document.addEventListener("useDropdown", (e) => {
            model.handleTags("add", e.explicitOriginalTarget.getAttribute("data-filter-type"), e.detail);
            vue.displayCards(model.searchDataPipeline());
            vue.displayTags(model.allTags);
        })

        document.addEventListener("closeTag", (e) => {
            model.handleTags("remove", e.explicitOriginalTarget.getAttribute("data-filter-type"), e.detail)
            vue.displayCards(model.searchDataPipeline());
            vue.displayTags(model.allTags);
        });
    }
}