import { selectData } from "./data/data.js";
/**
 * Represents the data model for managing overlay images and selection options.
 */

export class ImageModel {
      /**
     * Initializes the model with overlay image paths and selection options.
     * Loads predefined options from an external data source.
     */
    constructor() {
              /**
         * Object mapping food selections to corresponding overlay image paths.
         * @type {Object.<string, string>}
         */
        this.overlays = {
            wet: 'assets/media/food-wet.png',
            dry: 'assets/media/food-dry.png',
            chicken: 'assets/media/broth2.png',
            salmon: 'assets/media/broth1.png',
            driedAnchovy: 'assets/media/dry-anchovy.png',
            quailEggYolks: 'assets/media/dry-egg.png'
        };
                /**
         * Object containing selectable options for food categories.
         * Populated from an external data source.
         * @type {Object.<string, Array<{value: string, label: string}>>}
         */

        this.options = selectData;

        let properties = Object.keys(this.options);
        properties.forEach((property) => {
            this[property] = "undefined";
        });
    }
    /**
     * Retrieves the available selection categories.
     * @returns {string[]} An array of selection category names.
     */
    getProperties() {
        return Object.keys(this.options);
    }
    /**
     * Retrieves the currently selected values.
     * @returns {string[]} An array of selected values, excluding undefined ones.
     */
    getValues() {
        return Object.values(this).filter(value => value !== "undefined");
    }
    /**
     * Retrieves available options for a given category.
     * @param {string} category - The category name (e.g., "foodType").
     * @returns {Array<{value: string, label: string}>} An array of selectable options.
     */
    getOptions(category) {
        return this.options[category] || [];
    }
    /**
     * Retrieves overlay image paths based on user selections.
     * @param {string[]} selections - An array of selected food options.
     * @returns {string[]} An array of image paths corresponding to the selections.
     */
    getOverlays(selections) {
        return selections.map(selection => this.overlays[selection]).filter(src => src);
    }
}