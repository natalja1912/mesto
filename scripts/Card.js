import {openPopup} from './utils.js';

//создание новой карточки

export default class Card {
    constructor (data, cardSelector){
        this._text = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;        
    }

    _getTemplate(){
        const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.place');
        const newTemplate = cardTemplate.cloneNode(true);
        return newTemplate;
    }

    generateCard(){
        this._element = this._getTemplate();
        this._placeImage = this._element.querySelector('.place__image');
        this._placeImage.src = this._image;
        this._element.querySelector('.place__heading').textContent = this._text;
        this._placeImage.alt = this._text;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners(){
        const likeButton = this._element.querySelector('.place__like-button');
        likeButton.addEventListener('click', () => {this._addLike(likeButton)});
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {this._deleteCard()});
        this._element.querySelector('.place__image-button').addEventListener('click', () => {this._handlePreviewPicture()});
    }

    _addLike(likeButton){
        likeButton.classList.toggle('place__like-button_active');
      
    }

    _deleteCard(){
        this._element.closest('.place').remove();
    }
    

    _handlePreviewPicture(){
        const popupPhoto = document.querySelector('.popup_type_photo');
        const popupPhotoImage = popupPhoto.querySelector('.popup__image');
        
        openPopup(popupPhoto);
        popupPhoto.querySelector('.popup__text').textContent = this._text;
        popupPhotoImage.src = this._image;
        popupPhotoImage.alt = this._text;
              
    }
}