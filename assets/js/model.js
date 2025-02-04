/**
 * Model class to manage the overlay images based on user selections.
 */
export class ImageModel {
    /**
   * Initializes the overlay image paths for different food selections.
   */
    constructor() {
          /**
     * Object mapping selections to corresponding overlay image paths.
     * @type {Object.<string, string>}
     */
      this.overlays = {
        wet: '../assets/media/food-wet.png',
        dry: '../assets/media/food-dry.png',
        chicken: '../assets/media/broth2.png',
        salmon: '../assets/media/broth1.png',
        driedAnchovy: '../assets/media/dry-anchovy.png',
        quailEggYolks: '../assets/media/dry-egg.png'
      };
    }
      /**
   * Retrieves the overlay image paths based on the user's selections.
   * @param {string[]} selections - An array of selected food options (e.g., 'wet', 'chicken').
   * @returns {string[]} An array of image paths corresponding to the selections.
   */
  
    getOverlays(selections) {
      return selections.map(selection => this.overlays[selection]).filter(src => src);
    }
  }