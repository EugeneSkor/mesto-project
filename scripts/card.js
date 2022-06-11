import { openPopup, popupPhoto, popupDescription } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._cardImage = data.link;
    this._name = data.name;
    this._cardImageAlt = "Фотография " + this._name

    }

    _getTemplate() {
      this._cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

      return this._cardElement;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();

      this._element.querySelector('.element__image').src = this._cardImage;
      this._element.querySelector('.element__image').alt = this._cardImageAlt;
      this._element.querySelector('.element__title').textContent = this._name;

      return this._element;
    }

    _setEventListeners() {

      // Добавляем слушатель Like
      this._element.querySelector('.element__icon').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__icon_active');
      });

      // Добавляем слушатель Del
      this._deleteButton = this._element.querySelector('.element__basket');
      this._deleteButton.addEventListener('click', () => {
      this._deleteButton.closest('.element').remove();
      });

      // Добавляем слушатель openPhotoPopup
      this._element.querySelector('.element__image').addEventListener('click', () => {
        popupPhoto.src = this._cardImage
        popupPhoto.alt = this._cardImageAlt;
        popupDescription.textContent = this._name;
        openPopup(popupCardPhoto);
      });

    }
}

