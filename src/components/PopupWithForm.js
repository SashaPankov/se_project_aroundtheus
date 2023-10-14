import { config } from "../utils/utils.js";
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._modalForm = this._popup.querySelector(config.formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = [...this._modalForm.querySelectorAll(config.inputSelector)];
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((inputElement) => {
      values[inputElement.getAttribute("name")] = inputElement.value;
    });
    return values;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", this._handleFormSubmit);
  }
}
