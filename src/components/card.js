import { config } from "./api.js";
// Функция создания карточки
export function createCard(cardTemplate, cardData, onPopupImage, onLikeCard, onDeleteCard) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    likeCounter.textContent = cardData.likeCount;
    cardImage.src = cardData.link;
    cardElement.id = cardData.id;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Добавляем обработчик клика на изображение
    cardImage.addEventListener('click', () => onPopupImage(cardData));

    // Используем переданную функцию для обработки клика на кнопку лайка
    likeButton.addEventListener('click', () => onLikeCard(likeButton));

    deleteButton.addEventListener('click', () => onDeleteCard(cardElement));

    return cardElement;
}

// Функция удаления карточки
export function removeCard(card) {
    fetch(`${config.baseUrl}/cards/${card.id}`, {
            method: 'DELETE',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': 'application/json'
            }
    })
    if (card) {
        card.remove();
    }
}

// Функция обработки лайка
export function handleLikeButtonClick(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}