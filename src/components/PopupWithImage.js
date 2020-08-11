import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, item){
        super(popupSelector);
        this._picture = item.image;
        this._text = item.text;
        this._image = this._popup.querySelector('.popup__image');
    }

    open() {
        super.open();        
        this._popup.querySelector('.popup__text').textContent = this._text;
        this._image.src = this._picture;
        this._image.alt = this._text;
    }
}