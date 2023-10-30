import { config } from "../utils/utils.js";
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._modalForm = this._popup.querySelector(config.formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = [...this._modalForm.querySelectorAll(config.inputSelector)];
    this._submitBtn = this._modalForm.querySelector(
      config.submitButtonSelector
    );
    this._selfButtonCaption = this._submitBtn.textContent;
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
    this._modalForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._selfButtonCaption;
    }
  }
}
