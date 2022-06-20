export default class Card {
  constructor( { item, handleCardClick }, templateSelector) {
    this._templateSelector = templateSelector;
    this._cardImageLink = item.link;
    this._name = item.name;
    this._cardImageAlt = "Фотография " + this._name
    this._handleCardClick = handleCardClick;
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
      this._cardImage = this._element.querySelector('.element__image');

      this._setEventListeners();

      this._cardImage.src = this._cardImageLink;
      this._cardImage.alt = this._cardImageAlt;
      this._element.querySelector('.element__title').textContent = this._name;

      return this._element;
    }

     _setEventListeners() {
      // Добавляем слушатель Like
      this._element.querySelector('.element__icon').addEventListener('click', evt => this._toggleLike(evt));
      // Добавляем слушатель Del
      this._deleteButton = this._element.querySelector('.element__basket');
      this._deleteButton.addEventListener('click', () => this._deleteCard());

      this._handleImageClick();
    }

    _toggleLike(evt) {
      // Обработчик Like
        evt.target.classList.toggle('element__icon_active');
    }

    _deleteCard() {
      // Обработчик Del
      this._deleteButton.closest('.element').remove();
    }

    _handleImageClick() {
      // Добавляем слушатель openPhotoPopup, передаём ему данные для отображения в открытом попапе
      this._cardImage.addEventListener('click', () => {
        // Передаём параметры функции создания попапа с увеличенной фотографией
        this._handleCardClick(this._name, this._cardImageLink, this._cardImageAlt)
      });
    }
}

