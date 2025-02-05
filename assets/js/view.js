/**
 * View class responsible for rendering overlay images on the bowl.
 */
export class ImageView {
    /**
   * Initializes the view and selects the bowl container element.
   */
    constructor() {
          /**
     * The container where overlay images are displayed.
     * @type {HTMLElement}
     */
      this.bowlContainer = document.querySelector('.bowl-container');
    // 	•	What it does: Finds the .bowl-container element in your HTML.
	  //Why: This is where all the overlay images 
    //(like food, broth, etc.) will be displayed on top of the bowl.
    }
      /**
   * Removes all existing overlay images from the bowl container.
   */
  
    clearOverlays() {
      const overlays = this.bowlContainer.querySelectorAll('.overlay-image');
      overlays.forEach(overlay => overlay.remove());
    } //	•	What it does: Removes all existing overlay images from the bowl.
    //•	How:
    //•	It finds all images with the class .overlay-image.
    //•	It loops through them using forEach and removes each one.
    
      /**
   * Adds an overlay image on top of the bowl image.
   * @param {string} src - The source path of the overlay image.
   */
  
    addOverlay(src) {
      if (this.bowlContainer && src) {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('position-absolute', 'overlay-image');
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        this.bowlContainer.appendChild(img);
      }
    }
    /**
   * Updates the overlays by clearing existing ones and adding new images.
   * @param {string[]} images - An array of image paths to be displayed as overlays.
   */
    updateOverlays(images) {
      this.clearOverlays();
      images.forEach(src => this.addOverlay(src));
    }
  }