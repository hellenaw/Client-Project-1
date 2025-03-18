import { selectData } from "../data/data.js";  // Correct the path if needed
export class ImageModel {
    constructor() {
      this.options = selectData;
      console.log("ImageModel initialized");
  
      let properties = Object.keys(this.options);
      properties.forEach((property) => {
        this[property] = "undefined"; // Default value
      });
    }
  
    getProperties() {
      return Object.keys(this.options);
    }
  
    getValues() {
      return Object.values(this).filter((value) => value !== "undefined");
    }
  
    getOptions(category) {
      return this.options[category] || [];
    }
  
    storeSelections() {
      localStorage.setItem("bowlSelections", JSON.stringify(this));
    }
  
    getImagePath(selection) {
      if (typeof selection === "string" && selection.trim() !== "") {
        return `assets/media/${selection}.png`;
      } else {
        return "";
      }
    }
  
    updateSelection(category, value) {
      if (this.options.hasOwnProperty(category)) {
        const validValue = String(value).trim();
        if (validValue) {
          this[category] = validValue;
        } else {
          this[category] = "undefined";
        }
      }
    }
  
    loadSelections() {
      let storedData = JSON.parse(localStorage.getItem("bowlSelections"));
      if (storedData) {
        Object.assign(this, storedData);
      }
    }
  }