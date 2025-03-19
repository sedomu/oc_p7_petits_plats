class Model {
    constructor() {
        this.data = null;
    }

    getData() {
        if (this.data === null) {
            this.data = recipes;
        }
        return this.data;
    }

}