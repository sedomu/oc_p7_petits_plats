class Controller{

    initApp(model, vue, searchBar){
        // affichage des 50 recettes de base = initialisation de l'application
        vue.displayCards(model.searchDataPipeline());

        // event listeners

        // fermer tous les dropdowns
        document.addEventListener("click", (e) => {
            if (!e.target.classList.contains("controls-dd")){
                const dropdownMenus = document.querySelectorAll(".dropdown_button.expanded");
                dropdownMenus.forEach(dropdown => {dropdown.classList.toggle("expanded");});
            }
        })


        // dans la barre de recherche, j'ai 3 caractères+
        searchBar.domSearchInput.addEventListener("searchTermComplete", () => {
            vue.displayCards(model.searchDataPipeline(searchBar.searchTerm), searchBar.searchTerm);
        })

        searchBar.domSearchInput.addEventListener("searchTermTooShort", () => {
            vue.displayCards(model.searchDataPipeline(""),"");
        })

        document.querySelector(".ingredients-dropdown-button").addEventListener("click", () => {
            const ingredientsDropdown = document.querySelector('.ingredients-options');
            vue.displayOptions("ingredient", ingredientsDropdown, model.getAvailableOptions("ingredients"), model.ingredientTags);
        })

        document.querySelector(".appliances-dropdown-button").addEventListener("click", () => {
            const appliancesDropdown = document.querySelector('.appliances-options');
            vue.displayOptions("appliance", appliancesDropdown, model.getAvailableOptions("appliances"), model.applianceTags);
        })

        document.querySelector(".ustensils-dropdown-button").addEventListener("click", () => {
            const ustensilsDropdown = document.querySelector('.ustensils-options');
            vue.displayOptions("ustensil", ustensilsDropdown, model.getAvailableOptions("ustensils"), model.ustensilTags);
        })

        let dropdown = document.querySelectorAll('button.dropdown_button');

        dropdown.forEach((d) => {
            d.addEventListener('click', (e) => {
                e.preventDefault();
                e.target.closest('button').classList.toggle('expanded');
            });
        })

        document.addEventListener("useDropdown", (e) => {
            model.handleTags("add", e.detail.type, e.detail.term);
            vue.displayCards(model.searchDataPipeline());
            vue.displayTags(model.allTags);
        })

        document.addEventListener("closeTag", (e) => {
            model.handleTags("remove", e.detail.type, e.detail.term)
            vue.displayCards(model.searchDataPipeline());
            vue.displayTags(model.allTags);
        });
    }
}