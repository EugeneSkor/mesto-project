import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector, handleFormSubmit} ) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(id) {
    this._id = id;
    console.log(this._id)
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    // при сабмите формы
    this._popupForm.addEventListener('submit', (evt) => {
      // отменим стандартное поведение
      evt.preventDefault();
      // возвращаем функции id карточки для удаления
      this._handleFormSubmit(this._id);
      super.close();
    });
  }

};
