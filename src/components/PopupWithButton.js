import Popup from './Popup.js';

export default class PopupWithButton extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
        this._submit = handleSubmit;
        this._submitButton = this._popup.querySelector('.popup__add-button');
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => {
            this._submit();
            this.close()
        });
    }

}