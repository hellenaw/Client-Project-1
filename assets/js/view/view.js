export class ImageView {
    constructor() {
      this.selects = [];
      this.previewContainer = document.querySelector("#overlay-container");
    }
  
    createSelect(selectID, categoryLabel, options) {
      let selectsDiv = document.querySelector("#dynamic-selects");
  
      selectsDiv.insertAdjacentHTML("beforeend", `
        <div class="mb-4">
          <label for="${selectID}" class="form-label">${categoryLabel}</label>
          <select id="${selectID}" class="form-select d-block">
            <option value="undefined"> -- Select a ${categoryLabel} -- </option>
          </select>
        </div>
      `);
  
      let select = selectsDiv.querySelector(`#${selectID}`);
      options.forEach((option) => {
        select.insertAdjacentHTML("beforeend", `<option value="${option}">${option}</option>`);
      });
  
      this.selects.push(select);
    }
  
    updateOverlays(imagePaths) {
      this.clearOverlays();
      if (imagePaths.length === 0) return;
  
      imagePaths.forEach((imgSrc) => {
        this.addOverlay(imgSrc);
      });
    }
  
    clearOverlays() {
      const overlays = this.previewContainer.querySelectorAll(".overlay-image");
      overlays.forEach((overlay) => overlay.remove());
    }
  
    addOverlay(src) {
      if (this.previewContainer && src) {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("position-absolute", "overlay-image");
        img.style.top = "0";
        img.style.left = "0";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";
        this.previewContainer.appendChild(img);
      }
    }
  }