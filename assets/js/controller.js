/**
 * Controller class to handle user interactions and update the view.
 */
export class ImageController {
    /**
   * Creates an instance of ImageController.
   * @param {ImageModel} model - The data model for managing overlay images.
   * @param {ImageView} view - The view responsible for rendering overlays.
   */
    constructor(model, view) {
      this.model = model;
      this.view = view;
      
      this.init();
    }
    /**
   * Initializes event listeners for form submission.
   */
    init() {
      const formElement = document.getElementById('bowl-builder-form');
      if (formElement) {
        formElement.addEventListener('submit', (event) => {
          event.preventDefault();
  
          const foodType = document.querySelector('input[name="foodType"]:checked')?.value;
          const broth = document.getElementById('broth').value;
          const foodFormula = document.getElementById('foodFormula').value;
  
          const selections = [foodType, broth, foodFormula].filter(Boolean);
          const overlays = this.model.getOverlays(selections);
  
          this.view.updateOverlays(overlays);
        });
      }
    }
  }
  