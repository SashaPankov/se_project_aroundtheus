import {
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
import { api } from "../components/Api.js";
import "./index.css";

let cardList = null;
let cardToDelete = null;

const createCard = (cardData) => {
  const newCard = new Card(
    {
      data: cardData,
      handleCardClick: showImageModal,
      handleDeleteCardClick: deleteCardClick,
    },
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
  imagePopup.open(card.getCardData());
};

const deleteCardClick = (card) => {
  cardDeletePopup.setInputValues(card.getCardData());
  cardToDelete = card;
  cardDeletePopup.open();
};

const changeProfileAvatar = (userInfo) => {
  changeAvatarPopup.setInputValues(userInfo.getUserInfo());
  changeAvatarPopup.open();
};

// Event Listeners
profileEditButton.addEventListener("click", addProfileEditPopup);
profileAddButton.addEventListener("click", addCardPopup);

// creating class instances and initializing
const userInfo = new UserInfo(config, changeProfileAvatar);

const imagePopup = new PopupWithImage(config.popupImageSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(
  config.popupProfileSelector,
  (userData) => {
    userInfo.setUserInfo(userData);
    profilePopup.notifyUserSaving(true);
    api.updateUserInfo(userData).finally(() => {
      profilePopup.notifyUserSaving(false);
      profilePopup.close();
    });
  }
);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(config.popupAddCardSelector, (cardData) => {
  cardPopup.notifyUserSaving(true);
  api
    .addCard(cardData)
    .then((res) => {
      cardData._id = res._id;
      cardDara.isLiked = false;
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement, false);
    })
    .finally(() => {
      cardPopup.notifyUserSaving(false);
      cardPopup.close();
    });
});
cardPopup.setEventListeners();

const cardDeletePopup = new PopupWithForm(
  config.popupDeleteCardSelector,
  (cardData) => {
    api.deleteCard(cardData).finally(() => {
      cardDeletePopup.close();
      cardToDelete.deleteCard();
      cardToDelete = null;
    });
  }
);
cardDeletePopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm(
  config.popupChangeAvatarSelector,
  (userData) => {
    changeAvatarPopup.notifyUserSaving(true);
    api.changeAvatar(userData).finally(() => {
      changeAvatarPopup.notifyUserSaving(true);
      changeAvatarPopup.close();
      const allUserData = userInfo.getUserInfo();
      allUserData.avatar = userData.avatar;
      userInfo.setUserInfo(allUserData);
    });
  }
);
changeAvatarPopup.setEventListeners();

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData);
});

api.getInitialCards().then((cards) => {
  cardList = new Section(
    {
      items: cards,
      renderer: (cardData) => {
        cardList.addItem(createCard(cardData));
      },
    },
    config.cardsContainer
  );
  cardList.renderItems();
});

// adding validation to forms
const enableValidation = (config) => {
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    if (!(formElement.getAttribute("name") === "card-delete-confirm-form")) {
      const formValidator = new FormValidator(config, formElement);
      formValidators[formElement.getAttribute("name")] = formValidator;
      formValidator.enableValidation();
    }
  });
};

enableValidation(config);
