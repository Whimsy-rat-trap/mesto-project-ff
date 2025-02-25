// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card')

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closePopupButtons = document.querySelectorAll('.popup__close');
const formNewCard = popupNewCard.querySelector('.popup__form');
const popupEdit = document.querySelector('.popup_type_edit');
const formEditProfile = popupEdit.querySelector('.popup__form');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true)

  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const deleteButton = cardElement.querySelector('.card__delete-button')

  cardImage.src = cardData.link
  cardImage.alt = cardData.name
  cardTitle.textContent = cardData.name

  deleteButton.addEventListener('click', deleteCard)

  return cardElement
}

// @todo: Функция удаления карточки
function removeCard(e) {
  const cardElement = e.target.closest('.card')
  cardElement.remove()
}

// @todo: Вывести карточки на страницу
function showCard(initialCards) {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, removeCard) // Передаем removeCard как параметр

    cardsContainer.append(cardElement)
  })
}

// Popup

// Открытие попапа
function openPopup() {
  popupNewCard.classList.add('popup_is-opened');
}

// Закрытие попапа
function closePopup() {
  popupNewCard.classList.remove('popup_is-opened');
}

// Обработчик события для закрытия попапа
closePopupButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    closePopup(popup);
  });
});

// Обработчик события для отправки формы новой карточки
formNewCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const placeName = formNewCard.querySelector('.popup__input_type_card-name').value;
  const link = formNewCard.querySelector('.popup__input_type_url').value;

  const newCardData = {
    name: placeName,
    link: link
  };

  const cardElement = createCard(newCardData, removeCard); // Передаем removeCard как параметр
  cardsContainer.append(cardElement);
  closePopup(popupNewCard);
  formNewCard.reset(); // Сброс формы
});

showCard(initialCards);