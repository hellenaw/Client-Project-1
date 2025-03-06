import { CheckoutModel } from "../model/CheckoutModel.js";
import { CheckoutView } from "../view/CheckoutView.js";

export class CheckoutController {
    constructor() {
        this.model = new CheckoutModel();
        this.view = new CheckoutView();  // View generates form immediately
        console.log("CheckoutController initialized");

        // Render checkout details
        const selectionsWithLabels = this.model.getSelectionsWithLabels();
        this.view.renderCheckout(selectionsWithLabels, this.model.calculateTotal());

        this.view.attachEventListeners(this);
    }



validateField(fieldId, value) {
    const validationRules = {
        name: this.model.validateNotEmpty,
        address: this.model.validateNotEmpty,
        email: this.model.validateEmail,
        phone: this.model.validatePhone,
        "credit-card": this.model.validateCreditCard,
    };

    let errorMessage = "";
    if (validationRules[fieldId] && !validationRules[fieldId](value)) { // calls validation passing value as argument
        //if !validationRules[fieldId](value) (false): attach error messsage
        const errorMessages = {
            name: "This field is required.",
            address: "This field is required.",
            email: "Enter a valid email (e.g., user@example.com).",
            phone: "Format: 123-4567.",
            "credit-card": "Format: XXXX-XXXX-XXXX-XXXX.",
        };
        errorMessage = errorMessages[fieldId];
        //ideally error messages should be in model, with all the other data
        //separation of concerns
    }

    if (errorMessage) { // if errormessage contains smth validation failed
        this.view.showError(fieldId, errorMessage); // calls show error from view
    } else {
        this.view.clearError(fieldId);
    }
}


    handleCheckout(event) {
        event.preventDefault(); // Prevent form reload
        console.log("handleCheckout triggered!");
    
        if (this.model.isCartEmpty()) {  // Ask model if cart is empty
            console.log("Cannot proceed, cart is empty!");
            this.view.showCartError("Your cart is empty. Please add items before purchasing.");
            return; // Stop execution if cart is empty
        }
        const formData = this.view.getFormData();
    
        console.log("Form Data Collected:", formData);
    
        const errors = this.model.validateCheckoutData(formData);
        console.log("Validation Errors:", errors);
    
        if (Object.keys(errors).length > 0) {
            console.log("Validation failed, displaying errors...");
            Object.entries(errors).forEach(([fieldId, message]) => {
                this.view.showError(fieldId, message);
            });
            return; // Stop execution if there are errors
        }
    
        console.log("Validation passed, proceeding with checkout...");
    
        Object.keys(formData).forEach(fieldId => this.view.clearError(fieldId));
    
        //LOCAL STORAGE
        //Store valid checkout data
        this.model.storeCheckoutData(formData);
        console.log("Checkout data stored in localStorage");
    
        localStorage.removeItem("bowlSelections");
    
        // success message is shown
        console.log("Showing success message...");
        this.view.showSuccessMessage(formData.name);
    
        // reset form fields
        this.form.reset();
    }
}