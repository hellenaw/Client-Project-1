export class ImageController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    console.log("ImageController initialized");

    let properties = this.model.getProperties();
    properties.forEach((property) => {
      this.view.createSelect(property, property, this.model.getOptions(property));
    });

    this.view.selects.forEach((select) => {
      select.addEventListener("change", (event) => {
        console.log("Selected value:", event.target.value);
        this.handleSelectChange(event);
      });
    });
  }

  handleSelectChange = (event) => {
    let select = event.target;
    const selectedValue = select.value.trim();

    if (selectedValue !== "undefined") {
      this.model.updateSelection(select.id, selectedValue);
    }

    const selections = this.model.getValues();
    const imagePaths = selections
      .map((selection) => {
        if (selection && typeof selection === "string" && selection.trim() !== "") {
          return this.model.getImagePath(selection);
        }
        return null;
      })
      .filter((path) => path !== null);

    this.view.updateOverlays(imagePaths);
    this.model.storeSelections();
  };
}