class Controller{

    initApp(model, vue, searchBar){
        vue.displayCards(model.getAllRecipes())

        searchBar.domSearchInput.addEventListener("searchTermComplete", (e) => {
            vue.displayCards(model.getSuggestions(e.target.value), e.target.value);
        })

        searchBar.domSearchInput.addEventListener("searchTermTooShort", () => {
            vue.displayCards(model.getAllRecipes())
        })

        document.querySelector(".appliances-dropdown-button").addEventListener("click", () => {
            const appliancesDropdown = document.querySelector('.appliances-options');
            vue.displayOptions(appliancesDropdown, model.getAvailableOptions());
        })


        document.addEventListener("useDropdown", (e) => {
            vue.displayCards(model.tagSearch(e.detail));
        })
    }
}