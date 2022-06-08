const formSettings = [
  {
    formSelector: '.form',
    inputSelector: '.form__fild',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__fild_invalid',
    errorClass: 'form__input-error_active'
  }
];

class FormValidator {
  constructor(data, form) {
    this._form = form;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }

    enableValidation () {
      this._setEventListeners()
    }

    _setEventListeners() {
      // Обойдём все все поля внутри формы
      this._inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        this._isValid(inputElement)
          // Вызовем toggleButtonState
        this._toggleButtonState();
        });
      })
    }

    // Метод переключения активности кнопки, принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
    _toggleButtonState() {
      // Если есть хотя бы один невалидный инпут
      this._hasInvalidInput()
      ? this._buttonStateActive()
      : this._buttonStateDisabled();
    }

    _buttonStateActive() {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.setAttribute("disabled", "disabled");
    }

    _buttonStateDisabled() {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.removeAttribute("disabled");
    }

    // Метод принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция вернёт true
        return !inputElement.validity.valid;
      });
    }
 // Метод показывет ошибку, если поле не валидно и убирает, если валидно
    _isValid(inputElement) {
      !inputElement.validity.valid
      ? showInputError(inputElement)
      : hideInputError(inputElement);
    }

    // Метод удаления класса с ошибкой
  _hideInputError(inputElement) {
    // Находим элемент ошибки внутри самой функции, выбираем элемент ошибки на основе уникального класса (по id поля ввода)
    this._form.querySelector(`.${inputElement.id}-error`) = this._errorElement;
    inputElement.classList.remove(this._inputErrorClass);
    // Скрываем сообщение об ошибке
    this._errorElement.classList.remove(this._errorClass);
    // Очистим ошибку
    this._errorElement.textContent = '';
  }

  // Метод добавления класса с ошибкой
  _showInputError(inputElement) {
    this._form.querySelector(`.${inputElement.id}-error`) = this._errorElement;
    // Добавляем класс с ошибкой
    inputElement.classList.add(this._inputErrorClass);
    // Заменим содержимое span с ошибкой на значение validationMessage из свойства элемента
    errorElement.textContent = inputElement.validationMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(this._errorClass);
  }

};










/*
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationObj) => {
  // Находим элемент ошибки внутри самой функции, выбираем элемент ошибки на основе уникального класса (по id поля ввода)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Добавляем класс с ошибкой
  inputElement.classList.add(validationObj.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр errorMassage
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(validationObj.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationObj) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationObj.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(validationObj.errorClass);
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля, получает параметром форму, в которой находится проверяемое поле, и само это поле
const isValid = (formElement, inputElement, validationObj) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку, Передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage, validationObj);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, validationObj);
  }
};

// Функция принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция переключения активности кнопки, принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, validationObj) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(validationObj.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");

  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(validationObj.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

// Добавим обработчики всем полям
const setEventListeners = (formElement, validationObj) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, validationObj);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, validationObj)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, validationObj);
    });
  });
};

enableValidation () {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
}
// Добавим обработчики всем формам
const enableValidation = (validationObj) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(validationObj.formSelector));


  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, validationObj);
  });
};

const enableValidation = () => {
  new FormValidator()
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
  const card = new Card(item, '#element');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  cardsContainer.prepend(cardElement);
  })
};

// Вызовем функцию
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__fild',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__fild_invalid',
  errorClass: 'form__input-error_active'
});

new FormValidator(formSettings, document.forms.userdata);
new FormValidator(formSettings, document.forms.newPlace);





export default class FormValidator {
  constructor(form, options) {
    this._form = form;
    this._buttonElement = form.querySelector(`.${options.buttonSubmitClass}`);
    this._inputList = Array.from(form.querySelectorAll(`.${options.inputSelector}`));
    this._inputErrorClass = options.inputErrorClass;

  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _disableButton() {
    this._buttonElement.disabled = true;
  }


  _enableButton() {
    this._buttonElement.disabled = false;
    // Я риску потратить впустую одно из четырех ревью, но я не понимаю, зачем добавлять дополнительный класс,
    // если на кнопках Сохранить всех форм помимо класса .popup__save_button висит CSS-класс .button, который
    // имеет псевдокласс :disabled, описывающий вид неактивной кнопки (blocks/button/button.css:20).
  }

  _toggleButtonState() {
    this._hasInvalidInput() ? this._disableButton() : this._enableButton();
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.hidden = false;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    errorElement.hidden = true;
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
    this._disableButton();
  }

  enableValidation() {
    this._setEventListeners();
  }
}*/
