import './index.css'

import {openPopup, closePopup} from './components/modal.js';

import {initialCards} from './components/cards.js';
import {handleLikeButtonClick, removeCard, createCard} from './components/card.js';

import { validationConfig } from "./components/validationConfig.js";
import { enableValidation, clearValidation } from "./components/validation.js";

import { config } from "./components/api.js";

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

const popupEditProfileAvatar = document.querySelector('.popup_type_avatar');
const popupEditProfileAvatarForm = popupEditProfileAvatar.querySelector('.popup__form');
const popupTypeAvatarInput = popupEditProfileAvatar.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const closePopupButtons = document.querySelectorAll('.popup__close');

//Фунция открытия попапа редактирования изображения профиля
function openEditProfileAvatarPopup() {
    clearValidation(popupEditProfileAvatarForm, validationConfig);
    openPopup(popupEditProfileAvatar);
}

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

// Функция изменения изображения профиля
function saveProfileImage() {
    const newAvatarUrl = popupTypeAvatarInput.value; // Получаем новый URL изображения

    fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatarUrl
        })
    })
    .then(res => res.json())
    .then(data => {
        profileImage.style.src = `url(${data.avatar})`; // Обновляем изображение профиля
        closePopup(popupEditProfileAvatar);
        popupEditProfileAvatarForm.reset();
    })
}

function saveProfile() {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: popupEditProfileFormInputName.value,
          about: popupEditProfileFormInputDescription.value
        })
    })
    .then(() => {
        profileTitle.textContent = popupEditProfileFormInputName.value;
        profileDescription.textContent = popupEditProfileFormInputDescription.value;
    
        // Закрываем попап
        closePopup(popupEditProfile);
        popupEditProfileForm.reset();
    })
}

function saveCard() {
    const placeName = popupNewCardFormInputName.value;
    const link = popupNewCardFormInputLink .value;

    fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: popupNewCardFormInputName.value,
          link: popupNewCardFormInputLink.value
        })
    })
    .then(res => res.json())
    .then((card) => {
        const newCardData = {name: placeName, link: link, id: card._id, likeCount: 0};
    
        const cardElement = createCard(cardTemplate, newCardData, openModalForImage, handleLikeButtonClick, removeCard);
        cardsContainer.prepend(cardElement);
    
        // Закрываем попап
        closePopup(popupNewCard);
        popupNewCardForm.reset();
    })
}
function getProfile() {
    fetch(`${config.baseUrl}/users/me`, {
        headers: {
          authorization: config.headers.authorization
        }
    })
    .then(res => res.json())
    .then((result) => {
        profileTitle.textContent = result.name;
        profileDescription.textContent = result.about;
        profileImage.style.backgroundImage = "url('" + result.avatar + "')";
    });
}
 
function getCards() {
    fetch(`${config.baseUrl}/cards`, {
        headers: {
          authorization: config.headers.authorization
        }
    })
    .then(res => {
        return res.json();
      })
    .then((cards) => {
        console.log(cards);
        cards.forEach((card) => {
            const newCardData = {name: card.name, link: card.link, id: card._id, likeCount: card.likes.length};
            const cardElement = createCard(cardTemplate, newCardData, openModalForImage, handleLikeButtonClick, removeCard);
            cardsContainer.append(cardElement);
        });
    })
    .catch(err => console.log(err));
}

document.addEventListener('DOMContentLoaded', () => {
    getProfile();
    getCards();

    profileImage.addEventListener("click", openEditProfileAvatarPopup);
    popupEditProfileAvatarForm.addEventListener("submit", () => saveProfileImage());
    
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