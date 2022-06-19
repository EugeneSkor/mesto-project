export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this.setEventListeners();
    this._popupSelector.classList.add('popup_opened');

  }

  close() {
    this._removeEventListeners()
    this._popupSelector.classList.remove('popup_opened');

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
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    document.addEventListener('mousedown', (evt) => {
      this._handleOverlayClickClose(evt);
    });
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    document.removeEventListener('mousedown', (evt) => {
      this._handleOverlayClickClose(evt);
    });
  }
}
