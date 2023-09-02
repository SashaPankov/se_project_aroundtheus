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
const profileCloseButton = document.querySelector("#profile-close-button");
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

const cardAddButton = document.querySelector("#card-add-button");
const cardCloseButton = document.querySelector("#card-close-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageURLInput = document.querySelector("#card-imageURL-input");
const cardAddForm = document.forms["card-add-form"];

const cardImageModal = document.querySelector("#image-view-modal");
const modalImage = document.querySelector(".modal__image");
const imageCloseButton = document.querySelector("#image-close-button");
const modalCardTitle = document.querySelector(".modal__card-title");

// Functions
function closePopup(evt) {
  if (cardImageModal.classList.contains("modal_opened")) {
    cardImageModal.classList.remove("modal_opened");
    return;
  }

  (profileEditModal.classList.contains("modal_opened")
    ? profileEditModal
    : cardAddModal
  ).classList.remove("modal_opened");
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
  closePopup();
}

function handleCardAddModalSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: cardTitleInput.value, link: cardImageURLInput.value };

  cardsList.prepend(getCardElement(newCard));
  closePopup();
}

function changeLike(evt) {
  evt.target.style.backgroundImage = evt.target.style.backgroundImage.includes(
    "inactive"
  )
    ? "url('../images/like-active.svg')"
    : "url('../images/like-inactive.svg')";
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function showImageModal(evt) {
  modalImage.src = evt.target.src;
  modalImage.alt = evt.target.alt;
  modalCardTitle.textContent = evt.target.alt;

  cardImageModal.classList.add("modal_opened");
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileCloseButton.addEventListener("click", closePopup);
profileEditForm.addEventListener("submit", handleProfileEditModalSubmit);

cardAddButton.addEventListener("click", () => {
  cardTitleInput.value = "Title";
  cardImageURLInput.value = "Image URL";
  cardAddModal.classList.add("modal_opened");
});
cardCloseButton.addEventListener("click", closePopup);
cardAddForm.addEventListener("submit", handleCardAddModalSubmit);

imageCloseButton.addEventListener("click", closePopup);

// cards filling
initialCards.forEach((cardData) => {
  cardsList.append(getCardElement(cardData));
});
