class Vue {
    constructor() {
        this.dropdownMenus = document.querySelectorAll(".dropdown_button");
    }

    displayOptions(type, element, options, selectedTags) {
        element.innerHTML = "";

        selectedTags.forEach(tag => {
            element.insertAdjacentHTML(
                'beforeend',
                `<li class="controls-dd">
                    <button class="selected-item controls-dd" data-filter-type="${type}"><span class="controls-dd">${tag}</span><img class="controls-dd" src="./assets/icons/list-close.svg" alt="supprimer le tag"></button>
                </li>`
            );
            element.lastElementChild.addEventListener("click", (e) => {
                document.dispatchEvent(new CustomEvent('closeTag', {detail: {"type" : type, "term" : tag}}));
                e.target.closest(".dropdown").firstElementChild.classList.toggle("expanded");
            });
        })

        options.forEach((option) => {
            element.insertAdjacentHTML('beforeend', `<li class="controls-dd"><button class="dropdown-item controls-dd" data-filter-type="${type}">${option}</button></li>`)
            element.lastElementChild.addEventListener("click", (e) => {
                e.target.closest("ul").previousElementSibling.previousElementSibling.classList.toggle("expanded");
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
            const htmlCode = `<span class="badge col-2" data-filter-type="${tags[i].type}"><span>${tags[i].name}</span> <img src="./assets/icons/close-black.svg" alt="fermer"></span>`
            tagsSection.insertAdjacentHTML('beforeend', htmlCode);
            tagsSection.lastElementChild.lastElementChild.addEventListener("click", () => {
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