import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupPhoto = document.querySelector('.popup__photo');
    this._popupDescription = document.querySelector('.popup__description');
  }

  open(name, link, alt) {
    // Передаём информацию для открытия большой катринки из класса Card
    this._popupPhoto.src = link;
    this._popupPhoto.alt = alt;
    this._popupDescription.textContent = name;
    super.open();
  }

}
