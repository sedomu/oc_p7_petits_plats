function textSearchConditions(recipe, searchTerm) {
    const regex = ".*(" + searchTerm + ").*";

    let nestedIngredientsResult = false;

    recipe.ingredients.forEach((element) => {
        element.ingredient.search(regex) >= 0 ? nestedIngredientsResult = true : false;
    })

    return nestedIngredientsResult ||
        recipe.name.search(regex) >= 0 ||
        recipe.description.search(regex) >= 0;
}

function searchByText(searchTerm) {
    let tempResults = this.allRecipes.filter(recipe => textSearchConditions(recipe, searchTerm));

    this.displayedRecipes = [...tempResults];

    return this.displayedRecipes;
}

for (let i = 0; i < searchTerms.length; i++){
    console.log(searchTerms[i], searchByText(searchTerms[i]));
}