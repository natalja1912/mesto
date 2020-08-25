import Api from '../components/Api.js';

export const editButton = document.querySelector('.cover__edit');
export const addButton = document.querySelector('.cover__add');
export const avatarButton = document.querySelector('.cover__image');
export const popupName = document.querySelector('.popup__text_type_name');
export const popupJob = document.querySelector('.popup__text_type_job');

export const selectors = {
    formSelector: '.popup__container',
    fieldSelector: '.popup__input',
    inputSelector: '.popup__text',
    errorSelector: '.popup__input-error',
    buttonSelector: '.popup__add-button',
    
};

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'd92f283c-c212-4fc6-810d-3af1a30b9902',
    'Content-Type': 'application/json'
  }
});





 


