import { config } from "../utils/utils.js";
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalImage = this._popup.querySelector(config.imageSelector);
    this._modalCardTitle = this._popup.querySelector(config.cardTitleSelector);
  }

  open(link, name) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalCardTitle.textContent = name;
    super.open();
  }
}
