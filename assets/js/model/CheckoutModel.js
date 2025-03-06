import { checkoutFields, selectData, prices } from "../data/data.js"; // Add selectData

export class CheckoutModel {
    constructor() {

        //retrieves user selections
        console.log("Retrieved selections from storage:", this.selections);
        this.selections = JSON.parse(localStorage.getItem("bowlSelections")) || {};

    }

    getLabelForValue(value) {
        for (let category in selectData) {
            let option = selectData[category].find(option => option.value === value);
            if (option) return option.label;
        }
        return value; // Default: return the value if no label is found
    }
    isCartEmpty() {
        return !this.selections || Object.keys(this.selections).length === 0;
    }

    /**
     * Convert all selections to labels before displaying them in checkout
     */
    getSelectionsWithLabels() {
        let labeledSelections = {}; //create map
        Object.keys(this.selections).forEach(key => { //mapping keys to labels
            labeledSelections[key] = this.getLabelForValue(this.selections[key]);
        });
        console.log("Converted selections to labels:", labeledSelections);
        return labeledSelections; //display labels to user, not values js will store
    }

    calculateTotal() {
        return Object.values(this.selections) // selections contains user choices in local storage
            .filter(item => item !== "undefined") //ensures no undefined values are included
            .reduce((total, item) => total + (prices[item] || 0), 0) 
            //reduce() iterates over the selection list and adds up the prices from the prices object
            // "|| 0" defaults to 0
            .toFixed(2); // rounds to two decimal places
            // returns String
    }

    getCheckoutFields() {
        return checkoutFields;
    }

    // Store checkout data
    storeCheckoutData(data) {
        localStorage.setItem("checkoutData", JSON.stringify(data)); //LOCAL STORAGE
    }
    validateNotEmpty(value) { // return true if no errors
        return value.trim() !== "";
    }

    validateEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    }

    validatePhone(value) {
        const phonePattern = /^\d{3}-\d{4}$/;
        return phonePattern.test(value);
    }

    validateCreditCard(value) {
        const cardPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        return cardPattern.test(value);
    }

    // Perform all validations and return error messages (if any)
    validateCheckoutData(data) {
        const errors = {}; // store errors in object
        //error message if not true
        if (!this.validateNotEmpty(data.name)) errors.name = "This field is required.";
        if (!this.validateEmail(data.email)) errors.email = "Enter a valid email (e.g., user@example.com).";
        if (!this.validatePhone(data.phone)) errors.phone = "Format: 123-4567.";
        if (!this.validateNotEmpty(data.address)) errors.address = "This field is required.";
        if (!this.validateCreditCard(data.creditCard)) errors.creditCard = "Format: XXXX-XXXX-XXXX-XXXX.";

        return errors; // Return an object with validation errors (if any)
    }
}