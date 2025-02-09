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
      
      this.init(); //this immediately calls the init method or the form would not respond when you click button
      //because no event listener would be attached.
    }
    /**
   * Initializes event listeners for form submission.
   */
    init() {
      const formElement = document.getElementById('bowl-builder-form'); //Looks for the form with the id="bowl-builder-form" in my HTML.
      if (formElement) { //prevents errors
        formElement.addEventListener('submit', (event) => {// addes event listener that waits for user submit
          event.preventDefault(); //prevents refresh
  

          //checks:
          // const foodType = document.querySelector('input[name="foodType"]:checked')?.value;
          // const broth = document.getElementById('broth').value; 
          // const foodFormula = document.getElementById('foodFormula').value; 
          //PROBLEM: the Controller should not be responsible for knowing how the UI is structured. that's the
          // view's job.

          //instead, let's ask the view to retrieve the user selections:
          const selections = this.view.getSelections();

          //for debugging:
          //console.log("User selections:", selections);

          //update the view with the overlay images
          const overlays = this.model.getOverlays(selections);

          //for debugging:
          //console.log("Mapped overlays:", overlays);

          //creates and stores in array
          // const selections = [foodType, broth, foodFormula].filter(Boolean);
          // const overlays = this.model.getOverlays(selections); /// caling the method from model
          
  
          this.view.updateOverlays(overlays); //updates view
        });
      }
    }
  }
  