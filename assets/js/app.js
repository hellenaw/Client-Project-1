import { ImageModel } from './model/model.js';
import { ImageView } from './view/view.js';
import { ImageController } from './controller/controller.js';

import { CheckoutModel } from "./model/CheckoutModel.js";
import { CheckoutView } from "./view/CheckoutView.js";
import { CheckoutController } from "./controller/CheckoutController.js";

/**
 * Main application class that initializes controllers based on the current page.
 */
class App {
    /**
     * Detects the current page and initializes the appropriate MVC structure.
     */
    constructor() {
        console.log("App is starting...");

        let url = window.location.href; // retrieve full URL
        let pageMatch = url.match(/[a-zA-Z-]+.html/); // Ensures it matches pattern

        if (pageMatch) {
            let page = pageMatch[0]; // Extracts the matched page name
            console.log("Current Page Detected:", page); // Debugging

            switch (page) {
                case "build-a-bowl.html":
                    console.log("Initializing Build-a-Bowl MVC");
                    new ImageController(new ImageModel(), new ImageView());
                    break;
                case "checkout.html":
                    console.log("Initializing Checkout MVC");
                    new CheckoutController(new CheckoutModel(), new CheckoutView());
                    break;
                default:
                    console.log("No matching MVC found for this page.");
            }
        } else {
            console.log("⚠️ No HTML page detected in URL.");
        }
    }
}

// Instantiate the application
new App();