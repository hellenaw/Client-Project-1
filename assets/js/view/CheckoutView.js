import { checkoutFields } from "../data/data.js";

/**
 * @class CheckoutView
 * @description Represents the View for the checkout process, responsible for rendering and handling form interactions.
 */
export class CheckoutView {
    /**
     * @constructor
     * @description Initializes the view and generates the checkout form.
     */
    constructor() {
        /**
         * @property {HTMLElement} checkoutSummary - The element displaying the checkout summary.
         * @property {HTMLElement} container - The element where the form is appended.
         * @property {HTMLFormElement|null} form - The form element for the checkout process.
         */
        this.checkoutSummary = document.getElementById("cart-summary");
        this.container = document.getElementById("checkout-container");
        this.form = null;

        /**
         * @function generateForm
         * @description Calls the method to generate the form.
         */
        this.generateForm();
    }

    /**
     * @function generateForm
     * @description Generates the checkout form dynamically based on the checkoutFields data.
     */
    generateForm() {
        /**
         * @type {HTMLElement} existingForm - Stores the already existing form if present.
         */
        if (!this.container) {
            console.error("ERROR: checkout-container NOT FOUND in DOM!");
            return;
        }

        /**
         * @type {HTMLElement} existingForm - Checks for an existing form to avoid re-rendering.
         */
        let existingForm = this.container.querySelector("#checkout-form");
        if (existingForm) {
            console.warn("Form already exists, skipping re-render.");
            this.form = existingForm; // Ensure `this.form` is set if the form already exists
            return;
        }

        /**
         * @type {HTMLFormElement} form - Creates a new form dynamically.
         */
        this.form = document.createElement("form");
        this.form.id = "checkout-form";

        /**
         * @description Loops through the checkoutFields array and creates form fields dynamically.
         */
        checkoutFields.forEach(field => {
            let formGroup = document.createElement("div");
            formGroup.classList.add("mb-3");

            formGroup.innerHTML = `
                <label for="${field.id}" class="form-label fw-bold">${field.label}</label>
                <input type="${field.type}" class="form-control" id="${field.id}" placeholder="${field.placeholder}">
                <small id="${field.id}-error" class="text-danger"></small>
            `;

            this.form.appendChild(formGroup);
        });

        /**
         * @description Creates a submit button for the form.
         */
        let submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.classList.add("btn", "btn-dark", "w-100", "fw-bold");
        submitButton.textContent = "Complete Purchase";

        this.form.appendChild(submitButton);
        this.container.appendChild(this.form);
    }

    /**
     * @function getForm
     * @description Returns the checkout form element.
     * @returns {HTMLFormElement}
     */
    getForm() {
        return this.form;
    }

    /**
     * @function attachEventListeners
     * @description Attaches event listeners for real-time input validation and form submission.
     * @param {CheckoutController} controller - The controller that handles validation.
     */
    attachEventListeners(controller) {
        /**
         * @description Attaches event listeners for input validation.
         */
        if (!this.form) {
            console.error("Form not found! Event listeners not attached.");
            return;
        }

        this.form.addEventListener("input", (event) => {
            if (event.target.tagName === "INPUT") {
                controller.validateField(event.target.id, event.target.value);
            }
        });

        this.form.addEventListener("focusout", (event) => {
            if (event.target.tagName === "INPUT") {
                controller.validateField(event.target.id, event.target.value);
            }
        });

        this.form.addEventListener("submit", (event) => {
            controller.handleCheckout(event);
        });
    }

    /**
     * @function renderCheckout
     * @description Renders the checkout details based on the selections and total amount.
     * @param {Object} selections - The user’s selections for the checkout.
     * @param {number} total - The total price for the checkout.
     */
    renderCheckout(selections, total) {
        if (!selections || Object.keys(selections).length === 0) {
            this.checkoutSummary.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        let checkoutHTML = "<h3 class='fw-bold'>Your Custom Bowl:</h3><ul class='list-group'>";
        Object.values(selections).forEach(label => {
            if (typeof label === "string" && label !== "undefined") {
                checkoutHTML += `<li class="list-group-item">${label}</li>`;
            }
        });

        checkoutHTML += `</ul><p class='fw-bold mt-3'>Total Price: $${total}</p>`;
        this.checkoutSummary.innerHTML = checkoutHTML;
    }

    /**
     * @function showError
     * @description Displays a validation error message for the specified field.
     * @param {string} fieldId - The ID of the field that has an error.
     * @param {string} message - The error message to display.
     */
    showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorMessage = document.getElementById(`${fieldId}-error`);
        input.classList.add("is-invalid");
        errorMessage.textContent = message;
    }

    /**
     * @function getFormData
     * @description Retrieves the data entered by the user in the form fields.
     * @returns {Object} - An object containing user input values.
     */
    getFormData() {
        return {
            name: this.form.querySelector("#name").value.trim(),
            email: this.form.querySelector("#email").value.trim(),
            phone: this.form.querySelector("#phone").value.trim(),
            address: this.form.querySelector("#address").value.trim(),
            creditCard: this.form.querySelector("#credit-card").value.trim(),
        };
    }

    /**
     * @function clearError
     * @description Clears the validation error for a specific field.
     * @param {string} fieldId - The ID of the field whose error is to be cleared.
     */
    clearError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorMessage = document.getElementById(`${fieldId}-error`);

        if (!input || !errorMessage) {
            console.warn(`clearError: Element not found for fieldId: ${fieldId}`);
            return;
        }

        input.classList.remove("is-invalid");
        errorMessage.textContent = "";
    }

    /**
     * @function showCartError
     * @description Displays an error message when the cart is empty.
     * @param {string} message - The error message to display.
     */
    showCartError(message) {
        this.checkoutSummary.innerHTML = `<p class='fw-bold text-danger'>${message}</p>`;
    }

    /**
     * @function showSuccessMessage
     * @description Displays a success message after a successful order.
     * @param {string} name - The name of the customer who placed the order.
     */
    showSuccessMessage(name) {
        this.checkoutSummary.innerHTML = `<p class='fw-bold text-success'>Thank you, ${name}! Your order has been placed. 🎉</p>`;
    }
}