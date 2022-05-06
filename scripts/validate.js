


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции, выбираем элемент ошибки на основе уникального класса (по id поля ввода)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Добавляем класс с ошибкой
  inputElement.classList.add('form__fild_invalid');
  // Заменим содержимое span с ошибкой на переданный параметр errorMassage
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__fild_invalid');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('form__input-error_active');
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля, получает параметром форму, в которой находится проверяемое поле, и само это поле
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку, Передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
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
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__button_disabled');
    buttonElement.setAttribute("disabled", "disabled");

  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('form__button_disabled');
    buttonElement.removeAttribute("disabled");
  }
};

// Добавим обработчики всем полям
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.form__fild'));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.form__button');
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Добавим обработчики всем формам
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();
