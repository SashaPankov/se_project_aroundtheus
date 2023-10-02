import Card from "../components/Card.js";
import { showImageModal } from "../pages/index.js";

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._popup = this._formElement.closest(".modal");
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _disableButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
      return;
    }
    this._enableButton();
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      this._handleModalSubmit(evt);
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    document.addEventListener("keydown", (evt) => {
      this._closeByEscape(evt);
    });

    this._popup.addEventListener("mousedown", (evt) => {
      this._handleMouseDown(evt);
    });
  }

  _handleMouseDown(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      this._closePopup();
    }
    if (evt.target.classList.contains("modal__close")) {
      this._closePopup();
    }
  }

  _closeByEscape(evt) {
    if (evt.key === "Escape") {
      this._closePopup();
    }
  }

  _closePopup() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _handleModalSubmit(evt) {
    evt.preventDefault();
    this._closePopup();
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((fld) =>
      fld.classList.remove("modal__field_error")
    );
    this._formElement
      .querySelectorAll(".modal__field-error")
      .forEach((errorElement) => {
        errorElement.classList.remove("modal__field-error_visible");
        errorElement.textContent = "";
      });
    this._disableButton();
  }
}

export class AddLocationFormValidator extends FormValidator {
  constructor(config, formElement) {
    super(config, formElement);
    this._cardTitleInput = this._formElement.querySelector("#card-title-input");
    this._cardImageURLInput = this._formElement.querySelector(
      "#card-imageURL-input"
    );
  }

  _handleModalSubmit(evt) {
    const newCard = new Card(
      { name: this._cardTitleInput.value, link: this._cardImageURLInput.value },
      "card-template",
      showImageModal
    );
    document.querySelector(".cards__list").prepend(newCard.getCardElement());
    super._handleModalSubmit(evt);
    this._formElement.reset();
    this._disableButton();
  }
}

export class EditProfileFormValidator extends FormValidator {
  constructor(config, formElement) {
    super(config, formElement);
  }

  _closePopup() {
    super._closePopup();
    this.resetValidation();
  }
}
