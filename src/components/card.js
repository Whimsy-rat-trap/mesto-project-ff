// Функция создания карточки
export function createCard(cardTemplate, cardData, onPopupImage, onLikeCard, onDeleteCard) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
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
    if (card) {
        card.remove();
    }
}

// Функция обработки лайка
export function handleLikeButtonClick(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}