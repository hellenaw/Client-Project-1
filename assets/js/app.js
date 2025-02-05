import { ImageModel } from './model.js';
import { ImageView } from './view.js';
import { ImageController } from './controller.js';

/**
 * Initializes the MVC components when the DOM is fully loaded.
 */

document.addEventListener('DOMContentLoaded', () => { // DOMContentLoaded is an event in JavaScript 
//that fires when the HTML has been completely loaded and parsed by the browser, 
//but before images, stylesheets, and other resources are fully loaded.
//This ensures that things like #bowl-builder-form and .bowl-container
//exist in the DOM when JavaScript tries to interact with them.
// “Hold on until the page structure is ready, then do your thing.”
  const model = new ImageModel();
  const view = new ImageView();
  const controller = new ImageController(model, view); //takes both as parameters to connect them
});