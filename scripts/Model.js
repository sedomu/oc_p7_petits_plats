class Model {
    constructor() {
        this.allRecipes = null;

        this.getAllRecipes();
        this.getAvailableOptions();
    }

    getAllRecipes() {
        if (this.allRecipes === null) {
            this.allRecipes = recipes;
        }
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

}