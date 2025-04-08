class Model {
    constructor() {
        this.allRecipes = null;
        this.displayedRecipes = [];

        this.allTags = [];
        this.ingredientTags = [];
        this.applianceTags = [];
        this.ustensilTags = [];

        this.searchTerm = "";

        this.getAllRecipes();
        this.getAvailableOptions();
    }

    formatTag(tag){
        return tag[0].toUpperCase() + tag.substring(1).toLowerCase();
    }

    getAllRecipes() {
        if (this.allRecipes === null) {
            this.allRecipes = recipes;
        }

        this.allRecipes.forEach(recipe => {
            recipe.ingredients.forEach(element => {
                element.ingredient = this.formatTag(element.ingredient);
            })

            recipe.ustensils.forEach((element, index, array) => {
                array[index] = this.formatTag(element);
            });
        })

        this.displayedRecipes = [...this.allRecipes];
    }

    getAvailableOptions(type, searchTerm = ""){
        const result = new Set();

        switch (type) {
            case "ingredients":
                for (let i = 0; i < this.displayedRecipes.length; i++) {
                    for (let j = 0; j < this.displayedRecipes[i].ingredients.length; j++) {
                        result.add(this.displayedRecipes[i].ingredients[j].ingredient);
                    }
                }

                for (let i = 0; i < this.ingredientTags.length; i++) {
                    if (result.has(this.ingredientTags[i])) {
                        result.delete(this.ingredientTags[i]);
                    }
                }
                break;
            case "appliances":
                for (let i = 0; i < this.displayedRecipes.length; i++) {
                    result.add(this.displayedRecipes[i].appliance);
                }

                for (let i = 0; i < this.applianceTags.length; i++) {
                    if (result.has(this.applianceTags[i])) {
                        result.delete(this.applianceTags[i]);
                    }
                }
                break;
            case "ustensils":
                for (let i = 0; i < this.displayedRecipes.length; i++) {
                    for (let j = 0; j < this.displayedRecipes[i].ustensils.length; j++) {
                        result.add(this.displayedRecipes[i].ustensils[j]);
                    }
                }
                for (let i = 0; i < this.ustensilTags.length; i++) {
                    if (result.has(this.ustensilTags[i])) {
                        result.delete(this.ustensilTags[i]);
                    }
                }
                break;
        }

        const regex = ".*(" + searchTerm + ").*";

        let filteredArray = [];
        result.values().forEach(element => {
            if (element.toLowerCase().search(regex) >= 0){
                filteredArray.push(element);
            }
        })

        return filteredArray;
    }

    textSearchConditions(recipe, searchTerm) {
        const regex = ".*(" + searchTerm + ").*";

        let nestedIngredientsResult = false;

        recipe.ingredients.forEach((element) => {
            console.log(element.ingredient, searchTerm, element.ingredient.search(regex))
            element.ingredient.search(regex) >= 0 ? nestedIngredientsResult = true : false;
        })

        return nestedIngredientsResult ||
            recipe.name.search(regex) >= 0 ||
            recipe.description.search(regex) >= 0;
    }

    searchByText(searchTerm) {
        let tempResults = this.allRecipes.filter(recipe => this.textSearchConditions(recipe, searchTerm));

        this.displayedRecipes = [...tempResults];

        return this.displayedRecipes;
    }

    searchByIngredient(testedRecipe){
        let testSuccessful = false;

        if (this.ingredientTags.length > 0){
            let res = 0;
            for (let j = 0; j < this.ingredientTags.length; j++) {
                for (let k = 0; k < testedRecipe.ingredients.length; k++) {
                    if (testedRecipe.ingredients[k].ingredient === this.ingredientTags[j]){
                        res += 1;
                    }
                }
            }
            if (res === this.ingredientTags.length){
                testSuccessful = true;
            }
        } else {
            testSuccessful = true;
        }

        return testSuccessful;
    }

    searchByAppliance(testedRecipe){
        let testSuccessful = false;

        if (this.applianceTags.length > 0){
            let res = 0;
            for (let j = 0; j < this.applianceTags.length; j++) {
                if (testedRecipe.appliance === this.applianceTags[j]){
                    res +=1;
                }
            }
            if (res === this.applianceTags.length){
                testSuccessful = true;
            }
        } else {
            testSuccessful = true;
        }

        return testSuccessful;
    }

    searchByUstensil(testedRecipe){
        let testSuccessful = false;

        if (this.ustensilTags.length > 0){
            let res = 0;
            for (let j = 0; j < this.ustensilTags.length; j++) {
                for (let k = 0; k < testedRecipe.ustensils.length; k++) {
                    if (testedRecipe.ustensils[k] === this.ustensilTags[j]){
                        res += 1;
                    }
                }
            }
            if (res === this.ustensilTags.length){
                testSuccessful = true;
            }
        } else {
            testSuccessful = true;
        }

        return testSuccessful;
    }

    searchByTag(recipes){
        this.ingredientTags = [];
        this.applianceTags = [];
        this.ustensilTags = [];

        for (let i = 0; i < this.allTags.length; i++) {
            switch (this.allTags[i].type){
                case "ingredient":
                    this.ingredientTags.push(this.allTags[i].name);
                    break;
                case "appliance":
                    this.applianceTags.push(this.allTags[i].name);
                    break;
                case "ustensil":
                    this.ustensilTags.push(this.allTags[i].name);
                    break;
            }
        }

        let tempResults = []

        for (let i = 0; i < recipes.length; i++) {
            let testedRecipe = recipes[i];

            if (
                this.searchByIngredient(testedRecipe) &&
                this.searchByAppliance(testedRecipe) &&
                this.searchByUstensil(testedRecipe)
            ) {
                tempResults.push(recipes[i]);
            }
        }

        this.displayedRecipes = [...tempResults];
        return tempResults;
    }

    handleTags(action, type, term){
        switch (action) {
            case "add":
                this.allTags.push({"type":type, "name":term});
                break;
            case "remove":
                this.allTags = this.allTags.filter((tag) => tag.name !== term);
                break;
        }
        return 1
    }

    searchDataPipeline(textSearch = this.searchTerm) {
        let results;

        if (textSearch.length > 0){
            this.searchTerm = textSearch;
            results = this.searchByText(this.searchTerm);
        } else {
            this.searchTerm = "";
            results = this.allRecipes;
        }

        results = this.searchByTag(results);

        return results;
    }
}