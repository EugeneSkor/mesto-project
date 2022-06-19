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

export const reverseInitialCards = initialCards.reverse();

// User info popup

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const editButton = document.querySelector('.profile__button-edit');

export const profilePopup = document.querySelector('#popupUserInfo');

export const nameInput = document.querySelector('#formFildName');
export const jobInput = document.querySelector('#formFildAbout');

// For render cards

export const cardsContainer = document.querySelector('.elements__grid');

// For new card popup

export const newCardPopup = document.querySelector('#popupNewCard');
export const addCardButton = document.querySelector('.profile__button-add');

export const newCardform = document.forms.newPlace;

// For photo popup

export const popupCardPhoto = document.querySelector('#popupCardPhoto');


export default initialCards
