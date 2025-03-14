// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import card_1 from './images/card_1.jpg';
import card_2 from './images/card_2.jpg';
import card_3 from './images/card_3.jpg';
import avatar from './images/avatar.jpg';

import './blocks/card/card.css'; // добавьте импорт главного файла стилей 
import './blocks/content/content.css';
import './blocks/footer/footer.css';
import './blocks/header/header.css';
import './blocks/page/page.css';
import './blocks/places/places.css';
import './blocks/popup/popup.css';
import './blocks/profile/profile.css';
import './vendor/fonts.css';
import './vendor/normalize.css';

const CardsAndImages = [
    { name: 'card_1', link: './images/card_1.jpg' },
    { name: 'card_2', link: './images/card_2.jpg' },
    { name: 'card_3', link: './images/card_3.jpg' },
    { name: 'avatar', link: './images/avatar.jpg' },
];