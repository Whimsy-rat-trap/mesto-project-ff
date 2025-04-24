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
    errorElement.textContent = errorMessage;
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
        buttonElement.classList.add(validationConfig.inactiveButtonClass); //внутри validationConfig
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    };
};

//Делаем так чтобы обработчик добавился ко всем полям
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

//Очистка ошибки валидации формы и изменения типа button на disabled
export const clearValidation = (profileForm, validationConfig) => {
    const buttonElement= profileForm.querySelector(validationConfig.submitButtonSelector);
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    const inputElements = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    inputElements.forEach((inputElement) => {
        hideInputError(profileForm, inputElement, validationConfig)
    }) 
}

export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    })
}