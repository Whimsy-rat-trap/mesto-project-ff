// @todo: Темплейт карточки
function GetCardTemplate() {
    return document.querySelector('#card-template').content.querySelector('.card');
}

export function GetCardsContainer() {
    return document.querySelector('.places__list');
}

export function GetPopupNewCard() {
    return document.querySelector('.popup_type_new-card');
}

export function GetPopupEdit() {
    return document.querySelector('.popup_type_edit');
}

export function GetformEditProfile(){
    return GetPopupEdit().querySelector('.popup__form');
}

export function GetpopupImage(){
    return document.querySelector('.popup_type_image');
}

// Переменные для редактирования профиля
export function GetnameInput() {
    return GetformEditProfile().querySelector(".popup__input_type_name");
}

export function GetjobInput() {
    return GetformEditProfile().querySelector(".popup__input_type_name");
}

// Функция открытия попапа редактирования профиля
export function openEditProfilePopup() {
    const profileTitle = document.querySelector('.profile__title').textContent;
    const profileDescription = document.querySelector('.profile__description').textContent;

    // Заполняем поля формы текущими значениями
    GetnameInput.value = profileTitle;
    GetjobInput.value = profileDescription;

    // Открываем попап
    GetPopupEdit().classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose); // Добавляем обработчик
}

// Функция обработки лайка
function handleLikeButtonClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция создания карточки
export function createCard(cardData, deleteCard) {
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
    openModalForImage(GetpopupImage(), evt);
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
        closePopup(GetpopupImage());
    });
}

// Функция удаления карточки
export function removeCard(e) {
    const cardElement = e.target.closest('.card')
    if (cardElement) {
        cardElement.remove();
    }
}

// Функция для обработки нажатия клавиши Esc
export function handleEscClose(e) {
    if (e.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closePopup(openPopup);
        }
    }
}

// Открытие попапа для новой карточки
export function openPopup() {
    GetPopupNewCard().classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose); // Добавляем обработчик
}

// Закрытие попапа (обновленная функция)
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', handleEscClose);
}