import Card from "../components/Card.js";

export const ESC_NAME = "Escape";

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_error",
  errorClass: "modal__field-error_visible",
  cardSelector: "card-template",
  cardsContainer: ".cards__list",
  imageSelector: ".modal__image",
  cardTitleSelector: ".modal__card-title",
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  profileAvatarSelector: ".profile__image",
  profileEditButtonSelector: "#profile-edit-button",
  profileTitleInputSelector: "#profile-title-input",
  profileDescriptionInputSelector: "#profile-description-input",
  profileEditForm: "profile-edit-form",
  cardAddButtonSelector: "#profile-add-button",
  cardAddForm: "card-add-form",
  cardTitleInputSelector: "#card-title-input",
  cardImageURLInputSelector: "#card-imageURL-input",
  popupImageSelector: "image-view-modal",
  popupProfileSelector: "profile-edit-modal",
  popupAddCardSelector: "card-add-modal",
  popupDeleteCardSelector: "card-delete-modal",
  popupChangeAvatarSelector: "profile-change-avatar-link",
  buttonCloseSelector: ".modal__close",
};

export const formValidators = {};

// Elements
export const profileEditButton = document.querySelector(
  config.profileEditButtonSelector
);

export const profileEditForm = document.forms[config.profileEditForm];
export const profileAddButton = document.querySelector(
  config.cardAddButtonSelector
);
export const cardAddForm = document.forms[config.cardAddForm];
export const formList = [...document.querySelectorAll(config.formSelector)];
