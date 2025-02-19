/**
 * Handles communication between the model and the view.
 * Manages user interactions and updates the view accordingly.
 */
export class ImageController {
      /**
     * Initializes the controller with a model and a view.
     * @param {ImageModel} model - The data model for managing selections and overlays.
     * @param {ImageView} view - The view responsible for rendering dynamic selections and overlays.
     */
  constructor(model, view) {
      this.model = model;
      this.view = view;
      console.log("ImageController initialized");

        /**
         * Retrieve property names from the model to dynamically generate selection elements.
         * Each property corresponds to a selectable category (e.g., foodType, broth).
         */
      let properties = this.model.getProperties();
              /**
         * Creates selection dropdowns dynamically in the view using model data.
         */
      properties.forEach((property) => {
          this.view.createSelect(property, this.model.getOptions(property));
      });
        /**
         * Registers event listeners for selection changes.
         * Updates the model and view whenever a selection is made.
         */
      this.view.selects.forEach((select) => {
          select.addEventListener("change", this.handleSelectChange);
      });
  }
    /**
     * Handles user selection changes, updates the model, and refreshes the view.
     * @param {Event} event - The event object triggered by a change in selection.
     */
    handleSelectChange = (event) => {
      let select = event.target;

      this.model[select.id] = select.value;
  
      const selections = this.model.getValues();
      this.view.updateOverlays(selections); // Pass selections directly

      //  Save selections to Local Storage
      localStorage.setItem("bowlSelections", JSON.stringify(this.model));
  };
}