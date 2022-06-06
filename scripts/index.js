// import Card from "./card.js";
//import { initialCards } from "./cards.js"

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

/*export */const popupCardPhoto = page.querySelector('#popupCardPhoto');
const popupPhotoframe = popupCardPhoto.querySelector('.popup__photoframe');
/*export*/ const popupPhoto = popupPhotoframe.querySelector('.popup__photo');
/*export*/ const popupDescription = popupPhotoframe.querySelector('.popup__description');

// Popup functions

/*export*/ function openPopup (popup) {
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

/*

class Card {
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
  } */




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

/*
const renderCard = (isGrid) => {
  cardsContainer.innerHTML = '';
  initialCards.forEach((item) => {
    const card = isGrid
    new Card(item, '.element')
    const cardElement = card.generateCard();
    console.log(cardElement)
    cardsContainer.append(cardElement);
  });
};
*/

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
