export const formSettings =
  {
    inputSelector: '.form__fild',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__fild_invalid',
    errorClass: 'form__input-error_active'
  }
;

export class FormValidator {
  constructor(data, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputList = Array.from(this._formSelector.querySelectorAll(`${data.inputSelector}`));
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
    }


    enableValidation() {
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
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    }

    _buttonStateDisabled() {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
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
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      }
      else {
        this._hideInputError(inputElement);
      }
    }

    // Метод удаления класса с ошибкой
    _hideInputError(inputElement) {
      inputElement.classList.remove(this._inputErrorClass);
      // Скрываем сообщение об ошибке
      this._errorElement.classList.remove(this._errorClass);
      // Очистим ошибку
      this._errorElement.textContent = '';
    }

    // Метод добавления класса с ошибкой
    _showInputError(inputElement) {
      this._errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
      // Добавляем класс с ошибкой
      inputElement.classList.add(this._inputErrorClass);
      // Заменим содержимое span с ошибкой на значение validationMessage из свойства элемента
      this._errorElement.textContent = inputElement.validationMessage;
      // Показываем сообщение об ошибке
      this._errorElement.classList.add(this._errorClass);
    }

};
