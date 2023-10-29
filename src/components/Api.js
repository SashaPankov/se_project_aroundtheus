class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._spinner = document.querySelector(".spinner");
  }

  _sendRequest(root, options) {
    return fetch(`${this._baseUrl}${root}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getInitialCards() {
    return this._sendRequest("/cards", {
      method: "GET",
      headers: this._headers,
    });
  }

  // other methods for working with the API
  getUserInfo() {
    return this._sendRequest("/users/me", {
      method: "GET",
      headers: this._headers,
    });
  }

  updateUserInfo(userData) {
    return this._sendRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: this._headers,
    });
  }

  changeAvatar(userData) {
    return this._sendRequest("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: this._headers,
    });
  }

  addCard(cardData) {
    return this._sendRequest("/cards", {
      method: "POST",
      body: JSON.stringify(cardData),
      headers: this._headers,
    });
  }

  deleteCard(cardData) {
    return this._sendRequest(`/cards/${cardData._id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardData) {
    return this._sendRequest(`/cards/${cardData._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  dislikeCard(cardData) {
    return this._sendRequest(`/cards/${cardData._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "25ffaa89-09a6-4b6f-aa28-dd4c48c6dd4d",
    "Content-Type": "application/json",
  },
});
