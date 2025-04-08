

function searchByText(searchTerm) {
    const regex = ".*(" + searchTerm + ").*";
    let tempResults = [];

    this.allRecipes.forEach(recipe => {
        let nestedIngredientsResult = false;

        recipe.ingredients.forEach((element) => {
            element.ingredient.search(regex) >= 0 ? nestedIngredientsResult = true : false;
        })

        if (
            nestedIngredientsResult ||
            recipe.name.search(regex) >= 0 ||
            recipe.description.search(regex) >= 0
        ){
            tempResults.push(recipe);
        }
    })

    this.displayedRecipes = [...tempResults];

    return this.displayedRecipes;
}

for (let i = 0; i < searchTerms.length; i++){
    console.log(searchTerms[i], searchByText(searchTerms[i]));
}
