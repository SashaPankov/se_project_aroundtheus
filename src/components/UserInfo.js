export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileTitle = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo({ newName, newDescription }) {
    this._profileTitle.textContent = newName;
    this._profileDescription.textContent = newDescription;
  }
}
