export const ESC_NAME = "Escape";
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

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
  buttonCloseSelector: ".modal__close",
};
