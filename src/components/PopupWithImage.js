import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(item) {
        super.open();
        this._popup.querySelector('.popup__text').textContent = item.text;
        this._image = this._popup.querySelector('.popup__image');
        this._image.src = item.image;
        this._image.alt = item.text;
    }
}