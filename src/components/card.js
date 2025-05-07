import { fetchRemoveCard, fetchDeleteLike, fetchAddLike } from "./api.js";
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
    if (cardData.hasLiked) {
        likeButton.classList.toggle('card__like-button_is-active');
    }
    if (!cardData.isMyCard) {
        deleteButton.remove();
    }

    // Добавляем обработчик клика на изображение
    cardImage.addEventListener('click', () => onPopupImage(cardData));

    // Используем переданную функцию для обработки клика на кнопку лайка
    likeButton.addEventListener('click', () => onLikeCard(cardElement));

    deleteButton.addEventListener('click', () => onDeleteCard(cardElement));

    return cardElement;
}

// Функция удаления карточки
export function removeCard(card) {
    if (card) {
        fetchRemoveCard(card.id)
        .then (() => card.remove());
    }
}

// Функция обработки лайка
export function handleLikeButtonClick(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    if (likeButton.classList.contains('card__like-button_is-active')) {
        fetchDeleteLike(cardElement.id)
        .then((card) => {
            likeCounter.textContent = card.likes.length;
        })
    } else {
        fetchAddLike(cardElement.id)
        .then((card) => {
            likeCounter.textContent = card.likes.length;
        })
    };
    likeButton.classList.toggle('card__like-button_is-active');
}