class Model {
    constructor() {
        this.allRecipes = null;
        this.displayedRecipes = [];

        this.recipesFilteredByText = [];
        this.allTags = [];
        this.ingredientTags = [];
        this.applianceTags = [];
        this.ustensilTags = [];

        this.searchTerm = "";

        this.getAllRecipes();
        this.getAvailableOptions();
    }

    getAllRecipes() {
        if (this.allRecipes === null) {
            this.allRecipes = recipes;
        }

        this.displayedRecipes = [...this.allRecipes];
        this.recipesFilteredByText = [...this.allRecipes];

        return this.allRecipes;
    }

    getAvailableOptions(){
        const result = new Set();

        for (let i = 0; i < this.displayedRecipes.length; i++) {
            result.add(this.displayedRecipes[i].appliance);
        }
        return result;
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

        console.log("all tags : ", this.allTags);

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

        console.log("applianceTags = ",this.applianceTags);

        let tempResults = []

        for (let i = 0; i < recipes.length; i++) {
            let ing = false;
            let app = false;
            let ust = false;

            let testedRecipe = recipes[i];

            // pour les ingrédients, à refaire pour chacun ensuite
            // à transformer en fonctions
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

            // puis si les 3 sont true, l'entrée est ok
            if (app){
                tempResults.push(recipes[i]);
            }
        }

        // this.displayedRecipes = [...tempResults];
        return tempResults;
    }

    // searchByTag(){
    //     let tempResults = [];
    //
    //     for (let i = 0; i < this.displayedRecipes.length; i++) {
    //         if (this.displayedRecipes[i].appliance === appliance) {
    //             tempResults.push(this.displayedRecipes[i]);
    //         }
    //     }
    //
    //     this.displayedRecipes = [...tempResults];
    //
    //     return this.displayedRecipes;
    // }

    handleTags(action, type, term){
        switch (action) {
            case "add":
                this.allTags.push({"type":type, "name":term});
                console.log("adding tag : ", action, type, term);
                break;
            case "remove":
                this.allTags = this.allTags.filter((tag) => tag.name !== term);
                console.log("removing tag : ", action, type, term);
                break;
        }

        return 1
    }

    // tagSearch(appliance){
    //     let tempResults = [];
    //
    //     for (let i = 0; i < this.displayedRecipes.length; i++) {
    //         if (this.displayedRecipes[i].appliance === appliance) {
    //             tempResults.push(this.displayedRecipes[i]);
    //         }
    //     }
    //
    //     this.displayedRecipes = [...tempResults];
    //
    //     return this.displayedRecipes;
    // }

    searchDataPipeline(textSearch = this.searchTerm) {

        console.log("###################DATA PIPELINE START##########################")

        const allRecipes = this.allRecipes;
        let results = [];

        //je lance ma recherche texte avec mon textSearch
        if (textSearch.length > 0){
            this.searchTerm = textSearch;
            results = this.getSuggestions(this.searchTerm);
            console.log("TEXTSEARCH : je lance une recherche texte - le résultat est : ", results);
        } else {
            this.searchTerm = "";
            results = this.allRecipes;
            console.log("TEXTSEARCH : je retourne le tableau complet - le résultat est : ", results);
        }

        //j'ai un tableau results qui contient le résultat de ma recherche ou non recherche
        //je lance ma recherche tags
        console.log(this.searchByTag(results)); //ok
        results = this.searchByTag(results);




        console.log("###################DATA PIPELINE END##########################")

        return results;
    }
}