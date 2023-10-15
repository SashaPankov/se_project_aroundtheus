import {
  initialCards,
  config,
  formValidators,
  profileEditButton,
  profileEditForm,
  profileAddButton,
  cardAddForm,
  formList,
} from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const createCard = (cardData) => {
  const newCard = new Card(
    { data: cardData, handleCardClick: showImageModal },
    config.cardSelector
  );
  return newCard.getCardElement();
};

const addProfileEditPopup = () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  formValidators[profileEditForm.getAttribute("name")].resetValidation();
  profilePopup.open();
};

const addCardPopup = () => {
  formValidators[cardAddForm.getAttribute("name")].resetValidation();
  cardPopup.open();
};

const showImageModal = (card) => {
  imagePopup.open(card.getImageLink(), card.getName());
};

// Event Listeners
profileEditButton.addEventListener("click", addProfileEditPopup);
profileAddButton.addEventListener("click", addCardPopup);

// creating class instances and initializing
const userInfo = new UserInfo(config);

const imagePopup = new PopupWithImage(config.popupImageSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(
  config.popupProfileSelector,
  (userData) => {
    userInfo.setUserInfo(userData);
    profilePopup.close();
  }
);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(config.popupAddCardSelector, (cardData) => {
  const cardElement = createCard(cardData);
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
