import Card from "./card.js";
import { formSettings, FormValidator } from "./validate.js"
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

// For validation
const userDataForm = document.forms.userdata;
const newPlaceForm = document.forms.newPlace;
let validator = '';

// Popup functions

export default function openPopup (popup) {
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlayClick);
  popup.classList.add('popup_opened');

  const formTarget = () => {
    if (popup.id === 'popupNewCard')
      validator = new FormValidator(formSettings, document.forms.newPlace);
    if (popup.id === 'popupUserInfo')
      validator = new FormValidator(formSettings, document.forms.userdata);
    }

    formTarget()

    validator.enableValidation()
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

const renderCards = () => {
  reverseInitialCards.forEach((item) => {
    // Создадим экземпляр карточки
  const card = new Card(item, '#element');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  cardsContainer.prepend(cardElement);
  })
};

renderCards();

// Disabled button
function disabledButton (button) {
  button.classList.add('form__button_disabled');
  button.setAttribute("disabled", "disabled");
};

// Add new card
function submitNewCardForm (evt) {
  evt.preventDefault();

  const newCustomCard =
    {
     name: `${placeInput.value}`,
     link: `${linkInput.value}`
    }
  ;

  const card = new Card(newCustomCard, '#element');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
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
