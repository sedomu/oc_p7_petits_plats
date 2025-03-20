class Controller{

    initApp(model, vue){
        vue.displayCards(model.getAllRecipes())
        vue.displayAppliancesOptions(model.getAvailableOptions())

    }
}