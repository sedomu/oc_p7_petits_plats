class Controller{
    closeAllDropdown(){
        document.addEventListener("click", (e) => {
            if (!e.target.classList.contains("controls-dd")){
                const dropdownMenus = document.querySelectorAll(".dropdown_button.expanded");
                dropdownMenus.forEach(dropdown => {dropdown.classList.toggle("expanded");});
            }
        })
    }

    initDropdownEventListeners(model, vue){
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
                const dropdownIsOpened = e.target.closest(".dropdown_button").classList.contains("expanded");

                vue.dropdownMenus.forEach(menu => {
                    menu.classList.remove("expanded");
                    menu.nextElementSibling.firstElementChild.value = "";
                });

                if (!dropdownIsOpened) {
                    e.target.closest('.dropdown_button').classList.add('expanded');
                }
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
            this.closeAllDropdown();
        });

        let ingredientSearch = document.querySelector(".ingredient-search-input");
        ingredientSearch.addEventListener("input", (e) => {
            const ingredientsDropdown = document.querySelector('.ingredients-options');
            vue.displayOptions("ingredient", ingredientsDropdown, model.getAvailableOptions("ingredients", escapeInput(e.target.value)), model.ingredientTags);
        })

        let applianceSearch = document.querySelector(".appliance-search-input");
        applianceSearch.addEventListener("input", (e) => {
            const appliancesDropdown = document.querySelector('.appliances-options');
            vue.displayOptions("appliance", appliancesDropdown, model.getAvailableOptions("appliances", escapeInput(e.target.value)), model.applianceTags);
        })


        let ustensilSearch = document.querySelector(".ustensil-search-input");
        ustensilSearch.addEventListener("input", (e) => {
            const ustensilsDropdown = document.querySelector('.ustensils-options');
            vue.displayOptions("ustensil", ustensilsDropdown, model.getAvailableOptions("ustensils", escapeInput(e.target.value)), model.ustensilTags);
        })
    }

    initEventListeners(model, vue, searchBar){
        searchBar.domSearchInput.addEventListener("searchTermComplete", () => {
            vue.displayCards(model.searchDataPipeline(searchBar.searchTerm), searchBar.searchTerm);
        })

        searchBar.domSearchInput.addEventListener("searchTermTooShort", () => {
            vue.displayCards(model.searchDataPipeline(""),"");
        })
    }

    initApp(model, vue, searchBar){
        vue.displayCards(model.searchDataPipeline());

        this.initEventListeners(model, vue, searchBar);
        this.closeAllDropdown();
        this.initDropdownEventListeners(model, vue);
    }
}