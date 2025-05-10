// Функция для отображения ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {    
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

// Функция для скрытия ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = null;
    errorElement.classList.remove(validationConfig.errorClass);
}

//Проверка валидация поля
const isValid = (formElement, inputElement, validationConfig) => { //checkInputValidity внутри теории
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } 
    else {
        inputElement.setCustomValidity("");
    }
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    }
    else  {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

//Провека есть ли хоть 1 импут который не прошёл проверку (проверка кода на дурака но для кода а не для пользователя)
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// Блокировка кнопки отправки в случае если хоть 1 инпут не прошёл валидацию
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

//Делаем так чтобы обработчик добавился ко всем полям
const setEventListeners = (form, validationConfig) => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(form, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

//Очистка ошибки валидации формы
export const clearValidation = (form, validationConfig) => {
    const buttonElement= form.querySelector(validationConfig.submitButtonSelector);
    const inputElements = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    inputElements.forEach((inputElement) => {
        isValid(form, inputElement, validationConfig);
    });
    toggleButtonState(inputElements, buttonElement, validationConfig);
}

export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((form) => {
        setEventListeners(form, validationConfig);
    })
}