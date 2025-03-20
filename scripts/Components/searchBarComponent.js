class SearchBar{
    constructor(){
        this.domSearchInput = document.querySelector(".search-bar__input");
        this.domSearchInput.placeholder = "javascript test";

        this.domSearchInput.addEventListener("keyup", e => {this.handleSearch(e.target.value)});

        this.recipesFiltered = recipes;
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

        console.log(results);

    }

    handleSearch(searchTerm) {
        if (searchTerm.length > 2) {
            this.getSubArray(searchTerm);
        }
    }
}