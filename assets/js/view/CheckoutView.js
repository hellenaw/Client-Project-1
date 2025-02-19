import { checkoutFields } from "../data/data.js";

export class CheckoutView {
    constructor() {
        this.checkoutSummary = document.getElementById("cart-summary");
        this.container = document.getElementById("checkout-container"); 
        this.form = null; // Placeholder for the form
        this.generateForm();
    }

    // ✅ Dynamically generate the checkout form inside #checkout-container
    generateForm() {
        if (!this.container) {
            console.error("ERROR: checkout-container NOT FOUND in DOM!");
            return;
        }
    
        // ✅ Prevent duplicate form rendering
        if (this.container.querySelector("#checkout-form")) {
            console.warn("Form already exists, skipping re-render.");
            return;
        }
    
        this.form = document.createElement("form");
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
    }

    // Render cart selections

    renderCheckout(selections, total) {
        console.log("🖥 Rendering checkout with:", selections, total);
        if (!selections || Object.keys(selections).length === 0) {
            this.checkoutSummary.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        let checkoutHTML = "<h3 class='fw-bold'>Your Custom Bowl:</h3><ul class='list-group'>";
        
        // ✅ No need to fetch labels—controller already provides them!
        Object.values(selections).forEach(label => {
            if (typeof label === "string" && label !== "undefined") {
                checkoutHTML += `<li class="list-group-item">${label}</li>`;
            }
        });

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

    // Clear validation error
    clearError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorMessage = document.getElementById(`${fieldId}-error`);
    
        if (!input || !errorMessage) {
            console.warn(`⚠️ clearError: Element not found for fieldId: ${fieldId}`);
            return; // Exit function if element doesn't exist
        }
    
        input.classList.remove("is-invalid");
        errorMessage.textContent = "";
    }

    // Show success message
    showSuccessMessage(name) {
        console.log("🎉 showSuccessMessage triggered!"); // Debugging
        this.checkoutSummary.innerHTML = `<p class='fw-bold text-success'>Thank you, ${name}! Your order has been placed. 🎉</p>`;
    }
}