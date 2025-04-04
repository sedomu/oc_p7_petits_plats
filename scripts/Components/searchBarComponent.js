class SearchBar{
    constructor(){
        this.domSearchInput = document.querySelector(".search-bar__input");
        this.domSearchInput.addEventListener("keyup", e => {this.handleSearch(e.target.value)});

        this.searchTermDeleteButton = document.querySelector(".search-bar__delete-button");
        this.searchTermDeleteButton.addEventListener("click", () => {
            this.domSearchInput.value = "";
            this.handleSearch("");
        })

        this.searchTermCompleteEvent = new CustomEvent("searchTermComplete", {});
        this.searchTermTooShortEvent = new CustomEvent("searchTermTooShort", {});

        this.searchTerm = null;
    }

    handleSearch(searchTerm) {
        this.searchTerm = escapeInput(searchTerm.toLowerCase());
        console.log(this.searchTerm);
        this.searchTermDeleteButton.style.display = "flex";

        if (searchTerm.length > 2) {
            this.domSearchInput.dispatchEvent(this.searchTermCompleteEvent);
        } else {
            this.domSearchInput.dispatchEvent(this.searchTermTooShortEvent);
            if (searchTerm.length === 0){
                this.searchTermDeleteButton.style.display = "none";
            }
        }
    }
}