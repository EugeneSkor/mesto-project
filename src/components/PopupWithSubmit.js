import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector, handleFormSubmit} ) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(id, cardObject) {
    this._id = id;
    this._cardObject = cardObject;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    // при сабмите формы
    this._popupForm.addEventListener('submit', (evt) => {
      // отменим стандартное поведение
      evt.preventDefault();
      // возвращаем функции id карточки и карточку из DOM для удаления
      this._handleFormSubmit(this._id, this._cardObject);
    });
  }

};
