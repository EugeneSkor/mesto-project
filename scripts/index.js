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

const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');
const profileContainer = content.querySelector('.profile__container');
const profileInfo = profileContainer.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const editButton = profileContainer.querySelector('.profile__button-edit');

const profilePopup = page.querySelector('#popupUserInfo');
const popupContainer = profilePopup.querySelector('.popup__container');
const closePopupButton = popupContainer.querySelector('.popup__close');

const formElement = profilePopup.querySelector('.form');
const formFildset = formElement.querySelector('.form__fildset');
const nameInput = formFildset.querySelector('#formFildName');
const jobInput = formFildset.querySelector('#formFildAbout');

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

// Render cards

const cardTemplate = page.querySelector('#element').content;
const elements = content.querySelector('.elements');
const cardElements = document.querySelector('.elements__grid');

// перебираем каждый элемент массива с информацией о карточках
initialCards.forEach(function (card) {

// клонируем содержимое тега template
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

// наполняем содержимым
cardElement.querySelector('.element__image').src = card.link;
cardElement.querySelector('.element__image').alt = "Фоторгафия " + card.name;
cardElement.querySelector('.element__title').textContent = card.name;

// отображаем на странице
cardElements.append(cardElement);

// Like
cardElement.querySelector('.element__icon').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__icon_active');
});

// Delete card
const deleteButton = cardElement.querySelector('.element__basket');

deleteButton.addEventListener('click', function () {
  const listItem = deleteButton.closest('.element');
  listItem.remove();
});

// For photo popup

const popupCardPhoto = page.querySelector('#popupCardPhoto');
const elementImage = cardElement.querySelector('.element__image');
const popupPhotoframe = popupCardPhoto.querySelector('.popup__photoframe');
const closePhotoframe = popupPhotoframe.querySelector('.popup__close');
const popupPhoto = popupPhotoframe.querySelector('.popup__photo');
const popupDescription = popupPhotoframe.querySelector('.popup__description');

// open photo popup
elementImage.addEventListener('click', function () {
  popupPhoto.src = elementImage.src
  popupDescription.textContent = cardElement.querySelector('.element__title').textContent;
  popupCardPhoto.classList.add('popup_opened');
});

// close photo popup
closePhotoframe.addEventListener('click', function () {
  popupCardPhoto.classList.remove('popup_opened');
  popupPhoto.src = ''
  popupDescription.textContent = '';
});

});

// For new card popup

const newCardPopup = page.querySelector('#popupNewCard');
const addCardButton = profile.querySelector('.profile__button-add');
const popupNewCardContainer = newCardPopup.querySelector('.popup__container');
const closeNewCardPopupButton = popupNewCardContainer.querySelector('.popup__close');

const newCardformElement = popupNewCardContainer.querySelector('.form');
const newCardformFildset = newCardformElement.querySelector('.form__fildset');
const placeInput = newCardformFildset.querySelector('#formFildPlace');
const linkInput = newCardformFildset.querySelector('#formFildLink');

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
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.element__image').src = linkInput.value;
  cardElement.querySelector('.element__image').alt = "Фоторгафия " + placeInput.value;
  cardElement.querySelector('.element__title').textContent = placeInput.value;

  // отображаем на странице
  cardElements.prepend(cardElement);

  togglePopup(newCardPopup);
  linkInput.value = '';
  placeInput.value = '';
};

// Submit form new card
newCardformElement.addEventListener('submit', submitNewCardForm);


