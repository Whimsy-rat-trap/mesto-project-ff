import './index.css'

import {openPopup, closePopup} from './components/modal.js';

import {initialCards} from './components/cards.js';
import {handleLikeButtonClick, removeCard, createCard} from './components/card.js';

import { validationConfig } from "./components/validationConfig.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const cardsContainer = document.querySelector('.places__list');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardButton = document.querySelector('.profile__add-button');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const popupNewCardFormInputLink  = popupNewCardForm.querySelector('.popup__input_type_url');
const popupNewCardFormInputLinkError = popupNewCardForm.querySelector('.linkInput-error');
const popupNewCardFormInputName = popupNewCardForm.querySelector('.popup__input_type_card-name');
const popupNewCardFormInputNameError = popupNewCardForm.querySelector('.cardNameInput-error');
const popupNewCardFormInputNameMinLength = parseInt(popupNewCardFormInputName.getAttribute('minlength'), 10);
const popupNewCardFormInputNameMaxLength = parseInt(popupNewCardFormInputName.getAttribute('maxlength'), 10);

const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const pattern = /^[a-zA-Zа-яА-Я\s\-]+$/
const linkPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileFormInputName = popupEditProfile.querySelector('.popup__input_type_name');
const popupEditProfileFormInputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const popupEditProfileFormInputNameError = popupEditProfile.querySelector('.editNameInput-error');
const popupEditProfileFormInputDescriptionError = popupEditProfile.querySelector('.editDescriptionInput-error');
const popupEditProfileFormInputNameMinLength = parseInt(popupEditProfileFormInputName.getAttribute('minlength'), 10);
const popupEditProfileFormInputNameMaxLength = parseInt(popupEditProfileFormInputName.getAttribute('maxlength'), 10);
const popupEditProfileFormInputNameErrorFormInputNameMinLength = parseInt(popupEditProfileFormInputName.getAttribute('minlength'), 10);
const popupEditProfileFormInputNameErrorFormInputNameMaxLength = parseInt(popupEditProfileFormInputName.getAttribute('maxlength'), 10);

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const closePopupButtons = document.querySelectorAll('.popup__close');

//enableValidation(validationConfig);

// Функция открытия попапа редактирования профиля
function openEditProfilePopup() {

    // Заполняем поля формы текущими значениями
    popupEditProfileFormInputName.value = profileTitle.textContent;
    popupEditProfileFormInputDescription.value = profileDescription.textContent;

    // Открываем попап
    openPopup(popupEditProfile);
}

// Функция попапа с изображением
function openModalForImage(cardData) {

    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;

    // Устанавливаем подпись к изображению
    popupImageCaption.textContent = cardData.name;

    openPopup(popupImage);
}

function saveProfile() {
    profileTitle.textContent = popupEditProfileFormInputName.value;
    profileDescription.textContent = popupEditProfileFormInputDescription.value;

    // Закрываем попап
    closePopup(popupEditProfile);
    popupEditProfileForm.reset();
}

function saveCard() {
    const placeName = popupNewCardFormInputName.value;
    const link = popupNewCardFormInputLink .value;

    const newCardData = {name: placeName, link: link};

    const cardElement = createCard(cardTemplate, newCardData, openModalForImage, handleLikeButtonClick, removeCard);
    cardsContainer.prepend(cardElement);

    // Закрываем попап
    closePopup(popupNewCard);
    popupNewCardForm.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    initialCards.forEach((cardData) => {
        const cardElement = createCard(cardTemplate, cardData, openModalForImage, handleLikeButtonClick, removeCard);
        cardsContainer.append(cardElement);
    });

    popupEditProfileButton.addEventListener('click', () => openEditProfilePopup());

    document.querySelectorAll('.popup').forEach((popup) => {
        popup.classList.add('popup_is-animated');
        popup.addEventListener("click", (evt) => {
            if (evt.target === popup) {
                closePopup(popup)
            }
        });
    });

    popupNewCardButton.addEventListener('click', () => {
        popupNewCardForm.reset();
        openPopup(popupNewCard);
    });

    // Обработчик события для закрытия попапа
    closePopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            closePopup(popup);
        });
    });

    // Обработчик события для отправки формы новой карточки
    popupNewCardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveCard();
    });

    // Обработчик события для отправки формы редактирования
    popupEditProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProfile();
    });
 
    //-
    // Обработчики событий для полей ввода
    popupNewCardFormInputName.addEventListener('input', () => { //ВАЛИДАЦИЯ ДЛИННЫ ВВЕДЁННОГО ТЕКСТА
        const  popupNewCardFormInputNameInputValueLength = popupNewCardFormInputName.value.length; //длинна введённого текста
        if (popupNewCardFormInputNameInputValueLength < popupNewCardFormInputNameMinLength || popupNewCardFormInputNameInputValueLength > popupNewCardFormInputNameMaxLength) {
            popupNewCardFormInputNameError.textContent = `Название должно содержать от ${popupNewCardFormInputNameMinLength} до ${popupNewCardFormInputNameMaxLength} символов.`;
            popupNewCardFormInputNameError.classList.remove(validationConfig.noErrorClass);
            popupNewCardFormInputNameError.classList.add(validationConfig.errorClass);
        } else if (!pattern.test(popupNewCardFormInputName.value)) {  //ВАЛИДАЦИЯ PATTERN
            console.log(`Содержимое поля "Название": ${popupNewCardFormInputName.value}`);
            popupNewCardFormInputNameError.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
            popupNewCardFormInputNameError.classList.remove(validationConfig.noErrorClass);
            popupNewCardFormInputNameError.classList.add(validationConfig.errorClass);
        } else { //ОЧИСТКА ОШИБКИ
            popupNewCardFormInputNameError.textContent = "";
            popupNewCardFormInputNameError.classList.remove(validationConfig.errorClass);
            popupNewCardFormInputNameError.classList.add(validationConfig.noErrorClass);
        }
    });

    popupNewCardFormInputLink.addEventListener('input', () => {
        if (!linkPattern.test(popupNewCardFormInputLink.value)) {
            console.log(`Содержимое поля "Ссылка": ${popupNewCardFormInputLink.value}`);
            popupNewCardFormInputLinkError.textContent = "Введите корректный URL.";
            popupNewCardFormInputLinkError.classList.remove(validationConfig.noErrorClass);
            popupNewCardFormInputLinkError.classList.add(validationConfig.errorClass);
        } else {
            popupNewCardFormInputLinkError.textContent = "";
            popupNewCardFormInputLinkError.classList.remove(validationConfig.errorClass);
            popupNewCardFormInputLinkError.classList.add(validationConfig.noErrorClass);
        }
    });

    popupEditProfileFormInputName.addEventListener('input', () => {
        const popupEditProfileFormInputNameInputValueLength = popupEditProfileFormInputName.value.length; //длинна введённого текста
        if (popupEditProfileFormInputNameInputValueLength < popupEditProfileFormInputNameMinLength || popupEditProfileFormInputNameInputValueLength > popupEditProfileFormInputNameMaxLength) {
            popupEditProfileFormInputNameError.textContent = `Название должно содержать от ${popupEditProfileFormInputNameMinLength} до ${popupEditProfileFormInputNameMaxLength} символов.`;
            popupEditProfileFormInputNameError.classList.remove(validationConfig.noErrorClass);
            popupEditProfileFormInputNameError.classList.add(validationConfig.errorClass);
        } else if (!pattern.test(popupEditProfileFormInputName.value)) {  //ВАЛИДАЦИЯ PATTERN
            console.log(`Содержимое поля "Название": ${popupNewCardFormInputName.value}`);
            popupEditProfileFormInputNameError.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
            popupEditProfileFormInputNameError.classList.remove(validationConfig.noErrorClass);
            popupEditProfileFormInputNameError.classList.add(validationConfig.errorClass);
        } else {
            popupEditProfileFormInputNameError.textContent = "";
            popupEditProfileFormInputNameError.classList.remove(validationConfig.errorClass);
            popupEditProfileFormInputNameError.classList.add(validationConfig.noErrorClass);
        }
    });

    popupEditProfileFormInputDescription.addEventListener('input', () => {
        const popupEditProfileFormInputDescriptionInputValueLength = popupEditProfileFormInputDescription.value.length; //длинна введённого текста
        if (popupEditProfileFormInputDescriptionInputValueLength < popupEditProfileFormInputNameErrorFormInputNameMinLength || popupEditProfileFormInputDescriptionInputValueLength > popupEditProfileFormInputNameErrorFormInputNameMaxLength) {
            popupEditProfileFormInputDescriptionError.textContent = `Название должно содержать от ${popupEditProfileFormInputNameErrorFormInputNameMinLength} до ${popupEditProfileFormInputNameErrorFormInputNameMaxLength} символов.`;
            popupEditProfileFormInputDescriptionError.classList.remove(validationConfig.noErrorClass);
            popupEditProfileFormInputDescriptionError.classList.add(validationConfig.errorClass);
        } else if (!pattern.test(popupEditProfileFormInputDescription.value)) {  //ВАЛИДАЦИЯ PATTERN
            console.log(`Содержимое поля "Название": ${popupNewCardFormInputName.value}`);
            popupEditProfileFormInputDescriptionError.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
            popupEditProfileFormInputDescriptionError.classList.remove(validationConfig.noErrorClass);
            popupEditProfileFormInputDescriptionError.classList.add(validationConfig.errorClass);
        } else {
            popupEditProfileFormInputDescriptionError.textContent = "";
            popupEditProfileFormInputDescriptionError.classList.remove(validationConfig.errorClass);
            popupEditProfileFormInputDescriptionError.classList.add(validationConfig.noErrorClass);
        }
    });
});