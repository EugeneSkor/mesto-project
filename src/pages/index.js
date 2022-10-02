import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import { formSettings, FormValidator } from "../components/FormValidator.js"
import {
editButton,
avatarEditButton,
nameInput,
jobInput,
addCardButton,
newCardform,
avatarForm,
token
} from "../utils/constants.js"
import Api from "../components/Api.js";

// For validation
const userDataFormValidator = new FormValidator(formSettings, document.forms.userdata);
userDataFormValidator.enableValidation();
const newPlaceFormValidator = new FormValidator(formSettings, newCardform);
newPlaceFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(formSettings, avatarForm);
avatarFormValidator.enableValidation();

// Получаем данные с сервера
const api = new Api(token);

// Отображаем исходные данные
api.getAllNeededData()
  .then(data => {
    const [userData, cardsData] = data;
    userInfo.setUserInfo(userData);
    // Запускаем рендер карточек
    cardList.renderItems(cardsData);
  })
  .catch(err => console.log(err));

// Инстанцирование класса карточки
function createCard(item) {
  // Создаём новую карточку
  const card = new Card({
    item: item,
    userId: userInfo.returnUserId(),
    handleCardClick: handleCardClick,
    handleLikeClick: handleLikeClick,
    delCardClick: delCardClick },
    '#element');
  // Наполняем данными
  const cardElement = card.generateCard();
  // возвращаем готовую карточку
  return cardElement
};

// Создаём массив для добавления карточек на страницу
const cardList = new Section(
  {  // Описываем как добавляем
    renderer: (item) => {
      // Отображаем на странице
      cardList.addItem(createCard(item));
    }
    // Описываем куда добавляем
  }, ".elements__grid"
);

// Popup functions

// User name popup
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar' }
);

const popupWithUserForm = new PopupWithForm({
  popupSelector: '#popupUserInfo',
    handleFormSubmit: (inputs) => {
    // Меняем текст в кнопке при загрузке с сервера
    popupWithUserForm.setLoadButton(true)
      // Отправляем на сервер изменения из инпутов полей формы
    api.patchUserInfo(inputs)
      .then(data => {
        // Добавляем на страницу изменённые данные пользователя, которые перезаписались на сервере
        userInfo.setUserInfo(data);
      })
      .catch(err => console.log(err))
      // Меняем текст на исходный после загрузки
      .finally(() => {popupWithUserForm.setLoadButton(false)});
    }
});

popupWithUserForm.setEventListeners();

// Add new card
const popupWithCardForm = new PopupWithForm({
  popupSelector: '#popupNewCard',
    // Передаём в обработчик сгенерированный массив зачений полей
    handleFormSubmit: (inputs) => {
    // Меняем текст в кнопке при загрузке с сервера
      popupWithCardForm.setLoadButton(true)
      // Отправляем на сервер изменения из инпутов полей формы
    api.postCard(inputs)
      .then(data => {
      // инстанцируем карточку с данными, вернувшимися с сервера и отображаем на странице
      cardList.addItem(createCard(data));
      })
      .catch(err => console.log(err))
      // Меняем текст на исходный после загрузки
      .finally(() => {popupWithCardForm.setLoadButton(false)});
    }
});

popupWithCardForm.setEventListeners();

// Удалить карточку
const delPopup = new PopupWithSubmit ({
  popupSelector: '#popupDelConfirmation',
  handleFormSubmit: (id) => {
    // Отправляем на сервер id карточки для удаления
    api.delCard(id)
    .catch(err => console.log(err));
  }
});

function delCardClick(id) {
  delPopup.open(id);
};

delPopup.setEventListeners();

// Лайк
function handleLikeClick(like, id) {
  if (like) {
    api.addLike(id)
    .catch(err => console.log(err));
  } else {
    api.delLike(id)
    .catch(err => console.log(err));
  };
};

// Попап с увеличенной картинкой
const photoPopup = new PopupWithImage({ popupSelector: '#popupCardPhoto' });
photoPopup.setEventListeners();

// Функция открывает попап с увеличенной картинкой,
// данные на вход передаются при добавлении обработчика клика на фотографию
// при создании экземпляра карточки, по этому ему нужно передать эту функцию в коструктор Card
function handleCardClick(name, link, alt) {
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

function openAvatarPopup() {
  avatarFormValidator.resetValidation();
  avatarPopup.open()
}

// Попап обновления аватара

const avatarPopup = new PopupWithForm({
  popupSelector: '#popupAvatar',
    // Передаём в обработчик сгенерированный массив зачений полей
    handleFormSubmit: (inputs) => {
      // Меняем текст в кнопке при загрузке с сервера
      avatarPopup.setLoadButton(true)
      // Отправляем на сервер изменения из инпутов полей формы
    api.patchAvatar(inputs)
      .then(data => {
      // инстанцируем карточку с данными, вернувшимися с сервера и отображаем на странице
      userInfo.setUserInfo(data);
      avatarPopup.close()
      })
      .catch(err => console.log(err))
      // Меняем текст на исходный после загрузки
      .finally(() => {avatarPopup.setLoadButton(false)});
    }
});

avatarPopup.setEventListeners();

//Обработчики на кнопки

editButton.addEventListener('click', openUserPopup);

addCardButton.addEventListener('click', openNewCardPopup);

avatarEditButton.addEventListener('click', openAvatarPopup);
