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
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

// Закрытие попапа (обновленная функция)
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
}