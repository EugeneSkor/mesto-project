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

const formElement = profilePopup.querySelector('.form');
const formFildset = formElement.querySelector('.form__fildset');
const nameInput = formFildset.querySelector('#formFildName');
const jobInput = formFildset.querySelector('#formFildAbout');

// For render cards

const cardTemplate = page.querySelector('#element').content;
const elements = content.querySelector('.elements');
const cardElements = elements.querySelector('.elements__grid');

// For new card popup

const newCardPopup = page.querySelector('#popupNewCard');
const addCardButton = profile.querySelector('.profile__button-add');
const popupNewCardContainer = newCardPopup.querySelector('.popup__container');

const newCardformElement = popupNewCardContainer.querySelector('.form');
const newCardformFildset = newCardformElement.querySelector('.form__fildset');
const placeInput = newCardformFildset.querySelector('#formFildPlace');
const linkInput = newCardformFildset.querySelector('#formFildLink');

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
  const activePopup = document.querySelector('.popup_opened');
  if (evt.which === 27) {
    closePopup(activePopup);
  };
};

function closeByOverlayClick (evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
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

function createCard(card) {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  // наполняем содержимым
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = card.link;
  cardImage.alt = "Фоторгафия " + card.name;
  cardElement.querySelector('.element__title').textContent = card.name;

  // отображаем на странице
  cardElements.prepend(cardElement);

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
    popupDescription.textContent = cardElement.querySelector('.element__title').textContent;
    openPopup(popupCardPhoto);
  });

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

  createCard(newCustomCard[0]);
  closePopup(newCardPopup);
};

//For Username form

editButton.addEventListener('click', openUserPopup);

formElement.addEventListener('submit', submitUserForm);

// For new card popup

addCardButton.addEventListener('click', function () {openPopup(newCardPopup)});

newCardformElement.addEventListener('submit', submitNewCardForm);

// Render cards

reverseInitialCards.forEach(createCard);
