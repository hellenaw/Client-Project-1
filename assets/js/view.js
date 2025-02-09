/**
 * Handles the rendering of dynamic selections and overlay images in the view.
 */
export class ImageView {
      /**
     * Initializes the view by selecting necessary DOM elements.
     */
  constructor() {
            /**
         * The container where overlay images are displayed.
         * @type {HTMLElement}
         */
      this.bowlContainer = document.querySelector('.bowl-container');
              /**
         * An array storing dynamically created select elements.
         * @type {HTMLSelectElement[]}
         */
      this.selects = [];
  }
    /**
     * Creates and inserts a new dropdown (`<select>`) element dynamically.
     * @param {string} selectID - The ID for the select element.
     * @param {Array<{value: string, label: string}>} options - The available options for selection.
     */
  createSelect(selectID, options) {
      let selectsDiv = document.querySelector("#dynamic-selects");

      selectsDiv.insertAdjacentHTML("beforeend", `
          <div class="mb-4">
              <label for="${selectID}" class="form-label fw-bold">${selectID.charAt(0).toUpperCase() + selectID.slice(1)}</label>
              <select id="${selectID}" class="form-select">
                  <option value="">Choose ${selectID}</option>
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
     * @param {string[]} images - An array of image source paths to be displayed.
     */
  updateOverlays(images) {
      this.clearOverlays();
      images.forEach(src => this.addOverlay(src));

      console.log("Updating View with images:", images);
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