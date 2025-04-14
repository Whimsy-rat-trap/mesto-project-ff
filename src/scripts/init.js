import {openEditProfilePopup, GetPopupEdit, openPopup, GetPopupNewCard } from "./index.js"
//Добавления обработчиков
export function AddHandlers() {
    // Обработчик клика на кнопку редактирования профиля
    document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);
    GetPopupEdit().classList.add('popup_is-animated'); // Добавляем анимацию после закрытия
    document.querySelector('.profile__add-button').addEventListener('click', openPopup);
    GetPopupNewCard().classList.add('popup_is-animated');
    GetpopupImage().classList.add('popup_is-animated');
    // Прикрепляем обработчик к форме редактирования:
    GetformEditProfile().addEventListener('submit', handleFormSubmit);
    
    const closePopupButtons = document.querySelectorAll('.popup__close');
    // Обработчик события для закрытия попапа
    closePopupButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const popup = e.target.closest('.popup');
            closePopup(popup);

            document.removeEventListener('keydown', handleEscClose);
            
            if (popup === GetpopupImage()) {
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
        const nameValue = GetnameInput().value;
        const jobValue = GetjobInput().value;
    
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

                if (popup === GetpopupImage()) {
                    document.removeEventListener('keydown', handleEscClose);
                } else { 
                    document.addEventListener('keydown', handleEscClose);
                }
                
            }
        });
    });
}