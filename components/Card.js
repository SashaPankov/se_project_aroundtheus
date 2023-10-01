export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._imageLink = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardLikeElement.addEventListener("click", () => {
      this._changeLike();
    });
    this._cardDeleteElement.addEventListener("click", () => {
      this._deleteCard();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _changeLike() {
    this._cardLikeElement.classList.toggle("card__like-button_active");
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getCardTemplate() {
    console.log(`#${this._cardSelector}`);
    const cardElement = document
      .querySelector(`#${this._cardSelector}`)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getCardElement() {
    this._cardElement = this._getCardTemplate();
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardImageElement.src = this._imageLink;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;
    this._cardLikeElement =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteElement = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._setEventListeners();

    return this._cardElement;
  }

  getImageLink() {
    return this._imageLink;
  }

  getName() {
    return this._name;
  }
}
