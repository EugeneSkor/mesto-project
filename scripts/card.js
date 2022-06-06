import { popupPhoto, popupDescription, openPopup, popupCardPhoto  } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._link = data.link
    this._name = data.name
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

      this._cardImage = this._element.querySelector('.element__image');
      this._cardImage.src = this._link;
      this._cardImage.alt = "Фотография " + this._name;
      this._cardElement.querySelector('.element__title').textContent = this._name;

      return this._element;
    }

    _setEventListeners() {

      // Добавляем слушатель Like
      this._cardElement.querySelector('.element__icon').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__icon_active');
      });

      // Добавляем слушатель Del
      this._deleteButton = this._cardElement.querySelector('.element__basket');
      this._deleteButton.addEventListener('click', () => {
      this._deleteButton.closest('.element').remove();
      });

      // Добавляем слушатель openPhotoPopup
      this._cardImage.addEventListener('click', () => {
        popupPhoto.src = cardImage.src
        popupPhoto.alt = "Фоторгафия " + this._name;
        popupDescription.textContent = this._name;
        openPopup(popupCardPhoto);
      });

    }
  }

