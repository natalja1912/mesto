import Card from './Card.js';
import initialCards from './utils.js';
import FormValidator from './FormValidator.js';

const cover = document.querySelector('.cover');
const editButton = cover.querySelector('.cover__edit');
const addButton = cover.querySelector('.cover__add');
const coverName = cover.querySelector('.cover__heading');
const coverJob = cover.querySelector('.cover__subheading');

const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupPhoto = document.querySelector('.popup_type_photo');

const popupProfileForm = document.querySelector('.popup__container_type_profile');
const popupPlaceForm = document.querySelector('.popup__container_type_place');

const popupName = popupProfile.querySelector('.popup__text_type_name');
const popupJob = popupProfile.querySelector('.popup__text_type_job');
const popupPlaceName = popupPlace.querySelector('.popup__text_type_placename');
const popupPlaceLink = popupPlace.querySelector('.popup__text_type_placelink');

const closeButtonProfile = popupProfile.querySelector('.popup__close-button_type_profile');
const closeButtonPlace = popupPlace.querySelector('.popup__close-button_type_place');
const closeButtonPhoto = popupPhoto.querySelector('.popup__close-button_type_photo');

const formList = Array.from(document.querySelectorAll('.popup__container'));
const popupList = Array.from(document.querySelectorAll('.popup'));

//открытие и закрытие форм

function openPopup(popup){
    popup.classList.add('popup_opened');
    
}

function closePopup(popup){
    popup.classList.remove('popup_opened');

    if (popup.classList.contains('popup_type_profile')){
        profileValidator. formReset();
    }
    
    if (popup.classList.contains('popup_type_place')){
        placeValidator. formReset();
    }
    
}


//валидация форм
const selectors = {
    formSelector: '.popup__container',
    fieldSelector: '.popup__input',
    inputSelector: '.popup__text',
    errorSelector: '.popup__input-error',
    buttonSelector: '.popup__add-button',
    
};

const profileValidator = new FormValidator(selectors, popupProfileForm);
profileValidator.enableValidation();

const placeValidator = new FormValidator(selectors, popupPlaceForm);
placeValidator.enableValidation();


//загрузка данных со страницы в форму редактирования профиля

function formProfileInitialInfo (){
    openPopup(popupProfile);
    popupName.value = coverName.textContent;
    popupJob.value = coverJob.textContent;
}

//загрузка данных из формы редактирования профиля исследователя на страницу

function formSubmitHandlerProfile(evt){
    evt.preventDefault();
    coverName.textContent = popupName.value;
    coverJob.textContent = popupJob.value;
    closePopup(popupProfile);
    
}

//coздание 6ти первых карточек

initialCards.forEach(item => {
    renderCard(item);
});

//добавление новой карточки на страницу

function renderCard(item){
    const card = new Card (item, '.place__template');
    const cardElement = card.generateCard();
    document.querySelector('.places').prepend(cardElement);
}

//добавление новой карточки из формы редактирования на страницу

function formSubmitHandlerPlace(evt){
    evt.preventDefault();
    const text = popupPlaceName.value;
    const link = popupPlaceLink.value;
    renderCard({name: text, link: link});
    closePopup(popupPlace);
}


//обработчики событий кнопок

editButton.addEventListener('click', formProfileInitialInfo);
addButton.addEventListener('click', () => openPopup(popupPlace));

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonPlace.addEventListener('click', () => closePopup(popupPlace));
closeButtonPhoto.addEventListener('click', () => closePopup(popupPhoto));

popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);
popupPlaceForm.addEventListener('submit', formSubmitHandlerPlace);

//Закрытие попапов кликом на оверлей и нажатием на клавишу Escape

popupList.forEach (popup => quickClosePopup (popup));

function quickClosePopup (popup) {
    window.addEventListener('keydown', (evt) => escHandler(evt, popup));
    const popupElement = popup.querySelector('.popup__item');
    popup.addEventListener('click', (evt)  => {
        if (!popupElement.contains(evt.target)){
            closePopup(popup);
            }
        });
}
  
function escHandler (evt, popup) {
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
        closePopup(popup);
        } 
}





