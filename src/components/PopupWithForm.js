import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
        this._submit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__text');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    open() {
        super.open();
        this._form.addEventListener('submit', this._formSubmit);
    }

    _formSubmit = (evt) => {
        evt.preventDefault();
        const data = this._getInputValues();
        this._submit(data);
        this.close();
    }

    close() {
        super.close();
        this._form.removeEventListener('submit', this._formSubmit);
    
    }

}