import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }, name, link, alt) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._popupPhoto = popupSelector.querySelector('.popup__photo');
    this._popupDescription = popupSelector.querySelector('.popup__description');
  }

  open() {
    // Передаём информацию для открытия большой катринки из класса Card
    this._popupPhoto.src = this._link;
    this._popupPhoto.alt = this._alt;
    this._popupDescription.textContent = this._name;
    super.open();
  }

}
