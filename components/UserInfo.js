export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._profileName = document.querySelector('.profile__name');
    this._profileDescription = document.querySelector('.profile__description');
  }

  getUserInfo() {
    return { name: this._nameSelector.textContent, description: this._descriptionSelector.textContent }
  }

  setUserInfo(inputs) {
    this._profileName.textContent = inputs.name;
    this._profileDescription.textContent = inputs.about;
  }
}
