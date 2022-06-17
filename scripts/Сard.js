export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._cardImageLink = data.link;
    this._name = data.name;
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
      this._toggleLike();
      this._deleteCard();
      this._handleImageClick();
    }

    _toggleLike() {
      // Добавляем слушатель Like
      this._element.querySelector('.element__icon').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__icon_active');
      });
    }

    _deleteCard() {
      // Добавляем слушатель Del
      this._deleteButton = this._element.querySelector('.element__basket');
      this._deleteButton.addEventListener('click', () => {
      this._deleteButton.closest('.element').remove();
      });
    }

    _handleImageClick() {
      // Добавляем слушатель openPhotoPopup, передаём ему данные для отображения в открытом попапе
      this._cardImage.addEventListener('click', () => {
        // Передаём параметры функции создания попапа с увеличенной фотографией
        /* const photoInfo = {
          name: this._name,
          link: this._cardImageLink,
          alt: this._cardImageAlt
        }
        this._handleCardClick(this._name, this._cardImageLink, this._cardImageAlt)*/
        this._handleCardClick(this._name, this._cardImageLink, this._cardImageAlt)
      });
    }
}

