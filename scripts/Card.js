

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
        this._setEventListeners();
        this._element.querySelector('.place__image').src = this._image;
        this._element.querySelector('.place__heading').textContent = this._text;
        this._element.querySelector('.place__image').alt = this._text;

        return this._element;
    }

    _setEventListeners(){
        this._element.querySelector('.place__like-button').addEventListener('click', () => {this._addLike()});
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {this._deleteCard()});
        this._element.querySelector('.place__image-button').addEventListener('click', () => {this._handlePreviewPicture()});
    }

    _addLike(){
        this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
      
    }

    _deleteCard(){
        this._element.closest('.place').remove();
    }

    _handlePreviewPicture(){
        const popupPhoto = document.querySelector('.popup_type_photo');
        popupPhoto.classList.toggle('popup_opened');
        popupPhoto.querySelector('.popup__text').textContent = this._text;
        popupPhoto.querySelector('.popup__image').src = this._image;
        popupPhoto.querySelector('.popup__image').alt = this._text;
    }

}
