/**
 * Handles the rendering of dynamic selections and overlay images in the view.
 */
export class ImageView {
      /**
     * Initializes the view by selecting necessary DOM elements.
     */
  constructor() {
        /**
         * @property {HTMLElement} bowlContainer - The container where overlay images are displayed.
         */
      this.bowlContainer = document.querySelector('.bowl-container');

        /**
         * @property {HTMLSelectElement[]} selects - An array storing dynamically created select elements.
         */
      this.selects = [];
  }
    /**
     * Creates and inserts a new dropdown (`<select>`) element dynamically.
     * @param {string} selectID - The ID for the select element.
     * @param {string} categoryLabel - The user-friendly label for the category.
     * @param {Array<{value: string, label: string}>} options - The available options for selection.
     */
  createSelect(selectID, categoryLabel, options) {
      let selectsDiv = document.querySelector("#dynamic-selects");

      selectsDiv.insertAdjacentHTML("beforeend", `
          <div class="mb-4">
              <label for="${selectID}" class="form-label fw-bold">${categoryLabel}</label>
              <select id="${selectID}" class="form-select">
                  <option value="">Choose ${categoryLabel}</option>
              </select>
          </div>
      `);


      let select = document.getElementById(selectID);
      options.forEach(option => {
          select.insertAdjacentHTML("beforeend",
              `<option value="${option.value}">${option.label}</option>`);
      });

      this.selects.push(select);
  }
    /**
     * Updates the displayed overlay images based on user selections.
     * @param {string[]} imagePaths - An array of image source paths to be displayed.
     */
    updateOverlays(imagePaths) {
        this.clearOverlays();
        console.log("ImageView initialized");

        if (imagePaths.length === 0) return;
    
        imagePaths.forEach((imgSrc) => {
            this.addOverlay(imgSrc);
        });
    }
    /**
     * Removes all existing overlay images from the bowl container.
     */
  clearOverlays() {
      const overlays = this.bowlContainer.querySelectorAll('.overlay-image');
      overlays.forEach(overlay => overlay.remove());
  }
    /**
     * Adds a new overlay image to the bowl container.
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
}