import { ImageModel } from './model.js';
import { ImageView } from './view.js';
import { ImageController } from './controller.js';

/**
 * Initializes the MVC components when the DOM is fully loaded.
 */

document.addEventListener('DOMContentLoaded', () => {
  const model = new ImageModel();
  const view = new ImageView();
  const controller = new ImageController(model, view);
});