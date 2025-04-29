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
const popupNewCardFormInputName = popupNewCardForm.querySelector('.popup__input_type_card-name');

const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileFormInputName = popupEditProfile.querySelector('.popup__input_type_name');
const popupEditProfileFormInputDescription = popupEditProfile.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const closePopupButtons = document.querySelectorAll('.popup__close');

// Функция открытия попапа редактирования профиля
function openEditProfilePopup() {

    // Заполняем поля формы текущими значениями
    popupEditProfileFormInputName.value = profileTitle.textContent;
    popupEditProfileFormInputDescription.value = profileDescription.textContent;

    clearValidation(popupEditProfileForm, validationConfig);
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
        clearValidation(popupNewCardForm, validationConfig);
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

    enableValidation(validationConfig);
});