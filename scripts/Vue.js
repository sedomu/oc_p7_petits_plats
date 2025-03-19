class Vue {
    constructor() {
        this.displayCard(recipes[10])
    }

    createCard(recipe){
        return `
        <div class="card col-3 m-3 p-0" >
            <img src="../assets/images/${recipe.image}" class="card-img-top" alt="${recipe.name}">
            <div class="card-body">
                <h5 class="card-title">${recipe.name}</h5>
                <p class="card-text">${recipe.description}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `
    }

    displayCard(recipe){
        const dom = document.querySelector(".cards-container");
        dom.insertAdjacentHTML('afterbegin', this.createCard(recipe));
    }
}