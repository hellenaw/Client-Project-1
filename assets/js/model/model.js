import { selectData } from "../data/data.js";

/**
 * Represents the data model for managing user selections and overlay images.
 */

export class ImageModel {
        /**
     * Initializes the model with available options and sets default values.
     */
    constructor() {
                /**
         * @property {Object} options - Contains selectable categories and their respective choices.
         */
        this.options = selectData;
        console.log("ImageModel initialized");
        /**
         * Dynamically initializes properties for each selectable category with a default value.
         */
        let properties = Object.keys(this.options);
        properties.forEach((property) => {
            this[property] = "undefined"; // Default value
        });
    }
    /**
     * Retrieves a user-friendly label for a given category.
     * @param {string} category - The category key (e.g., "foodType", "broth").
     * @returns {string} - The corresponding label or the original category if not found.
     */
    getCategoryLabel(category) {
        const categoryLabels = {
            foodType: "Food Type",
            broth: "Broth",
            foodFormula: "Food Formula"
        };
        return categoryLabels[category] || category; // Default to category if no match
    }
    /**
     * Retrieves the property names of selectable categories.
     * @returns {string[]} - An array of category keys.
     */
    getProperties() {
        return Object.keys(this.options);
    }
    /**
     * Retrieves the selected values of all categories, excluding undefined values.
     * @returns {string[]} - An array of selected option values.
     */
    getValues() {
        return Object.values(this).filter(value => value !== "undefined");
    }
    /**
     * Retrieves the available options for a given category.
     * @param {string} category - The category key.
     * @returns {Array<{value: string, label: string}>} - An array of selectable options.
     */
    getOptions(category) {
        return this.options[category] || [];
    }

        /**
     * Stores the current selections in local storage.
     */
    storeSelections() {
        localStorage.setItem("bowlSelections", JSON.stringify(this));
    }
    /**
     * Generates the file path for an overlay image based on the selection.
     * @param {string} selection - The selected option.
     * @returns {string} - The image file path.
     */
    getImagePath(selection) {
        return `assets/media/${selection}.png`;
    }
    /**
     * Loads saved selections from local storage and restores them to the model.
     */
    loadSelections() {
        let storedData = JSON.parse(localStorage.getItem("bowlSelections"));
        if (storedData) {
            Object.assign(this, storedData);
        }
    }
}
