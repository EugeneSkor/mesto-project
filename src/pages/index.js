import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { formSettings, FormValidator } from "../components/FormValidator.js"
import {
reverseInitialCards,
editButton,
nameInput,
jobInput,
addCardButton,
newCardform,
} from "../utils/constants.js"

// For validation
const userDataFormValidator = new FormValidator(formSettings, document.forms.userdata);
userDataFormValidator.enableValidation();
const newPlaceFormValidator = new FormValidator(formSettings, newCardform);
newPlaceFormValidator.enableValidation();

// Объект с карточками для отображения

// Инстанцирование класса карточки
function createCard(item) {
  // Создаём новую карточку
  const card = new Card({ item: item, handleCardClick: handleCardClick }, '#element');
  // Наполняем данными
  const cardElement = card.generateCard();
  // возвращаем готовую карточку
  return cardElement
};

// Создаём массив для добавления карточек на страницу
const cardList = new Section(
  { // Описываем что добавляем
    items: reverseInitialCards,
    // Описываем как добавляем
    renderer: (item) => {
      // Отображаем на странице
      cardList.addItem(createCard(item));
    }
    // Описываем куда добавляем
  }, ".elements__grid"
);

// Popup functions

// User name popup

const userInfo = new UserInfo({ nameSelector: '.profile__name', descriptionSelector: '.profile__description' })

const popupWithUserForm = new PopupWithForm({
  popupSelector: '#popupUserInfo',
    handleFormSubmit: (inputs) => {
      userInfo.setUserInfo(inputs)}
});

popupWithUserForm.setEventListeners();

// Add new card

const popupWithCardForm = new PopupWithForm({
  popupSelector: '#popupNewCard',
    // Передаём в обработчик сгенерированный массив зачений полей
    handleFormSubmit: (inputs) => {
    // инстанцируем карточку и отображаем на странице
    cardList.addItem(createCard(inputs));
  }
});

popupWithCardForm.setEventListeners();

const photoPopup = new PopupWithImage({ popupSelector: '#popupCardPhoto' });

// Запускаем рендер карточек
cardList.renderItems();

// Функция открывает попап с увеличенной картинкой,
// данные на вход передаются при добавлении обработчика клика на фотографию
// при создании экземпляра карточки, по этому ему нужно передать эту функцию в коструктор Card
function handleCardClick(name, link, alt) {
  photoPopup.setEventListeners();
  // Передаём информацию о картинке из класса Card
  photoPopup.open(name, link, alt);
};

function openUserPopup() {
  const profile = userInfo.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.description;
  popupWithUserForm.open()
}

function openNewCardPopup() {
  newPlaceFormValidator.resetValidation();
  popupWithCardForm.open()
}

//For Username form

editButton.addEventListener('click', openUserPopup);

// For new card popup

addCardButton.addEventListener('click', openNewCardPopup);
