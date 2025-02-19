import { CheckoutModel } from "../model/CheckoutModel.js";
import { CheckoutView } from "../view/CheckoutView.js";

export class CheckoutController {
    constructor() {
        this.model = new CheckoutModel();
        this.view = new CheckoutView();
        console.log("CheckoutController initialized");

        // Render checkout details
        const selectionsWithLabels = this.model.getSelectionsWithLabels();
        this.view.renderCheckout(selectionsWithLabels, this.model.calculateTotal());
        this.attachValidationListeners(); // ✅ Attach validation after form renders
    }

    /**
     * Attaches validation event listeners after the form is dynamically created.
     */
    
    attachValidationListeners() {
        setTimeout(() => { // Ensure DOM elements exist
            console.log("✅ Attaching validation listeners...");

            document.getElementById("phone").addEventListener("input", (event) => this.validateField("phone", event.target.value));
            document.getElementById("credit-card").addEventListener("input", (event) => this.validateField("credit-card", event.target.value));
            document.getElementById("email").addEventListener("input", (event) => this.validateField("email", event.target.value));
            document.getElementById("name").addEventListener("input", (event) => this.validateField("name", event.target.value));
            document.getElementById("address").addEventListener("input", (event) => this.validateField("address", event.target.value));

            document.getElementById("checkout-form").addEventListener("submit", (event) => this.handleCheckout(event));
        }, 100);
    }

    validateField(fieldId, value) {
        let errorMessage = "";

        switch (fieldId) {
            case "name":
            case "address":
                if (!this.model.validateNotEmpty(value)) errorMessage = "This field is required.";
                break;
            case "email":
                if (!this.model.validateEmail(value)) errorMessage = "Enter a valid email (e.g., user@example.com).";
                break;
            case "phone":
                if (!this.model.validatePhone(value)) errorMessage = "Format: 123-4567.";
                break;
            case "credit-card":
                if (!this.model.validateCreditCard(value)) errorMessage = "Format: XXXX-XXXX-XXXX-XXXX.";
                break;
        }

        if (errorMessage) {
            this.view.showError(fieldId, errorMessage);
        } else {
            this.view.clearError(fieldId);
        }
    }

    handleCheckout(event) {
        event.preventDefault(); // Prevent form reload
        console.log("✅ handleCheckout triggered!");
    
        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("address").value.trim(),
            creditCard: document.getElementById("credit-card").value.trim(),
        };
    
        console.log("📦 Form Data Collected:", formData);
    
        const errors = this.model.validateCheckoutData(formData);
        console.log("🔍 Validation Errors:", errors);
    
        if (Object.keys(errors).length > 0) {
            console.log("⚠️ Validation failed, displaying errors...");
            Object.entries(errors).forEach(([fieldId, message]) => {
                this.view.showError(fieldId, message);
            });
            return; // Stop execution if there are errors
        }
    
        console.log("✅ Validation passed, proceeding with checkout...");
    
        Object.keys(formData).forEach(fieldId => this.view.clearError(fieldId));
    
        // ✅ Store valid checkout data
        this.model.storeCheckoutData(formData);
        console.log("💾 Checkout data stored in localStorage");
    
        localStorage.removeItem("bowlSelections");
    
        // ✅ Ensure success message is shown
        console.log("🎉 Showing success message...");
        this.view.showSuccessMessage(formData.name);
    
        // ✅ Reset form fields
        document.getElementById("checkout-form").reset();
    }
}