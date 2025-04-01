class Vue {
    constructor() {
        // this.useDropdown = new CustomEvent("useDropdown", {});

        this.appliancesDropdown = document.querySelector(".appliances-dropdown-button");
        // this.appliancesDropdown.addEventListener("click", (e) => {
        //     document.dispatchEvent(this.useDropdown);
        // })
    }

    displayOptions(type, element, options) {
        element.innerHTML = "";
        options.forEach((option) => {
            element.insertAdjacentHTML('beforeend', `<li><button class="dropdown-item" data-filter-type="${type}">${option}</button></li>`)
            element.lastElementChild.addEventListener("click", () => {
                // document.dispatchEvent(new CustomEvent('useDropdown', {detail: option}));
                document.dispatchEvent(new CustomEvent('useDropdown', {detail: {"type" : type, "term" : option}}));
            });
        })
    }

    /**
     * From 1 recipe object, constructs a BootStrap recipe's card
     * @param {object} recipe - A single object representing a recipe
     * @returns {string} - Code block of the recipe's card (html code only)
     */
    createCard(recipe){
        let ingredientsTemplate = "";
        recipe.ingredients.forEach(element => {
            ingredientsTemplate += `<div class="ingredient">
                    <div class="ingredient_name">${element.ingredient}</div>
                    <div class="ingredient_quantity">${element.quantity?element.quantity:"-"} ${element.unit?element.unit:""} </div>
                </div>`
        })

        return `
        <div class="card col-3 m-3 p-0 recipe-card" >
            <img src="./assets/images/${recipe.image}" class="card-img-top" alt="${recipe.name}">
            <span class="time-pill">${recipe.time} min</span>
            <div class="card-body">
                <h2 class="card-title">${recipe.name}</h2>
                <h3>RECETTE</h3>
                <div class="card-text-container"><p class="card-text">${recipe.description}</p></div>
                <h3>INGRÉDIENTS</h3>
                <div class="ingredients_container">
                    ${ingredientsTemplate}
                </div>
            </div>
        </div>
        `
    }

    /**
     * Inserts 1 card in a specified DOM Element
     * @param {object} recipe - A single object representing a recipe
     * @param {Element} domElement - DOM Element where the card has to be inserted
     * @returns {void}
     */
    displaySingleCard(recipe, domElement){
        domElement.insertAdjacentHTML('afterbegin', this.createCard(recipe));
    }

    displayNoRecipe(searchTerm, domElement){
        domElement.insertAdjacentHTML('afterbegin', `<p>Aucune recette ne contient ${searchTerm} vous pouvez rechercher "tarte aux pommes", "poisson', etc.</p>`);
    }

    /**
     * Updates the recipes' counter on the page
     * @param {number} n - number of recipes to be displayed
     * @returns {void}
     */
    updateCounter(n){
        document.querySelector(".recipes-counter").innerText = `${n} recettes`;
    }

    displayTags(tags){
        const tagsSection = document.querySelector(".tags-section");
        tagsSection.innerHTML = "";

        for (let i = 0; i < tags.length; i++) {
            const htmlCode = `<span class="badge text-bg-primary col-2" data-filter-type="${tags[i].type}">${tags[i].name} X</span>`
            tagsSection.insertAdjacentHTML('beforeend', htmlCode);
            tagsSection.lastElementChild.addEventListener("click", () => {
               document.dispatchEvent(new CustomEvent('closeTag', {detail: {"type" : tags[i].type, "term" : tags[i].name}}));
            })
        }
    }

    /**
     * Displays the content of the recipes' page (cards and counter)
     * @param {array[Object]} recipes - list of recipes to be displayed
     * @param searchTerm
     */
    displayCards(recipes, searchTerm = null){
        this.updateCounter(recipes.length);
        const domElement = document.querySelector(".cards-container");
        domElement.innerHTML = "";

        if (recipes.length === 0){
            this.displayNoRecipe(searchTerm, domElement);
        } else {
            recipes.forEach(recipe => {this.displaySingleCard(recipe, domElement)});
        }
    }
}