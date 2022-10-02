export default class Card {
  constructor( { item, userId, handleCardClick, handleLikeClick, delCardClick }, templateSelector) {
    this._templateSelector = templateSelector;
    this._cardImageLink = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._cardImageAlt = "Фотография " + this._name
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._delCardClick = delCardClick;
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
      this._likeCount = this._element.querySelector('.element__counter')
      this._likeCount.textContent = this._likes.length;
      // Если не совпадает ID пользователя и ID карточки - скрываем иконку корзины
      if (this._userId === this._ownerId) {
        this._deleteButton.classList.add("element__basket_visible");
      } else {
        this._deleteButton.classList.remove("element__basket_visible");
      }

      return this._element;
    }

     _setEventListeners() {
      // Добавляем слушатель Like
      this._like = this._element.querySelector('.element__icon')
      this._like.addEventListener('click', evt => this._toggleLike(evt));
      // Добавляем слушатель Del
      //this._deleteButton = this._element.querySelector('.element__basket');
      //this._deleteButton.addEventListener('click', () => this._deleteCard());

      this._handleImageClick();
      this._handleDelCardClick();
    }

    _toggleLike(evt) {
      // Обработчик Like
        evt.target.classList.toggle('element__icon_active');
        this._likeCheck()
    }

    _likeCheck() {
      // Если лайк до нажатия не был активен отправляем на сервер
      if (this._like.classList.contains('element__icon_active'))
        return this._handleLikeClick(true, this._cardId);
      //  Если лайк до нажатия был активен удаляем
      else return this._handleLikeClick(false, this._cardId);
    }


    _handleDelCardClick() {
      // Добавляем слушатель Del
      this._deleteButton = this._element.querySelector('.element__basket');
      // При клике активируем фунцию открытия попапа с подтверждением
      this._deleteButton.addEventListener('click', () => {
        // Передаём в неё Id карточки
        this._delCardClick(this._cardId)

        console.log(this._cardId)
      })
    }

    _deleteCard() {
      // Обработчик Del
      this._element.remove();
      // занулить элемент, чтобы он удалился не только из разметки, но и не загружал оперативную память
      this._element = null;
    }

    _handleImageClick() {
      // Добавляем слушатель openPhotoPopup, передаём ему данные для отображения в открытом попапе
      this._cardImage.addEventListener('click', () => {
        // Передаём параметры функции создания попапа с увеличенной фотографией
        this._handleCardClick(this._name, this._cardImageLink, this._cardImageAlt)
      });
    }
}

