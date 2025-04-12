import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closePopupButtons = document.querySelectorAll('.popup__close');
const formNewCard = popupNewCard.querySelector('.popup__form');
const popupEdit = document.querySelector('.popup_type_edit');
const formEditProfile = popupEdit.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');

// Переменные для редактирования профиля
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

// Функция открытия попапа редактирования профиля
function openEditProfilePopup() {
    const profileTitle = document.querySelector('.profile__title').textContent;
    const profileDescription = document.querySelector('.profile__description').textContent;

    // Заполняем поля формы текущими значениями
    nameInput.value = profileTitle;
    jobInput.value = profileDescription;

    // Открываем попап
    popupEdit.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose); // Добавляем обработчик
}

// Обработчик клика на кнопку редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);

// Обработчик отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы

  // jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Выбираем элементы куда должны быть вставлены значения полей
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  // Новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue; 

  closePopup(popupEdit); // Закрываем попап после сохранения изменений
}

// Прикрепляем обработчик к форме редактирования:
formEditProfile.addEventListener('submit', handleFormSubmit); 

// Функция обработки лайка
function handleLikeButtonClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчик клика на изображение
  cardImage.addEventListener('click', (evt) => {
    openModalForImage(popupImage, evt);
  });

  // Используем переданную функцию для обработки клика на кнопку лайка
  likeButton.addEventListener('click', () => handleLikeButtonClick(likeButton));

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

// Функция открытия попапа с изображением
function openModalForImage(element, evt) {
  const popupImageElement = element.querySelector(".popup__image");
  
  popupImageElement.src = evt.target.src;
  
  // Устанавливаем подпись к изображению
  element.querySelector(".popup__caption").textContent = evt.target.alt;

  // Открываем попап
  element.classList.add('popup_is-opened');

  // Добавляем обработчик закрытия по Esc
  document.addEventListener('keydown', handleEscClose);
}

// Обработчик события для закрытия попапа изображения через крестик
const closePopupImageButton = document.querySelector('.popup_type_image .popup__close');
closePopupImageButton.addEventListener('click', () => {
    closePopup(popupImage);
});

// Функция удаления карточки
function removeCard(e) {
    const cardElement = e.target.closest('.card')
    if (cardElement) {
        cardElement.remove();
    }
}

// Вывести карточки на страницу
function showCard(initialCards) {
    initialCards.forEach((cardData) => {
        const cardElement = createCard(cardData, removeCard); 
        cardsContainer.append(cardElement);
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
    popupNewCard.classList.add('popup_is-opened');
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

// Обработчик события для закрытия попапа
closePopupButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const popup = e.target.closest('.popup');
        closePopup(popup);

        document.removeEventListener('keydown', handleEscClose);
        
        if (popup === popupImage) {
            document.removeEventListener('keydown', handleEscClose);
        } else { 
            document.addEventListener('keydown', handleEscClose);
        }
        
    });
});

// Обработчик события для клика на оверлей
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) { 
            closePopup(popup);

            document.removeEventListener('keydown', handleEscClose);

            if (popup === popupImage) {
                document.removeEventListener('keydown', handleEscClose);
            } else { 
                document.addEventListener('keydown', handleEscClose);
            }
            
        }
    });
});

// Обработчик события для отправки формы новой карточки
formNewCard.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const placeName = formNewCard.querySelector('.popup__input_type_card-name').value;
    const link = formNewCard.querySelector('.popup__input_type_url').value;

    const newCardData = { name: placeName, link: link };

    const cardElement = createCard(newCardData, removeCard); 
    cardsContainer.append(cardElement);
    
    closePopup(popupNewCard);
    
    formNewCard.reset(); 
});

// Инициализация карточек
showCard(initialCards);