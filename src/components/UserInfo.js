export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return { name: this._nameSelector.textContent, description: this._descriptionSelector.textContent }
  }

  setUserInfo(inputs) {
    this._nameSelector.textContent = inputs.name;
    this._descriptionSelector.textContent = inputs.about;
  }
}
