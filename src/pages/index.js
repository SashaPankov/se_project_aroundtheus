import {
  config,
  formValidators,
  profileEditButton,
  profileEditForm,
  profileAddButton,
  cardAddForm,
  formList,
  avatarChangeForm,
  profileAvatar,
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
      handleLikeClick: likeCardClick,
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

const likeCardClick = (cardData) => {
  return api.toggleLike(cardData).catch((err) => {
    alert(err);
  });
};

const changeProfileAvatar = () => {
  changeAvatarPopup.setInputValues(userInfo.getUserInfo());
  formValidators[avatarChangeForm.getAttribute("name")].resetValidation();
  changeAvatarPopup.open();
};

// Event Listeners
profileEditButton.addEventListener("click", addProfileEditPopup);
profileAddButton.addEventListener("click", addCardPopup);
profileAvatar.addEventListener("click", changeProfileAvatar);

// creating class instances and initializing
const userInfo = new UserInfo(config);

const imagePopup = new PopupWithImage(config.popupImageSelector);
imagePopup.setEventListeners();

function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

const profilePopup = new PopupWithForm(
  config.popupProfileSelector,
  (userData) => {
    function makeRequest() {
      return api.updateUserInfo(userData).then((res) => {
        userInfo.setUserInfo(userData);
      });
    }
    handleSubmit(makeRequest, profilePopup);
  }
);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(config.popupAddCardSelector, (cardData) => {
  function makeRequest() {
    return api.addCard(cardData).then((res) => {
      cardData._id = res._id;
      cardData.isLiked = false;
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement, false);
    });
  }
  handleSubmit(makeRequest, cardPopup);
});
cardPopup.setEventListeners();

const cardDeletePopup = new PopupWithForm(
  config.popupDeleteCardSelector,
  (cardData) => {
    function makeRequest() {
      return api.deleteCard(cardData).then((res) => {
        cardToDelete.deleteCard();
      });
    }
    handleSubmit(makeRequest, cardDeletePopup, "Deleting...");
  }
);
cardDeletePopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm(
  config.popupChangeAvatarSelector,
  (userData) => {
    function makeRequest() {
      return api.changeAvatar(userData).then((res) => {
        const allUserData = userInfo.getUserInfo();
        allUserData.avatar = userData.avatar;
        userInfo.setUserInfo(allUserData);
      });
    }
    handleSubmit(makeRequest, changeAvatarPopup);
  }
);
changeAvatarPopup.setEventListeners();

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    alert(err);
  });

api
  .getInitialCards()
  .then((cards) => {
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
  })
  .catch((err) => {
    alert(err);
  });

// adding validation to forms
const enableValidation = (config) => {
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    if (!(formElement.getAttribute("name") === config.confirmCardDeleteForm)) {
      const formValidator = new FormValidator(config, formElement);
      formValidators[formElement.getAttribute("name")] = formValidator;
      formValidator.enableValidation();
    }
  });
};

enableValidation(config);
