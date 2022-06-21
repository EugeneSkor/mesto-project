export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // Привязываем функцию удаления к контексту this, чтобы передавать передавать обработчику функцию без потери контекста.
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');

  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');

  }

  _handleEscClose(evt) {
    // При нажатии клавиши Escape
    if (evt.key === 'Escape') {
      this.close();
    };

  }

  _handleOverlayClickClose (evt) {
    // Если кликнули не по попапу или по иконке закрытия
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close();
    };
  };

  setEventListeners() {
    document.addEventListener('mousedown', (evt) => {
      this._handleOverlayClickClose(evt);
    });
  }
}
