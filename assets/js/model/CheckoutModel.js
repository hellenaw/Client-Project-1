import { checkoutFields, selectData, prices } from "../data/data.js";

/**
 * Represents the model for handling checkout operations including selection data, validation, and calculation.
 * @class CheckoutModel
 */
export class CheckoutModel {
    /**
     * Initializes the model and retrieves user selections from localStorage.
     * @constructor
     */
    constructor() {
        /**
         * @type {Object} selections - User selections stored in localStorage.
         */
        console.log("Retrieved selections from storage:", this.selections);
        this.selections = JSON.parse(localStorage.getItem("bowlSelections")) || {};
    }

    /**
     * Retrieves the label for a given value.
     * @param {string} value - The value for which to retrieve the label.
     * @returns {string} - The corresponding label for the value or the value itself if no label is found.
     */
    getLabelForValue(value) {
        for (let category in selectData) {
            let option = selectData[category].find(option => option.value === value);
            if (option) return option.label;
        }
        return value;
    }

    /**
     * Checks whether the cart is empty.
     * @returns {boolean} - True if the cart is empty, otherwise false.
     */
    isCartEmpty() {
        return !this.selections || Object.keys(this.selections).length === 0;
    }

    /**
     * Converts all selections to labels before displaying them in the checkout view.
     * @returns {Object} - A map of selections with labels instead of values.
     */
    getSelectionsWithLabels() {
        let labeledSelections = {};
        Object.keys(this.selections).forEach(key => {
            labeledSelections[key] = this.getLabelForValue(this.selections[key]);
        });
        console.log("Converted selections to labels:", labeledSelections);
        return labeledSelections;
    }

    /**
     * Calculates the total price of the items in the cart.
     * @returns {string} - The total price of the cart formatted to two decimal places.
     */
    calculateTotal() {
        return Object.values(this.selections)
            .filter(item => item !== "undefined")
            .reduce((total, item) => total + (prices[item] || 0), 0)
            .toFixed(2);
    }

    /**
     * Retrieves the fields to be used for checkout form.
     * @returns {Array} - The checkout fields configuration.
     */
    getCheckoutFields() {
        return checkoutFields;
    }

    /**
     * Stores the checkout data in localStorage.
     * @param {Object} data - The data to be stored in localStorage.
     */
    storeCheckoutData(data) {
        localStorage.setItem("checkoutData", JSON.stringify(data));
    }

    /**
     * Validates that a field is not empty.
     * @param {string} value - The value to check.
     * @returns {boolean} - True if the value is not empty, otherwise false.
     */
    validateNotEmpty(value) {
        return value.trim() !== "";
    }

    /**
     * Validates an email address using a regular expression.
     * @param {string} value - The email address to validate.
     * @returns {boolean} - True if the email is valid, otherwise false.
     */
    validateEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    }

    /**
     * Validates a phone number using a regular expression.
     * @param {string} value - The phone number to validate.
     * @returns {boolean} - True if the phone number matches the pattern, otherwise false.
     */
    validatePhone(value) {
        const phonePattern = /^\d{3}-\d{4}$/;
        return phonePattern.test(value);
    }

    /**
     * Validates a credit card number using a regular expression.
     * @param {string} value - The credit card number to validate.
     * @returns {boolean} - True if the credit card number matches the pattern, otherwise false.
     */
    validateCreditCard(value) {
        const cardPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        return cardPattern.test(value);
    }

    /**
     * Performs all the validations for checkout data and returns any error messages.
     * @param {Object} data - The checkout data to validate.
     * @returns {Object} - An object containing validation errors for the form fields.
     */
    validateCheckoutData(data) {
        const errors = {};

        if (!this.validateNotEmpty(data.name)) errors.name = "This field is required.";
        if (!this.validateEmail(data.email)) errors.email = "Enter a valid email (e.g., user@example.com).";
        if (!this.validatePhone(data.phone)) errors.phone = "Format: 123-4567.";
        if (!this.validateNotEmpty(data.address)) errors.address = "This field is required.";
        if (!this.validateCreditCard(data.creditCard)) errors.creditCard = "Format: XXXX-XXXX-XXXX-XXXX.";

        return errors;
    }
}