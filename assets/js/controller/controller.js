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
            /**
         * @property {ImageModel} model - The data model containing selection and overlay data.
         */
      this.model = model;
              /**
         * @property {ImageView} view - The view responsible for rendering UI elements.
         */
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
        const categoryLabel = this.model.getCategoryLabel(property); // Convert key to readable text
        this.view.createSelect(property, categoryLabel, this.model.getOptions(property));
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
          /**
         * Retrieves selected values from the model.
         * @type {string[]}
         */
      const selections = this.model.getValues();
              /**
         * Maps selected values to their corresponding image paths.
         * @type {string[]}
         */
      const imagePaths = selections.map(selection => this.model.getImagePath(selection));
      this.view.updateOverlays(imagePaths); // Pass selections directly

      console.log("Saving selections:", this.model);
      //call local storage method from model
      this.model.storeSelections();
  };
}