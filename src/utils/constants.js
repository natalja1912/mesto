

export const editButton = document.querySelector('.cover__edit');
export const addButton = document.querySelector('.cover__add');

export const popupName = document.querySelector('.popup__text_type_name');
export const popupJob = document.querySelector('.popup__text_type_job');

export const selectors = {
    formSelector: '.popup__container',
    fieldSelector: '.popup__input',
    inputSelector: '.popup__text',
    errorSelector: '.popup__input-error',
    buttonSelector: '.popup__add-button',
    
};

//6 первоначальных карточек 

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];