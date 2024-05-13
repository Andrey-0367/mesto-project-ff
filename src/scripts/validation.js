export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorClass)
}

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.classList.remove(config.errorClass)
  errorElement.textContent = ''
}

const checkInputValidity = (config, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }

  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(config, formElement, inputElement)
  }
}

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState(config, inputList, buttonElement)

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(config, formElement, inputElement)
      toggleButtonState(config, inputList, buttonElement)
    })
  })
}

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (config, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(config.inactiveButtonClass)
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(config.inactiveButtonClass)
  }
}

const enableValidation = config => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });
}

enableValidation(validationConfig);

export const clearValidation = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  inputList.forEach(inputElement => {
    hideInputError(config, formElement, inputElement)
    toggleButtonState(config, inputList, buttonElement)
  })
}

