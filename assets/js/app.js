import { ImageModel } from './model.js';
import { ImageView } from './view.js';
import { ImageController } from './controller.js';

/**
 * Initializes the MVC components when the DOM is fully loaded.
 */

document.addEventListener('DOMContentLoaded', () => { // event in JavaScript 
// “Hold on until the page structure is ready, then do your thing.”
  const model = new ImageModel();
  const view = new ImageView();
  const controller = new ImageController(model, view); //takes both as parameters to connect them
});