import './index.css'

import { openPopup } from './components/modal.js';

import { initialCards } from './components/cards.js';
import { handleLikeButtonClick, removeCard, createCard } from './components/card.js';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const cardsContainer = document.querySelector('.places__list');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardButton = document.querySelector('.profile__add-button');
const popupNewCardForm =  popupNewCard.querySelector('.popup__form');

const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileFormInputName = popupEditProfile.querySelector('.popup__input_type_name');
const popupEditProfileFormInputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const popupEditProfileButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const closePopupButtons = document.querySelectorAll('.popup__close');

// Функция открытия попапа редактирования профиля
function openEditProfilePopup() {

    // Заполняем поля формы текущими значениями
    popupEditProfileFormInputName.value = profileTitle.value;
    popupEditProfileFormInputDescription.value = profileDescription.value;

    // Открываем попап
    openPopup(popupEditProfile);
}

// Функция попапа с изображением
function openModalForImage(cardData) {
    
    popupImageElement.src = cardData.link;
    popupImageElement.scr = cardData.name;
    
    // Устанавливаем подпись к изображению
    popupImageCaption.textContent = cardData.name;

    openPopup(popupImage);
}

function saveProfile() {
    // Заполняем поля формы текущими значениями
    popupEditProfileFormInputName.value = profileTitle.value;
    popupEditProfileFormInputDescription.value = profileDescription.value;

    // Закрываем попап
    closePopup(popupEditProfile);
    popupEditProfileForm.reset(); 
}

function saveCard() {
    const placeName = popupNewCardForm.querySelector('.popup__input_type_card-name').value;
    const link = popupNewCardForm.querySelector('.popup__input_type_url').value;

    const newCardData = { name: placeName, link: link };

    const cardElement = createCard(newCardData, removeCard); 
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

    popupEditProfileButton.addEventListener('click', () => {
        openEditProfilePopup();
    });

    document.querySelectorAll('.popup').forEach((popup) => {
        popup.classList.add('popup_is-animated');
    });

    popupNewCardButton.addEventListener('click', () => {
        openPopup(popupNewCard);
    });

    // Обработчик события для закрытия попапа
    closePopupButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const popup = e.target.closest('.popup');
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
});