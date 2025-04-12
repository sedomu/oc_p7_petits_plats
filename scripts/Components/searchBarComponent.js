class SearchBar{
    constructor(){
        this.domSearchInput = document.querySelector(".search-bar__input");
        this.domSearchInput.addEventListener("keyup", e => {this.handleSearch(e.target.value)});

        this.searchTermDeleteButton = document.querySelector(".search-bar__delete-button");
        this.searchTermDeleteButton.addEventListener("click", () => {
            this.domSearchInput.value = "";
            this.handleSearch("");
        })

        this.searchTerm = null;
    }

    handleSearch(searchTerm) {
        this.searchTerm = escapeInput(searchTerm.toLowerCase());
        this.searchTermDeleteButton.style.display = "flex";

        if (searchTerm.length > 2) {
            this.domSearchInput.dispatchEvent(new CustomEvent("searchTermComplete", {}));
        } else {
            this.domSearchInput.dispatchEvent(new CustomEvent("searchTermTooShort", {}));
            if (searchTerm.length === 0){
                this.searchTermDeleteButton.style.display = "none";
            }
        }
    }
}