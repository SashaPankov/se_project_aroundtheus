import { initialCards, config } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const formValidators = {};

// Elements
const profileEditButton = document.querySelector(
  config.profileEditButtonSelector
);

const profileEditForm = document.forms[config.profileEditForm];
const profileAddButton = document.querySelector(config.cardAddButtonSelector);

const cardAddForm = document.forms[config.cardAddForm];

const formList = [...document.querySelectorAll(config.formSelector)];

// Functions
function createCard(cardData) {
  const newCard = new Card(
    { data: cardData, handleCardClick: showImageModal },
    config.cardSelector
  );
  return newCard.getCardElement();
}

function addProfileEditPopup() {
  profilePopup.setInputValues(userInfo.getUserInfo());
  formValidators[profileEditForm.getAttribute("name")].resetValidation();
  profilePopup.open();
}

function addCardPopup() {
  formValidators[cardAddForm.getAttribute("name")].resetValidation();
  cardPopup.open();
}

export function showImageModal(card) {
  imagePopup.open(card.getImageLink(), card.getName());
}

// Event Listeners
profileEditButton.addEventListener("click", addProfileEditPopup);
profileAddButton.addEventListener("click", addCardPopup);

// creating class instances and initializing

const userInfo = new UserInfo(config);

const imagePopup = new PopupWithImage(config.popupImageSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(config.popupProfileSelector, () => {
  userInfo.setUserInfo(profilePopup._getInputValues());
  profilePopup.close();
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(config.popupAddCardSelector, () => {
  const cardElement = createCard(cardPopup._getInputValues());
  cardList.addItem(cardElement, false);
  cardPopup.close();
});
cardPopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardList.addItem(createCard(cardData));
    },
  },
  config.cardsContainer
);
cardList.renderItems();

// adding validation to forms
const enableValidation = (config) => {
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const formValidator = new FormValidator(config, formElement);
    formValidators[formElement.getAttribute("name")] = formValidator;
    formValidator.enableValidation();
  });
};

enableValidation(config);
