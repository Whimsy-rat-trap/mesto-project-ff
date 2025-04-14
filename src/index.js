// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import card_1 from './images/card_1.jpg';
import card_2 from './images/card_2.jpg';
import card_3 from './images/card_3.jpg';
import avatar from './images/avatar.jpg';

import './blocks/card/card.css'; // добавьте импорт главного файла стилей
import './blocks/card/__delete-button/card__delete-button.css';
import './blocks/card/__description/card__description.css';
import './blocks/card/__image/card__image.css';
import './blocks/card/__like-button/_is-active/card__like-button_is-active.css';
import './blocks/card/__like-button/card__like-button.css';
import './blocks/card/__title/card__title.css';
import './blocks/content/content.css';
import './blocks/footer/footer.css';
import './blocks/footer/__copyright/footer__copyright.css';
import './blocks/header/header.css';
import './blocks/header/__logo/header__logo.css';
import './blocks/page/page.css';
import './blocks/page/__content/page__content.css';
import './blocks/page/__section/page__section.css';
import './blocks/places/places.css';
import './blocks/places/__item/places__item.css';
import './blocks/places/__list/places__list.css';
import './blocks/popup/popup.css';
import './blocks/popup/__button/popup__button.css';
import './blocks/popup/__caption/popup__caption.css';
import './blocks/popup/__close/popup__close.css';
import './blocks/popup/__content/popup__content.css';
import './blocks/popup/__content/_content/popup__content_content_image.css'; //ah yes __content_content
import './blocks/popup/__form/popup__form.css';
import './blocks/popup/__image/popup__image.css';
import './blocks/popup/__input/popup__input.css';
import './blocks/popup/__title/popup__title.css';
import './blocks/popup/_is-animated/popup_is-animated.css';
import './blocks/popup/_is-opened/popup_is-opened.css';
import './blocks/profile/profile.css';
import './blocks/profile/__add-button/profile__add-button.css';
import './blocks/profile/__description/profile__description.css';
import './blocks/profile/__edit-button/profile__edit-button.css';
import './blocks/profile/__image/profile__image.css';
import './blocks/profile/__info/profile__info.css';
import './blocks/profile/__title/profile__title.css';
import './pages/index.css'; //the question is whether i need this or not
import './scripts/cards.js';
import * as functions from './scripts/index.js'; //and whether this should be here or in webpack.config
import './vendor/fonts.css';
import './vendor/normalize.css';

const CardsAndImages = [
    { name: 'card_1', link: './images/card_1.jpg' },
    { name: 'card_2', link: './images/card_2.jpg' },
    { name: 'card_3', link: './images/card_3.jpg' },
    { name: 'avatar', link: './images/avatar.jpg' },
];

document.addEventListener('DOMContentLoaded', () => {
    functions.showCard();
});