/**
 * App's entry: launches controller.initApp (app loop) with dependency injection
 */

function main() {
    const model = new Model;
    const vue = new Vue();
    const searchBar = new SearchBar();

    const controller = new Controller;

    controller.initApp(model, vue, searchBar);
}

main();