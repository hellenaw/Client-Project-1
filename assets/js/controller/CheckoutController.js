import { CheckoutModel } from "../model/CheckoutModel.js";
import { CheckoutView } from "../view/CheckoutView.js";

/**
 * Handles the checkout process including validation and managing user selections.
 * @class CheckoutController
 */
export class CheckoutController {
    /**
     * Initializes the CheckoutController.
     * @constructor
     */
    constructor() {
        /**
         * @type {CheckoutModel} model - The model that handles checkout data.
         */
        this.model = new CheckoutModel();

        /**
         * @type {CheckoutView} view - The view that manages UI rendering and user input.
         */
        this.view = new CheckoutView();

        console.log("CheckoutController initialized");

        /**
         * Render checkout details by getting selections and calculating the total.
         * @type {Object} selectionsWithLabels - The user-selected options with their labels.
         */
        const selectionsWithLabels = this.model.getSelectionsWithLabels();

        /**
         * @type {number} total - The total price of the items in the cart.
         */
        const total = this.model.calculateTotal();

        this.view.renderCheckout(selectionsWithLabels, total);

        this.view.attachEventListeners(this);
    }

    /**
     * Validates a field on the form based on its ID and value.
     * @param {string} fieldId - The ID of the form field.
     * @param {string} value - The value entered in the form field.
     */
    validateField(fieldId, value) {
        /**
         * @type {Object} validationRules - Mapping of field IDs to their respective validation functions.
         */
        const validationRules = {
            name: this.model.validateNotEmpty,
            address: this.model.validateNotEmpty,
            email: this.model.validateEmail,
            phone: this.model.validatePhone,
            "credit-card": this.model.validateCreditCard,
        };

        let errorMessage = "";

        /**
         * Checks if the value is valid according to the validation rules.
         */
        if (validationRules[fieldId] && !validationRules[fieldId](value)) {
            /**
             * @type {Object} errorMessages - A map of field IDs to their error messages.
             */
            const errorMessages = {
                name: "This field is required.",
                address: "This field is required.",
                email: "Enter a valid email (e.g., user@example.com).",
                phone: "Format: 123-4567.",
                "credit-card": "Format: XXXX-XXXX-XXXX-XXXX.",
            };
            errorMessage = errorMessages[fieldId];
        }

        /**
         * If there's an error message, show it in the view.
         */
        if (errorMessage) {
            this.view.showError(fieldId, errorMessage);
        } else {
            this.view.clearError(fieldId);
        }
    }

    /**
     * Handles the form submission process for checkout, including validation and storing the data.
     * @param {Event} event - The submit event.
     */
    handleCheckout(event) {
        /**
         * Prevents the default form submission behavior.
         */
        event.preventDefault();

        /**
         * Checks if the cart is empty using the model.
         */
        if (this.model.isCartEmpty()) {
            console.log("Cannot proceed, cart is empty!");
            this.view.showCartError("Your cart is empty. Please add items before purchasing.");
            return;
        }

        /**
         * @type {Object} formData - The data collected from the form.
         */
        const formData = this.view.getFormData();

        console.log("Form Data Collected:", formData);

        /**
         * @type {Object} errors - Validation errors for the form.
         */
        const errors = this.model.validateCheckoutData(formData);
        console.log("Validation Errors:", errors);

        /**
         * If there are validation errors, show them in the view.
         */
        if (Object.keys(errors).length > 0) {
            console.log("Validation failed, displaying errors...");
            Object.entries(errors).forEach(([fieldId, message]) => {
                this.view.showError(fieldId, message);
            });
            return;
        }

        console.log("Validation passed, proceeding with checkout...");

        /**
         * Clears any validation errors from the form.
         */
        Object.keys(formData).forEach(fieldId => this.view.clearError(fieldId));

        /**
         * Stores the valid checkout data in the model and removes bowl selections from localStorage.
         */
        this.model.storeCheckoutData(formData);
        console.log("Checkout data stored in localStorage");

        localStorage.removeItem("bowlSelections");

        /**
         * Displays a success message in the view.
         */
        this.view.showSuccessMessage(formData.name);

        /**
         * Resets the form fields.
         */
        this.view.getForm().reset();
    }
}