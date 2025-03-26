class Controller{

    initApp(model, vue, searchBar){
        vue.displayCards(model.getAllRecipes())
        vue.displayAppliancesOptions(model.getAvailableOptions())

        searchBar.domSearchInput.addEventListener("searchTermComplete", (e) => {
            vue.displayCards(model.getSuggestions(e.target.value), e.target.value);
        })

        searchBar.domSearchInput.addEventListener("searchTermTooShort", () => {
            vue.displayCards(model.getAllRecipes())
        })
    }
}