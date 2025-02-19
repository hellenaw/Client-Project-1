import { ImageModel } from './model/model.js';
import { ImageView } from './view/view.js';
import { ImageController } from './controller/controller.js';

import { CheckoutModel } from "./model/CheckoutModel.js";
import { CheckoutView } from "./view/CheckoutView.js";
import { CheckoutController } from "./controller/CheckoutController.js";

console.log("✅ app.js loaded"); // Debugging

/**
 * Initializes the application once the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => { 
    console.log("✅ DOM Content Loaded"); // Debugging

    let url = window.location.href;
    let pageMatch = url.match(/[a-zA-Z-]+.html/); // Detects the current page

    if (pageMatch) {
        let page = pageMatch[0];
        console.log("✅ Current Page Detected:", page); // Debugging

        switch (page) {
            case "build-a-bowl.html":
                console.log("✅ Initializing Build-a-Bowl MVC");
                new ImageController(new ImageModel(), new ImageView());
                break;
            case "checkout.html":
                console.log("✅ Initializing Checkout MVC");
                new CheckoutController(new CheckoutModel(), new CheckoutView());
                break;
            default:
                console.log("⚠️ No matching MVC found for this page.");
        }
    } else {
        console.log("⚠️ No HTML page detected in URL.");
    }
});