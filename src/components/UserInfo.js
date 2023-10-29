export default class UserInfo {
  constructor(
    { profileNameSelector, profileDescriptionSelector, profileAvatarSelector },
    changeAvatarHandler
  ) {
    this._profileTitle = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
    this._profileAvatar = document.querySelector(profileAvatarSelector);
    this._handleChangeAvatarClick = changeAvatarHandler;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._profileAvatar.addEventListener("click", () => {
      this._handleChangeAvatarClick(this);
    });
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  setUserInfo(userData) {
    this._profileTitle.textContent = userData.name;
    this._profileDescription.textContent = userData.about;
    if ("avatar" in userData) {
      this._profileAvatar.src = userData.avatar;
    }
  }
}
