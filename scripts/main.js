function main() {
    const model = new Model;
    const vue = new Vue();
    const controller = new Controller;

    const searchBar = new SearchBar();

    controller.initApp(model, vue, searchBar);
}

main();