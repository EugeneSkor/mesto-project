let page = document.querySelector('.page');
let content = page.querySelector('.content');
let profile = content.querySelector('.profile');
let profileContainer = content.querySelector('.profile__container');
let profileInfo = profileContainer.querySelector('.profile__info');
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');
let editButton = profileContainer.querySelector('.profile__button-edit');

let popup = page.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let closePopupButton = popupContainer.querySelector('.popup__close');

let formElement = popup.querySelector('.form');
let formFildset = formElement.querySelector('.form__fildset');
let nameInput = formFildset.querySelector('.form__fild-name');
let jobInput = formFildset.querySelector('.form__fild-about');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
