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
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");
const profileAddButton = document.querySelector("#profile-add-button");

const cardAddModal = document.querySelector("#card-add-modal");
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageURLInput = document.querySelector("#card-imageURL-input");
const cardAddForm = document.forms["card-add-form"];

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
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeElement = cardElement.querySelector(".card__like-button");
  const cardDeleteElement = cardElement.querySelector(".card__delete-button");

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  cardLikeElement.addEventListener("click", changeLike);
  cardDeleteElement.addEventListener("click", deleteCard);
  cardImageElement.addEventListener("click", showImageModal);
  return cardElement;
}

// Event Handlers
function handleProfileEditModalSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardAddModalSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: cardTitleInput.value, link: cardImageURLInput.value };
  cardsList.prepend(getCardElement(newCard));
  closePopup(cardAddModal);
  evt.target.reset();
}

function changeLike(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function showImageModal(evt) {
  modalImage.src = evt.target.src;
  modalImage.alt = evt.target.alt;
  modalCardTitle.textContent = evt.target.alt;

  openPopup(cardImageModal);
}

// Event Listeners
const closeButtons = document.querySelectorAll(".modal__close");

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditModalSubmit);

profileAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

cardAddForm.addEventListener("submit", handleCardAddModalSubmit);

[...document.querySelectorAll(".modal")].forEach((modal) => {
  modal.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});

// cards filling
initialCards.forEach((cardData) => {
  cardsList.append(getCardElement(cardData));
});
