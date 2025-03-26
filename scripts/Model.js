class Model {
    constructor() {
        this.allRecipes = null;
        this.displayedRecipes = [];

        this.getAllRecipes();
        this.getAvailableOptions();
    }

    getAllRecipes() {
        if (this.allRecipes === null) {
            this.allRecipes = recipes;
        }

        this.displayedRecipes = this.allRecipes;
        return this.allRecipes;
    }

    getAvailableOptions(){
        const appliances = new Set();
        this.allRecipes.forEach((recipe) => {
            appliances.add(recipe.appliance);
        })

        let appliancesOptions = [];
        appliances.forEach(appliance => {
            appliancesOptions.push(appliance);
        })
        appliancesOptions.sort((a, b) => a.localeCompare(b));
        return appliancesOptions;
    }

    getSuggestions(searchTerm) {
        const regex = ".*(" + searchTerm + ").*";
        let tempResults = [];

        for (let i = 0; i < this.allRecipes.length; i++) {
            let res = false;
            for (let j = 0; j < this.allRecipes[i].ingredients.length; j++) {
                if (this.allRecipes[i].ingredients[j].ingredient.search(regex) >= 0) {
                    res = true;
                }
            }
            if (
                res ||
                this.allRecipes[i].name.search(regex) >= 0 ||
                this.allRecipes[i].description.search(regex) >= 0
            ){
                tempResults.push(this.allRecipes[i]);
            }
        }

        this.displayedRecipes = tempResults;

        return this.displayedRecipes;
    }
}