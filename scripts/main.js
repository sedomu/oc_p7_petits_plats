function main() {
    const model = new Model;
    const vue = new Vue();
    const controller = new Controller;

    const searchBar = new SearchBar();

    controller.initApp(model, vue, searchBar);


//     testing area
//     model.handleTags("add", "appliance", "oui");
//     model.handleTags("add", "appliance", "non");
//     model.handleTags("remove", "appliance", "oui");
}

main();