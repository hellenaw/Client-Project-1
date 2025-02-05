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
      
      this.init(); //this immediately calls the init method after setting up this model and this view
      //  to start listening for user interactions

      //Without this.init();, the form would not respond when you click the “Build My Bowl” button
      //because no event listener would be attached.
    }
    /**
   * Initializes event listeners for form submission.
   */
    init() {
      const formElement = document.getElementById('bowl-builder-form'); //Looks for the form with the id="bowl-builder-form" in my HTML.
      if (formElement) { //prevents errors
        formElement.addEventListener('submit', (event) => {// addes event listener that waits for user submit
          event.preventDefault(); //Normally, submitting a form would refresh the page. 
          // This line stops that from happening,
          // allowing JavaScript to handle everything without reloading.
  
          const foodType = document.querySelector('input[name="foodType"]:checked')?.value; //checks which radio button
          const broth = document.getElementById('broth').value; // checks which option
          const foodFormula = document.getElementById('foodFormula').value; // checks which option
  
          const selections = [foodType, broth, foodFormula].filter(Boolean); //Creates an array with all selected options.
          const overlays = this.model.getOverlays(selections); /// caling the method for overlay images from the 
          // model class that will display images based on the selections array
  
          this.view.updateOverlays(overlays); //updates view
        });
      }
    }
  }
  