export default class Card {
  constructor(cardData, templateSelector) {
    this._templateSelector = templateSelector
    this._caption = data.name;
    this._imageLink = data.link;
    this._imageAlt = data.alt;
    this._options = options;
    this._template = this._getTemplateElement(options.template);
    this._element = null;
    this._elementCaption = null;
    this._elementImage = null;
    this._elementLike = null;
    this._elementRemove = null;
  }

  _getTemplateElement(cardSelector) {
    return document.querySelector(templateSelector).content.querySelector(this._options.classCard);
  }

  _openImage() {
    openImage({
      link: this._imageLink,
      alt: this._imageAlt,
      name: this._caption,
    });
  }

  _toggleLike() {
    this._elementLike.classList.toggle(this._options.likeButtonActive);
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
    this._elementCaption = null;
    this._elementImage = null;
    this._elementLike = null;
    this._elementRemove = null;
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => this._openImage());
    this._elementLike.addEventListener("click", () => this._toggleLike());
    this._elementRemove.addEventListener("click", () => this._removeCard());
  }

  _getCardTemplate() {
    const cardElement = document.querySelector('.element').content.querySelector('.card').cloneNode(true);

    return cardElement;
  }


  createCard() {
    this._element = this._template.cloneNode(true);
    this._elementCaption = this._element.querySelector(this._options.caption);
    this._elementImage = this._element.querySelector(this._options.image);
    this._elementLike = this._element.querySelector(this._options.likeButton);
    this._elementRemove = this._element.querySelector(this._options.removeButton);

    this._elementCaption.textContent = this._caption;
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageAlt;

    this._setEventListeners();

    return this._element;
  }
}


const reverseInitialCards = initialCards.reverse();

// User info popup

const page = document.querySelector('.page');
const content = page.querySelector('.content');
const popUp = page.getElementsByClassName('popup');
const profile = content.querySelector('.profile');
const profileContainer = content.querySelector('.profile__container');
const profileInfo = profileContainer.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const editButton = profileContainer.querySelector('.profile__button-edit');

const profilePopup = page.querySelector('#popupUserInfo');
const userPopupContainer = profilePopup.querySelector('.popup__container');

const formProfileEdit = profilePopup.querySelector('.form');
const formFildset = formProfileEdit.querySelector('.form__fildset');
const nameInput = formFildset.querySelector('#formFildName');
const jobInput = formFildset.querySelector('#formFildAbout');

// For render cards

const cardTemplate = page.querySelector('#element').content;
const cardsSection = content.querySelector('.elements');
const cardsContainer = cardsSection.querySelector('.elements__grid');

// For new card popup

const newCardPopup = page.querySelector('#popupNewCard');
const addCardButton = profile.querySelector('.profile__button-add');
const popupNewCardContainer = newCardPopup.querySelector('.popup__container');

const newCardformElement = popupNewCardContainer.querySelector('.form');
const newCardformFildset = newCardformElement.querySelector('.form__fildset');
const placeInput = newCardformFildset.querySelector('#formFildPlace');
const linkInput = newCardformFildset.querySelector('#formFildLink');
const submitaddCardButton = newCardformElement.querySelector('.form__button');

// For photo popup

const popupCardPhoto = page.querySelector('#popupCardPhoto');
const popupPhotoframe = popupCardPhoto.querySelector('.popup__photoframe');
const popupPhoto = popupPhotoframe.querySelector('.popup__photo');
const popupDescription = popupPhotoframe.querySelector('.popup__description');

// Popup functions

function openPopup (popup) {
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlayClick);
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByOverlayClick);
  popup.classList.remove('popup_opened');
};

function closeByEsc (evt) {
  if (evt.which === 27) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

function closeByOverlayClick (evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

function openUserPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
}

function submitUserForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

const createCard = (card) => {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  // наполняем содержимым
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = card.link;
  cardImage.alt = "Фотография " + card.name;
  cardElement.querySelector('.element__title').textContent = card.name;

  // Добавляем слушатель Like
  cardElement.querySelector('.element__icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__icon_active');
  });

  // Добавляем слушатель Del
  const deleteButton = cardElement.querySelector('.element__basket');
  deleteButton.addEventListener('click', function () {
  deleteButton.closest('.element').remove();
  });

  // Добавляем слушатель openPhotoPopup
  cardImage.addEventListener('click', function () {
    popupPhoto.src = cardImage.src
    popupPhoto.alt = "Фоторгафия " + card.name;
    popupDescription.textContent = card.name;
    openPopup(popupCardPhoto);
  });

  return(cardElement)

};

const renderCard = (initialCards) => {
  initialCards.forEach((item) => {
    cardsContainer.prepend(createCard(item));
  })
}

// Disabled button
function disabledButton (button) {
  button.classList.add('form__button_disabled');
  button.setAttribute("disabled", "disabled");
};

// Add new card
function submitNewCardForm (evt) {
  evt.preventDefault();

  const newCustomCard = [
    {
     name: `${placeInput.value}`,
     link: `${linkInput.value}`
    }
  ];

  cardsContainer.prepend(createCard(newCustomCard[0]));
  closePopup(newCardPopup);
  newCardformElement.reset()
  disabledButton(submitaddCardButton)
};

//For Username form

editButton.addEventListener('click', openUserPopup);

formProfileEdit.addEventListener('submit', submitUserForm);

// For new card popup

addCardButton.addEventListener('click', function () {openPopup(newCardPopup)});

newCardformElement.addEventListener('submit', submitNewCardForm);

// Render cards
renderCard(initialCards)
