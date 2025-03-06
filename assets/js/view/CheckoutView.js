import { checkoutFields } from "../data/data.js";

export class CheckoutView {
    constructor() {
        this.checkoutSummary = document.getElementById("cart-summary");
        this.container = document.getElementById("checkout-container");
        this.form = null; // Placeholder for the form

        console.log("CheckoutView constructor called. Generating form...");
        this.generateForm();
    }

    
    /**
     * Generates the checkout form dynamically.
     */
    generateForm() {
        if (!this.container) {
            console.error("ERROR: checkout-container NOT FOUND in DOM!");
            return;
        }

        // Prevent duplicate form rendering
        let existingForm = this.container.querySelector("#checkout-form");
        if (existingForm) {
            console.warn("Form already exists, skipping re-render.");
            this.form = existingForm; // Ensure `this.form` is set if the form already exists
            return;
        }

        console.log("Generating checkout form...");
        this.form = document.createElement("form"); // Ensure this.form is set
        this.form.id = "checkout-form";

        // Add form fields dynamically
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

        let submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.classList.add("btn", "btn-dark", "w-100", "fw-bold");
        submitButton.textContent = "Complete Purchase";

        this.form.appendChild(submitButton);
        this.container.appendChild(this.form);

        console.log("Form successfully created in View.");
    }

    /**
     * Returns the checkout form so the Controller can access it.
     * @returns {HTMLFormElement}
     */
    getForm() {
        console.log("getForm() called, returning form:", this.form);
        return this.form;
    }


    /**
     * Attaches event listeners for real-time input validation and form submission.
     * @param {CheckoutController} controller - The controller that handles validation.
     */
    attachEventListeners(controller) {
        console.log("Attaching event listeners in View...");

        // Ensure the form exists before adding event listeners
        if (!this.form) {
            console.error("Form not found! Event listeners not attached.");
            return;
        }

        // Validate on every keystroke (input event)
        this.form.addEventListener("input", (event) => {
            if (event.target.tagName === "INPUT") {
                controller.validateField(event.target.id, event.target.value);
            }
        });

        // Validate when the user leaves the field (blur event)
        this.form.addEventListener("focusout", (event) => {
            if (event.target.tagName === "INPUT") {
                controller.validateField(event.target.id, event.target.value);
            }
        });

        // Submit event listener
        this.form.addEventListener("submit", (event) => {
            controller.handleCheckout(event);
        });
    }
    // Render cart selections
    renderCheckout(selections, total) {
        console.log("Rendering checkout with:", selections, total);
        //check if chart empty
        if (!selections || Object.keys(selections).length === 0) {
            this.checkoutSummary.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        //HTML string to store checkout summary
        let checkoutHTML = "<h3 class='fw-bold'>Your Custom Bowl:</h3><ul class='list-group'>";

        // No need to fetch labels—controller already provides them
        //loop through selections and add as list item
        Object.values(selections).forEach(label => {
            if (typeof label === "string" && label !== "undefined") {
                checkoutHTML += `<li class="list-group-item">${label}</li>`;
            }
        });

        //close <ul> list:
        checkoutHTML += `</ul><p class='fw-bold mt-3'>Total Price: $${total}</p>`;
        this.checkoutSummary.innerHTML = checkoutHTML;
    }

    // Show validation error
    showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorMessage = document.getElementById(`${fieldId}-error`);
        input.classList.add("is-invalid");
        errorMessage.textContent = message;
    }


    /**
 * Retrieves form data entered by the user.
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
    // Clear validation error
    clearError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorMessage = document.getElementById(`${fieldId}-error`);

        if (!input || !errorMessage) {
            console.warn(`clearError: Element not found for fieldId: ${fieldId}`);
            return; // Exit function if element doesn't exist
        }

        input.classList.remove("is-invalid");
        errorMessage.textContent = "";
    }
    showCartError(message) {
        this.checkoutSummary.innerHTML = `<p class='fw-bold text-danger'>${message}</p>`;
    }

    // Show success message
    showSuccessMessage(name) {
        console.log("showSuccessMessage triggered!");
        this.checkoutSummary.innerHTML = `<p class='fw-bold text-success'>Thank you, ${name}! Your order has been placed. 🎉</p>`;
    }
}