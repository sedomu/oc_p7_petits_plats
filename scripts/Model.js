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

        for (let i = 0; i < this.allRecipes.length; i++) {
            this.allRecipes[i].ingredients.forEach(elem => {
                elem.ingredient = this.formatTag(elem.ingredient);
            })
            this.allRecipes[i].ustensils.forEach((item, index, array) => {
                array[index] = this.formatTag(item);
            });
        }

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

        this.displayedRecipes = [...tempResults];

        return this.displayedRecipes;
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
            let ing = false;
            let app = false;
            let ust = false;

            let testedRecipe = recipes[i];

            // pour les ingrédients, à refaire pour chacun ensuite
            // à transformer en functions
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
                    ing = true;
                }
            } else {
                ing = true;
            }

            // pour les appliances, à refaire pour chacun ensuite
            // à transformer en functions
            if (this.applianceTags.length > 0){
                let res = 0;
                for (let j = 0; j < this.applianceTags.length; j++) {
                    if (testedRecipe.appliance === this.applianceTags[j]){
                        res +=1;
                    }
                }
                if (res === this.applianceTags.length){
                    app = true;
                }
            } else {
                app = true;
            }

            // pour les ustensils, à refaire pour chacun ensuite
            // à transformer en functions
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
                    ust = true;
                }
            } else {
                ust = true;
            }

            // puis si les 3 sont true, l'entrée est ok
            if (ing && app && ust){
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

        // console.log("↓↓↓↓ ###################DATA PIPELINE START##########################")

        let results;

        //je lance ma recherche texte avec mon textSearch
        if (textSearch.length > 0){
            this.searchTerm = textSearch;
            results = this.getSuggestions(this.searchTerm);
            // console.log("TEXTSEARCH : je lance une recherche texte - le résultat est : ", results);
        } else {
            this.searchTerm = "";
            results = this.allRecipes;
            // console.log("TEXTSEARCH : je retourne le tableau complet - le résultat est : ", results);
        }

        //j'ai un tableau results qui contient le résultat de ma recherche ou non recherche
        //je lance ma recherche tags
        // console.log(this.searchByTag(results)); //ok
        results = this.searchByTag(results);

        // console.log("↑↑↑↑ ###################DATA PIPELINE END##########################")

        return results;
    }
}