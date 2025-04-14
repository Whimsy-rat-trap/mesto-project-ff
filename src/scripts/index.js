//import { initialCards } from './cards.js';

// @todo: Темплейт карточки
function GetCardTemplate() {
    return document.querySelector('#card-template').content.querySelector('.card');
}

function GetCardsContainer() {
    return document.querySelector('.places__list');
}

function GetPopupNewCard() {
    return document.querySelector('.popup_type_new-card');
}

function GetPopupEdit() {
    return document.querySelector('.popup_type_edit');
}

function GetformEditProfile(){
    return GetPopupEdit().querySelector('.popup__form');
}

function GetpopupImage(){
    return document.querySelector('.popup_type_image');
}

// Переменные для редактирования профиля
function GetnameInput() {
    return GetformEditProfile().querySelector(".popup__input_type_name");
}

function GetjobInput() {
    return GetformEditProfile().querySelector(".popup__input_type_name");
}

// Функция открытия попапа редактирования профиля
function openEditProfilePopup() {
    const profileTitle = document.querySelector('.profile__title').textContent;
    const profileDescription = document.querySelector('.profile__description').textContent;

    // Заполняем поля формы текущими значениями
    GetnameInput.value = profileTitle;
    GetjobInput.value = profileDescription;

    // Открываем попап
    GetPopupEdit().classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose); // Добавляем обработчик
}

//Добавления обработчиков
function AddHandlers() {
    // Обработчик клика на кнопку редактирования профиля
    document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);
    // Прикрепляем обработчик к форме редактирования:
    GetformEditProfile.addEventListener('submit', handleFormSubmit); 
    
    const closePopupButtons = document.querySelectorAll('.popup__close');
    // Обработчик события для закрытия попапа
    closePopupButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const popup = e.target.closest('.popup');
            closePopup(popup);

            document.removeEventListener('keydown', handleEscClose);
            
            if (popup === GetpopupImage) {
                document.removeEventListener('keydown', handleEscClose);
            } else { 
                document.addEventListener('keydown', handleEscClose);
            }
            
        });
    });

    
    const formNewCard = GetPopupNewCard().querySelector('.popup__form');
    // Обработчик события для отправки формы новой карточки
    formNewCard.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const placeName = formNewCard.querySelector('.popup__input_type_card-name').value;
        const link = formNewCard.querySelector('.popup__input_type_url').value;

        const newCardData = { name: placeName, link: link };

        const cardElement = createCard(newCardData, removeCard); 
        GetCardsContainer().append(cardElement);
        
        closePopup(GetPopupNewCard());
        
        formNewCard.reset(); 
    });

    // Обработчик отправки формы редактирования профиля
    function handleFormSubmit(evt) {
        evt.preventDefault(); // Отмена стандартной отправки формы
    
        // jobInput и nameInput из свойства value
        const nameValue = GetnameInput.value;
        const jobValue = GetjobInput.value;
    
        // Выбираем элементы куда должны быть вставлены значения полей
        const profileTitle = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');
    
        // Новые значения с помощью textContent
        profileTitle.textContent = nameValue;
        profileDescription.textContent = jobValue; 
    
        closePopup(GetPopupEdit()); // Закрываем попап после сохранения изменений
    };

    
    // Обработчик события для клика на оверлей
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) { 
                closePopup(popup);

                document.removeEventListener('keydown', handleEscClose);

                if (popup === GetpopupImage) {
                    document.removeEventListener('keydown', handleEscClose);
                } else { 
                    document.addEventListener('keydown', handleEscClose);
                }
                
            }
        });
    });
}

// Функция обработки лайка
function handleLikeButtonClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = GetCardTemplate().cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчик клика на изображение
  cardImage.addEventListener('click', (evt) => {
    openModalForImage(GetpopupImage, evt);
  });

  // Используем переданную функцию для обработки клика на кнопку лайка
  likeButton.addEventListener('click', () => handleLikeButtonClick(likeButton));

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

// Функция попапа с изображением
function openModalForImage(element, evt) {
    const popupImageElement = element.querySelector(".popup__image");
    
    popupImageElement.src = evt.target.src;
    
    // Устанавливаем подпись к изображению
    element.querySelector(".popup__caption").textContent = evt.target.alt;

    // Открываем попап
    element.classList.add('popup_is-opened');

    // Добавляем обработчик закрытия по Esc
    document.addEventListener('keydown', handleEscClose);

    // Обработчик события для закрытия попапа изображения через крестик
    const closePopupImageButton = document.querySelector('.popup_type_image .popup__close');
    closePopupImageButton.addEventListener('click', () => {
        closePopup(GetpopupImage);
    });
}

// Функция удаления карточки
function removeCard(e) {
    const cardElement = e.target.closest('.card')
    if (cardElement) {
        cardElement.remove();
    }
}

// Вывести карточки на страницу
export function showCard() {
    const initialCards = [
        {
          name: "Архыз",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        },
        {
          name: "Челябинская область",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
        },
        {
          name: "Иваново",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
        },
        {
          name: "Камчатка",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
        },
        {
          name: "Холмогорский район",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
        },
        {
          name: "Байкал",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
        }
    ];
    initialCards.forEach((cardData) => {
        const cardElement = createCard(cardData, removeCard); 
        GetCardsContainer().append(cardElement);
    });
}

// Функция для обработки нажатия клавиши Esc
function handleEscClose(e) {
    if (e.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closePopup(openPopup);
        }
    }
}

// Открытие попапа для новой карточки
function openPopup() {
    GetPopupNewCard().classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', handleEscClose); // Добавляем обработчик
}

// Закрытие попапа (обновленная функция)
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');

    // Задержка перед добавлением класса анимации
    //setTimeout(() => {
    //  popup.classList.add('popup_is-animated'); // Добавляем анимацию после закрытия
    //  document.removeEventListener('keydown', handleEscClose);
    //}, 600);

    popup.classList.add('popup_is-animated'); // Добавляем анимацию после закрытия
    document.removeEventListener('keydown', handleEscClose);
    
    //if (popup !== popupImage) {
    //    document.removeEventListener('keydown', handleEscClose);
    //} !
}