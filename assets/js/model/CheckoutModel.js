import { checkoutFields } from "../data/data.js";

export class CheckoutModel {
    constructor() {
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

    getSelections() {
        return this.selections;
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
}