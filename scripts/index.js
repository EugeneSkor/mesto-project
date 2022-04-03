// Cards

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// User info popup

let page = document.querySelector('.page');
let content = page.querySelector('.content');
let profile = content.querySelector('.profile');
let profileContainer = content.querySelector('.profile__container');
let profileInfo = profileContainer.querySelector('.profile__info');
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');
let editButton = profileContainer.querySelector('.profile__button-edit');

let profilePopup = page.querySelector('#popupUserInfo');
let popupContainer = profilePopup.querySelector('.popup__container');
let closePopupButton = popupContainer.querySelector('.popup__close');

let formElement = profilePopup.querySelector('.form');
let formFildset = formElement.querySelector('.form__fildset');
let nameInput = formFildset.querySelector('#formFildName');
let jobInput = formFildset.querySelector('#formFildAbout');

// Render cards

let cardTemplate = page.querySelector('#element').content;
let elements = content.querySelector('.elements');
let cardElements = document.querySelector('.elements__grid');

// перебираем каждый элемент массива с информацией о карточках
initialCards.forEach(function (card) {

// клонируем содержимое тега template
let cardElement = cardTemplate.querySelector('.element').cloneNode(true);

// наполняем содержимым
cardElement.querySelector('.element__image').src = card.link;
cardElement.querySelector('.element__image').alt = "Фоторгафия " + card.name;
cardElement.querySelector('.element__title').textContent = card.name;

// отображаем на странице
cardElements.append(cardElement);
});

// For new card popup

let newCardPopup = page.querySelector('#popupNewCard');
let addCardButton = profile.querySelector('.profile__button-add');
let popupNewCardContainer = newCardPopup.querySelector('.popup__container');
let closeNewCardPopupButton = popupNewCardContainer.querySelector('.popup__close');

let newCardformElement = popupNewCardContainer.querySelector('.form');
let newCardformFildset = newCardformElement.querySelector('.form__fildset');
let placeInput = newCardformFildset.querySelector('#formFildPlace');
let linkInput = newCardformFildset.querySelector('#formFildLink');

//For Username form

function openPopup() {
  profilePopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent
  jobInput.value = profileDescription.textContent
}

function closePopup() {
  profilePopup.classList.remove('popup_opened');
}

function submitForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup();
}

editButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', submitForm);

// For new card popup

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

addCardButton.addEventListener('click', function () {togglePopup(newCardPopup)});

closeNewCardPopupButton.addEventListener('click', function () {togglePopup(newCardPopup)});

// Add new card

function submitNewCardForm (evt) {
  evt.preventDefault();

  // клонируем содержимое тега template
  let cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.element__image').src = linkInput.value;
  cardElement.querySelector('.element__image').alt = "Фоторгафия " + placeInput.value;
  cardElement.querySelector('.element__title').textContent = placeInput.value;

  // отображаем на странице
  cardElements.prepend(cardElement);

  togglePopup(newCardPopup);
};

newCardformElement.addEventListener('submit', submitNewCardForm);
