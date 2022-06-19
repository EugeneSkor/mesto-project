import '../pages/index.css';
import Card from "../components/Сard.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { formSettings, FormValidator } from "../components/FormValidator.js"
import {
reverseInitialCards,
profileName,
profileDescription,
editButton,
profilePopup,
nameInput,
jobInput,
cardsContainer,
newCardPopup,
addCardButton,
newCardform,
popupCardPhoto
} from "../utils/constants.js"

// For validation
const userDataFormValidator = new FormValidator(formSettings, document.forms.userdata);
userDataFormValidator.enableValidation();
const newPlaceFormValidator = new FormValidator(formSettings, newCardform);
newPlaceFormValidator.enableValidation();

// Объект с карточками для отображения

// Создаём массив для добавления карточек на страницу
const cardList = new Section(
  {
    // Описываем что добавляем
    items: reverseInitialCards,
    // Описываем как добавляем
    renderer: (item) => {
      // Создаём новую карточку
      const card = new Card({ item: item, handleCardClick: handleCardClick }, '#element');
      // Наполняем данными
      const cardElement = card.generateCard();
      // Отображаем на странице
      cardList.addItem(cardElement);
    }
    // Описываем куда добавляем
  }, cardsContainer
);

// Popup functions

// User name popup

const userInfo = new UserInfo({ nameSelector: profileName, descriptionSelector: profileDescription })

const PopupWithUserForm = new PopupWithForm({
  popupSelector: profilePopup,
    handleFormSubmit: (inputs) => {
      userInfo.setUserInfo(inputs)}
});

// Add new card

const PopupWithCardForm = new PopupWithForm({
  popupSelector: newCardPopup,
    // Передаём в обработчик сгенерированный массив зачений полей
    handleFormSubmit: (inputs) => {
      const newCustomCard = new Section({
        // Для создания карчточки используем значения из полей
        items: [inputs],
        renderer: (item) => {
          const singlecard = new Card({ item: item, handleCardClick: handleCardClick }, '#element');
          const singlecardElement = singlecard.generateCard();
          newCustomCard.addItem(singlecardElement);
        }
      }, cardsContainer);
    // Отображаем карточку на странице
    newCustomCard.renderItems();
  }
});

// Запускаем рендер карточек
cardList.renderItems();

// Функция создаёт и открывает попап с увеличенной картинкой,
// данные на вход передаются при добавлении обработчика клика на фотографию
// при создании экземпляра карточки, по этому ему нужно передать эту функцию в коструктор Card
function handleCardClick(name, link, alt) {
  // Передаём информацию о картинке из класса Card
  const photoPopup = new PopupWithImage({ popupSelector: popupCardPhoto }, name, link, alt);
  photoPopup.open();
};

function openUserPopup() {
  const profile = userInfo.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.description;
  PopupWithUserForm.open()
}

function openNewCardPopup() {
  newPlaceFormValidator.resetValidation();
  PopupWithCardForm.open()
}

//For Username form

editButton.addEventListener('click', openUserPopup);

// For new card popup

addCardButton.addEventListener('click', openNewCardPopup);
