import { config } from "../utils/utils.js";
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._modalForm = this._popup.querySelector(config.formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._closeButton = this._popup.querySelector(config.buttonCloseSelector);
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  _getInputValues() {
    const values = {};
    [...this._modalForm.querySelectorAll(config.inputSelector)].forEach(
      (inputElement) => {
        values[inputElement.getAttribute("name")] = inputElement.value;
      }
    );
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", this._handleFormSubmit);
  }
}
