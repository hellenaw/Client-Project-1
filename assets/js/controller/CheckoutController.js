import { CheckoutModel } from "../model/CheckoutModel.js";
import { CheckoutView } from "../view/CheckoutView.js";

export class CheckoutController {
    constructor() {
        this.model = new CheckoutModel();
        this.view = new CheckoutView();
        console.log("CheckoutController initialized");

        // Render checkout details
        this.view.renderCheckout(this.model.getSelections(), this.model.calculateTotal());
        this.attachValidationListeners(); // ✅ Attach validation after form renders
    }

    /**
     * Attaches validation event listeners after the form is dynamically created.
     */
    attachValidationListeners() {
        setTimeout(() => { // Ensure DOM elements exist
            console.log("✅ Attaching validation listeners...");

            document.getElementById("phone").addEventListener("input", () => this.validatePhone());
            document.getElementById("credit-card").addEventListener("input", () => this.validateCreditCard());
            document.getElementById("email").addEventListener("input", () => this.validateEmail());
            document.getElementById("name").addEventListener("input", () => this.validateNotEmpty("name"));
            document.getElementById("address").addEventListener("input", () => this.validateNotEmpty("address"));

            // Handle checkout form submission
            document.getElementById("checkout-form").addEventListener("submit", (event) => this.handleCheckout(event));
        }, 100); // Small delay to ensure the form is generated
    }

    validateNotEmpty(fieldId) {
        const value = document.getElementById(fieldId).value.trim();
        if (value === "") {
            this.view.showError(fieldId, "This field is required.");
            return false;
        } else {
            this.view.clearError(fieldId);
            return true;
        }
    }

    validateEmail() {
        const email = document.getElementById("email").value.trim();
        if (!email.includes("@") || !email.includes(".")) {
            this.view.showError("email", "Enter a valid email (e.g., user@example.com).");
            return false;
        }
        this.view.clearError("email");
        return true;
    }

    validatePhone() {
        const phone = document.getElementById("phone").value.trim();
        const phonePattern = /^\d{3}-\d{4}$/;
        if (!phonePattern.test(phone)) {
            this.view.showError("phone", "Format: 123-4567.");
            return false;
        }
        this.view.clearError("phone");
        return true;
    }

    validateCreditCard() {
        const creditCard = document.getElementById("credit-card").value.trim();
        const cardPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        if (!cardPattern.test(creditCard)) {
            this.view.showError("credit-card", "Format: XXXX-XXXX-XXXX-XXXX.");
            return false;
        }
        this.view.clearError("credit-card");
        return true;
    }

    handleCheckout(event) {
        event.preventDefault(); // Prevent form from reloading page

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const creditCard = document.getElementById("credit-card").value.trim();

        if (!this.validateNotEmpty("name") || !this.validateEmail() || !this.validatePhone() || !this.validateNotEmpty("address") || !this.validateCreditCard()) {
            return;
        }

        // ✅ Order is successful, store the data
        this.model.storeCheckoutData({ name, email, phone, address, creditCard });

        localStorage.removeItem("bowlSelections");
        this.view.showSuccessMessage(name);
        document.getElementById("checkout-form").reset();
    }
}