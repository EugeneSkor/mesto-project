import Card from "./Сard.js";
import { formSettings, FormValidator } from "./FormValidator.js"
import initialCards from "./cards.js"

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

const newCardform = document.forms.newPlace;
const newCardformFildset = newCardform.querySelector('.form__fildset');
const placeInput = newCardformFildset.querySelector('#formFildPlace');
const linkInput = newCardformFildset.querySelector('#formFildLink');

// For photo popup

const popupCardPhoto = page.querySelector('#popupCardPhoto');
const popupPhotoframe = popupCardPhoto.querySelector('.popup__photoframe');
const popupPhoto = popupPhotoframe.querySelector('.popup__photo');
const popupDescription = popupPhotoframe.querySelector('.popup__description');

// For validation
const userDataFormValidator = new FormValidator(formSettings, document.forms.userdata);
userDataFormValidator.enableValidation();
const newPlaceFormValidator = new FormValidator(formSettings, newCardform);
newPlaceFormValidator.enableValidation();

// Popup functions
/*
function openPopup (popup) {
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('mousedown', closeByOverlayClick);
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('mousedown', closeByOverlayClick);
  popup.classList.remove('popup_opened');
};

function closeByEsc (evt) {
  if (evt.key === 'Escape') {
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
*/

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

function openNewCardPopup() {
  newCardform.reset();
  newPlaceFormValidator.resetValidation();
  openPopup(newCardPopup);
}

// Функция создаёт и открывает попап с увеличенной картинкой,
//данные на вход передаются при добавлении обработчика клика на фотографию
//при создании экземпляра карточки, по этому ему нужно передать эту функцию в коструктор Card
export function handleCardClick(name, link, alt) {
  /*export function handleCardClick(photoInfo) {*/
  // Передаём ссылку на картинку из класса Card
  const photoPopup = new PopupWithImage(popupCardPhoto, name, link, alt);
  photoPopup.open;
}

/* export function handleCardClick(name, link, alt) {
  // Передаём ссылку на картинку из класса Card
  popupPhoto.src = link;
  popupPhoto.alt = alt;
  popupDescription.textContent = name;
  /*openPopup(popupCardPhoto);
}*/

function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, '#element', handleCardClick);
  // Создаём карточку
  const cardElement = card.generateCard();
// Возвращаем готовую карточку
return cardElement
}

const renderCards = () => {
  reverseInitialCards.forEach((item) => {
  // Создаём карточку
  const cardElement = createCard(item);
  // Добавляем в DOM
  cardsContainer.prepend(cardElement);
  })
};

renderCards();

// Add new card
function submitNewCardForm (evt) {
  evt.preventDefault();

  const newCustomCard =
    {
     name: `${placeInput.value}`,
     link: `${linkInput.value}`
    }
  ;

  // Вставляем новую карточку
  cardsContainer.prepend(createCard(newCustomCard));
  closePopup(newCardPopup);
};


//For Username form

editButton.addEventListener('click', openUserPopup);

formProfileEdit.addEventListener('submit', submitUserForm);

// For new card popup

addCardButton.addEventListener('click', function () {openNewCardPopup()});

newCardform.addEventListener('submit', submitNewCardForm);

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}




class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.setEventListeners()
    this._popupSelector.classList.add('popup_opened');

  }

  close() {
    this._removeEventListeners()
    this._popupSelector.classList.remove('popup_opened');

  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(this._popupSelector);
    };

  }

  _handleOverlayClickClose (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close(this._popupSelector);
    };
  };

  setEventListeners() {
    this._popupSelector.addEventListener('keydown', this._handleEscClose);
    this._popupSelector.addEventListener('mousedown', this._handleOverlayClickClose);
  }

  _removeEventListeners() {
    this._popupSelector.removeEventListener('keydown', closeByEsc);
    this._popupSelector.removeEventListener('mousedown', closeByOverlayClick);

  }

}


class PopupWithImage extends Popup {
  constructor(popupSelector, name, link, alt) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._popupPhoto = popupSelector.querySelector('.popup__photo');
    this._popupDescription = popupSelector.querySelector('.popup__description');
  }

  open() {
    this._popupSelector.setEventListeners()
    this._popupPhoto.src = this._link;
    this._popupPhoto.alt = this._alt;
    this._popupDescription.textContent = this._name;
    this._popupSelector.classList.add('popup_opened');
  }

}


class PopupWithForm extends Popup {
  constructor(popupSelector, name, link, alt) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._popupPhoto = popupSelector.querySelector('.popup__photo');
    this._popupDescription = popupSelector.querySelector('.popup__description');
  }

  open() {
    this._popupSelector.setEventListeners()
    this._popupPhoto.src = this._link;
    this._popupPhoto.alt = this._alt;
    this._popupDescription.textContent = this._name;
    this._popupSelector.classList.add('popup_opened');
  }

}

const userInfo = {
  nameSelector:
  infoSelector:

}

class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

  }

  setUserInfo() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  }

  const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const editButton = profileContainer.querySelector('.profile__button-edit');

const profilePopup = page.querySelector('#popupUserInfo');
const userPopupContainer = profilePopup.querySelector('.popup__container');

const formProfileEdit = profilePopup.querySelector('.form');
const formFildset = formProfileEdit.querySelector('.form__fildset');
const nameInput = formFildset.querySelector('#formFildName');
const jobInput = formFildset.querySelector('#formFildAbout');

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
}



