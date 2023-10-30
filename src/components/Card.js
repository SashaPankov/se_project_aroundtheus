export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteCardClick, handleLikeClick },
    cardSelector
  ) {
    this._id = data._id;
    this._name = data.name;
    this._imageLink = data.link;
    this._isLiked = data.isLiked;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardLikeElement.addEventListener("click", () => {
      this._changeLike();
    });
    this._cardDeleteElement.addEventListener("click", () => {
      this._handleDeleteCardClick(this);
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleCardClick(this);
    });
  }

  _changeLike() {
    this._handleLikeClick(this.getCardData()).then((res) => {
      this._isLiked = !this._isLiked;
      this._cardLikeElement.classList.toggle("card__like-button_active");
    });
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
    if (this._isLiked) {
      this._cardLikeElement.classList.add("card__like-button_active");
    }

    return this._cardElement;
  }

  getCardData() {
    return {
      _id: this._id,
      link: this._imageLink,
      name: this._name,
      isLiked: this._isLiked,
    };
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
