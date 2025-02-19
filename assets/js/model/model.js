import { selectData } from "../data/data.js";

export class ImageModel {
    constructor() {
        this.options = selectData;
        console.log("ImageModel initialized");

        let properties = Object.keys(this.options);
        properties.forEach((property) => {
            this[property] = "undefined"; // Default value
        });
    }

    getProperties() {
        return Object.keys(this.options);
    }

    getValues() {
        return Object.values(this).filter(value => value !== "undefined");
    }

    getOptions(category) {
        return this.options[category] || [];
    }
}