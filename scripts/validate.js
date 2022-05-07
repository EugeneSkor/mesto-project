// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationTarget) => {
  // Находим элемент ошибки внутри самой функции, выбираем элемент ошибки на основе уникального класса (по id поля ввода)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Добавляем класс с ошибкой
  inputElement.classList.add(validationTarget.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр errorMassage
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(validationTarget.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationTarget) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationTarget.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(validationTarget.errorClass);
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля, получает параметром форму, в которой находится проверяемое поле, и само это поле
const isValid = (formElement, inputElement, validationTarget) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку, Передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage, validationTarget);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, validationTarget);
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
const toggleButtonState = (inputList, buttonElement, validationTarget) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(validationTarget.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");

  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(validationTarget.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

// Добавим обработчики всем полям
const setEventListeners = (formElement, validationTarget) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(validationTarget.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(validationTarget.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, validationTarget);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, validationTarget)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, validationTarget);
    });
  });
};

// Добавим обработчики всем формам
const enableValidation = (validationTarget) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(validationTarget.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, validationTarget);
  });
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
