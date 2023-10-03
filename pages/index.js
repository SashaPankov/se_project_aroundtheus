import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__field_error",
  errorClass: "modal__field-error_visible",
};

const formValidators = {};

// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profile-edit-form"];
const cardsList = document.querySelector(".cards__list");
const profileAddButton = document.querySelector("#profile-add-button");

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = document.forms["card-add-form"];
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageURLInput = document.querySelector("#card-imageURL-input");

const cardImageModal = document.querySelector("#image-view-modal");
const modalImage = document.querySelector(".modal__image");
const modalCardTitle = document.querySelector(".modal__card-title");

const formList = [...document.querySelectorAll(config.formSelector)];

// Functions
function createCard(cardData) {
  const newCard = new Card(cardData, "card-template", showImageModal);
  return newCard.getCardElement();
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (!(openedPopup === null)) {
      closePopup(openedPopup);
    }
  }
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function addProfileEditPopup() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  formValidators[profileEditForm.getAttribute("name")].resetValidation();
  openPopup(profileEditModal);
}

function addCardPopup() {
  // Thank you for pointing to single responsibility principle. Fixed this I suppose.
  // And I'm checking are inputs empty because here I'm trying following the task and fix issue from previous review:
  // 1.task (about Card form): "When the form is closed, but not submitted, it provides a better user experience
  //          to leave the form fields as they are, so as to prevent lost data."
  // 2. prev review: "You need to disable the submit button in the addCardPopup
  //                  if the inputs are empty when you open it."
  if (formValidators[cardAddForm.getAttribute("name")].areInputsEmpty()) {
    formValidators[cardAddForm.getAttribute("name")].resetValidation();
  }
  openPopup(cardAddModal);
}

// Event Handlers
function handleProfileEditModalSubmit(evt) {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardAddModalSubmit(evt) {
  const cardElement = createCard({
    name: cardTitleInput.value,
    link: cardImageURLInput.value,
  });
  cardsList.prepend(cardElement);
  closePopup(cardAddModal);
  cardAddForm.reset();
}

export function showImageModal(card) {
  modalImage.src = card.getImageLink();
  modalCardTitle.textContent = card.getName();
  modalImage.alt = modalCardTitle.textContent;

  openPopup(cardImageModal);
}

// Event Listeners
formList.forEach((formElement) => {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
});

profileEditButton.addEventListener("click", addProfileEditPopup);
profileEditForm.addEventListener("submit", handleProfileEditModalSubmit);

profileAddButton.addEventListener("click", addCardPopup);
cardAddForm.addEventListener("submit", handleCardAddModalSubmit);

[...document.querySelectorAll(".modal")].forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal_opened") ||
      evt.target.classList.contains("modal__close")
    ) {
      closePopup(modal);
    }
  });
});

// cards filling
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsList.append(cardElement);
});

// adding validation to forms
const enableValidation = (config) => {
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidators[formElement.getAttribute("name")] = formValidator;
    formValidator.enableValidation();
  });
};

enableValidation(config);
