export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileTitle = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(userData) {
    this._profileTitle.textContent = userData.title;
    this._profileDescription.textContent = userData.description;
  }
}
