class SearchBar{
    constructor(){
        this.domSearchInput = document.querySelector(".search-bar__input");
        this.domSearchInput.placeholder = "javascript test";

        this.domSearchInput.addEventListener("keyup", e => {this.handleSearch(e.target.value)});


        this.recipesFiltered = recipes;

        this.customEvent = new CustomEvent("searching", { detail: "tmplate"})

        this.suggestions = [];
        // this.domSearchInput.addEventListener("searching", (e) => {
        //
        // });
    }

    suggestionHtml(suggestion){
        return `
            <button class="btn text-start" type="button">
                    ${suggestion.name}
               </button>
        `
    }

    displaySuggestions(suggestions){
        const domSuggestions = document.querySelector(".search-bar__suggestions");

        domSuggestions.innerHTML = "";

        const limit = Math.min(suggestions.length,6);

        for (let i = 0; i < limit; i++){
            domSuggestions.innerHTML += this.suggestionHtml(suggestions[i]);
        }

    }

    getSubArray(searchTerm){
        const regex = ".*(" + searchTerm + ").*";
        let results = [];

        for (let i = 0; i < this.recipesFiltered.length; i++) {
            let res = false;
            for (let j = 0; j < this.recipesFiltered[i].ingredients.length; j++) {
                if (this.recipesFiltered[i].ingredients[j].ingredient.search(regex) >= 0) {
                    res = true;
                }
            }

            if (
                res ||
                this.recipesFiltered[i].name.search(regex) >= 0 ||
                this.recipesFiltered[i].description.search(regex) >= 0
            ){
                results.push(this.recipesFiltered[i]);
            }
        }

        return results;
    }

    handleSearch(searchTerm) {

        if (searchTerm.length > 2) {
            this.suggestions = this.getSubArray(searchTerm);
            this.displaySuggestions(this.suggestions);
        } else {
            // let suggestions = []
            this.suggestions[0] = {name: "Entrez minimum 3 caractères"};
            this.displaySuggestions(this.suggestions);
        }

        console.log("je lance l'event");
        this.domSearchInput.dispatchEvent(this.customEvent);


    }
}