import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit} ) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
    // сброс полей формы
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    // при сабмите формы
    this._popupForm.addEventListener('submit', (evt) => {
      // отменим стандартное поведение
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
      super.close();
    });
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popupForm.querySelectorAll('.form__fild');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;

  }
};
