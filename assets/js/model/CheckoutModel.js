import { checkoutFields, selectData } from "../data/data.js"; // ✅ Add selectData

export class CheckoutModel {
    constructor() {
        console.log("📦 Retrieved selections from storage:", this.selections);
        this.selections = JSON.parse(localStorage.getItem("bowlSelections")) || {};
        this.prices = {
            wet: 3.99,
            dry: 2.99,
            chicken: 1.99,
            salmon: 2.49,
            driedAnchovy: 1.49,
            quailEggYolks: 2.29
        };
    }

    getLabelForValue(value) {
        for (let category in selectData) {
            let option = selectData[category].find(option => option.value === value);
            if (option) return option.label;
        }
        return value; // Default: return the value if no label is found
    }

    /**
     * ✅ Convert all selections to labels before displaying them in checkout
     */
    getSelectionsWithLabels() {
        let labeledSelections = {};
        Object.keys(this.selections).forEach(key => {
            labeledSelections[key] = this.getLabelForValue(this.selections[key]); // Convert value to label
        });
        console.log("🔍 Converted selections to labels:", labeledSelections);
        return labeledSelections;
    }

    calculateTotal() {
        return Object.values(this.selections)
            .filter(item => item !== "undefined")
            .reduce((total, item) => total + (this.prices[item] || 0), 0)
            .toFixed(2);
    }

    getCheckoutFields() {
        return checkoutFields;
    }

    // ✅ Store checkout data
    storeCheckoutData(data) {
        localStorage.setItem("checkoutData", JSON.stringify(data));
    }
    validateNotEmpty(value) {
        return value.trim() !== "";
    }

    validateEmail(value) {
        return value.includes("@") && value.includes(".");
    }

    validatePhone(value) {
        const phonePattern = /^\d{3}-\d{4}$/;
        return phonePattern.test(value);
    }

    validateCreditCard(value) {
        const cardPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        return cardPattern.test(value);
    }

    // ✅ Perform all validations and return error messages (if any)
    validateCheckoutData(data) {
        const errors = {};

        if (!this.validateNotEmpty(data.name)) errors.name = "This field is required.";
        if (!this.validateEmail(data.email)) errors.email = "Enter a valid email (e.g., user@example.com).";
        if (!this.validatePhone(data.phone)) errors.phone = "Format: 123-4567.";
        if (!this.validateNotEmpty(data.address)) errors.address = "This field is required.";
        if (!this.validateCreditCard(data.creditCard)) errors.creditCard = "Format: XXXX-XXXX-XXXX-XXXX.";

        return errors; // Return an object with validation errors (if any)
    }
}