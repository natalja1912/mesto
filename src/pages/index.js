import  './index.css';
import {editButton, addButton, popupName, popupJob, selectors, initialCards} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';


const profileValidator = new FormValidator(selectors, document.querySelector('.popup__container_type_profile'));
profileValidator.enableValidation();

const placeValidator = new FormValidator(selectors, document.querySelector('.popup__container_type_place'));
placeValidator.enableValidation();

const userInfo = new UserInfo ({userNameSelector: '.cover__heading', userJobSelector:'.cover__subheading'});

const popupProfile = new PopupWithForm ('.popup_type_profile', (data) => {
    const {popup__text_type_name: name, popup__text_type_job: job} = data;
    userInfo.setUserInfo({name, job});
   
});

const popupPlace = new PopupWithForm ('.popup_type_place', (data) => {
    const {popup__text_type_placename: name, popup__text_type_placelink: link} = data;
    renderCard({name, link});
});


//открытие формы для добавления нового места

function formPlaceOpen (){
    placeValidator. formReset();
    popupPlace.open();
}


//открытие формы для редактирования информации о пользователе

function formProfileOpen(){
    profileValidator. formReset();
    
    const info = userInfo.getUserInfo();
    popupName.value = info.name;
    popupJob.value = info.job;
    popupProfile.open();
}

//coздание 6ти первых карточек

const placesSelector = '.places';
const cardList = new Section ({data: initialCards, renderer: renderCard}, placesSelector);
cardList.renderItems();

//добавление новых карточек на страницу

function renderCard(item){
    const card = new Card (item, '.place__template', (item) => handleCardClick(item));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
   
}

function handleCardClick(item){
    const popupImage = new PopupWithImage ('.popup_type_photo', item);
    popupImage.open();
}

//обработчики событий кнопок

editButton.addEventListener('click', formProfileOpen);
addButton.addEventListener('click', formPlaceOpen);


   



