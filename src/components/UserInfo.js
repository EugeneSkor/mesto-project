export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { name: this._userName.textContent, description: this._userDescription.textContent }
  }

  setUserInfo(inputs) {
    this.userId = inputs._id;
    this._userName.textContent = inputs.name;
    this._userDescription.textContent = inputs.about;
    this._userAvatar.src = inputs.avatar;
  }

  returnUserId() {
    return this.userId
  }

}
