import Card from "../components/Card.js";
import {
  EditProfileFormValidator,
  AddLocationFormValidator,
} from "../components/FormValidator.js";

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

const cardImageModal = document.querySelector("#image-view-modal");
const modalImage = document.querySelector(".modal__image");
const modalCardTitle = document.querySelector(".modal__card-title");

// Functions
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
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

// Event Handlers
function handleProfileEditModalSubmit(evt) {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

export function showImageModal(card) {
  modalImage.src = card.getImageLink();
  modalCardTitle.textContent = card.getName();
  modalImage.alt = modalCardTitle.textContent;

  openPopup(cardImageModal);
  document.addEventListener("keydown", closeByEscape);
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditModalSubmit);

profileAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

cardImageModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal_opened") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(cardImageModal);
    document.removeEventListener("keydown", closeByEscape);
  }
});

// cards filling
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "card-template", showImageModal);
  cardsList.append(card.getCardElement());
});

// adding validation to forms
[...document.querySelectorAll(config.formSelector)].forEach((formElement) => {
  const formValidator =
    formElement.name === "profile-edit-form"
      ? new EditProfileFormValidator(config, formElement)
      : new AddLocationFormValidator(config, formElement);
  formValidator.enableValidation();
});
