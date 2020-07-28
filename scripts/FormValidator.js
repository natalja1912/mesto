
//валидация форм редактирования профиля и добавления нового места

export default class FormValidator{
    constructor (data, form) {
        this._form  = form;
        this._inputList = Array.from(this._form.querySelectorAll(data.inputSelector));
        this._button = this._form.querySelector(data.buttonSelector);
        this._fieldSelector = data.fieldSelector;
        this._errorSelector = data.errorSelector;
    }

    _setEventListeners(){
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._toggleSubmitButton();
      
        this._inputList.forEach( (formInput) =>  {
            const formError = formInput.closest(this._fieldSelector).querySelector(this._errorSelector);
            formInput.addEventListener('input', () => {
                 this._isValid(formInput, formError);
                 this._toggleSubmitButton();
            });
        });
    }

    _isValid(formInput, formError) {
        if (!formInput.validity.valid)
        {
            this._showInputError(formInput, formError);
        }
        else {
            this._hideInputError(formInput, formError);
        }
    }

    _showInputError(formInput, formError){
        formError.classList.add('popup__input-error_active');
        formInput.classList.add('popup__text_type_error');
        if (formInput){
            formError.textContent = formInput.validationMessage;
        }
    }

    _hideInputError(formInput, formError){
        formError.classList.remove('popup__input-error_active');
        formInput.classList.remove('popup__text_type_error');
        formError.textContent = '';
    }

    _validationErrorsDelete () {
        this._inputList.forEach ( (input) => {
            const formError = input.closest(this._fieldSelector).querySelector(this._errorSelector);
            this._hideInputError(input, formError);
        });
    }


    _toggleSubmitButton(){
        if (this._hasInvalidInput ()) {
            this._button.classList.add('popup__add-button_inactive');
            this._button.setAttribute('disabled', true);
           }
           else {
            this._button.classList.remove('popup__add-button_inactive');
            this._button.removeAttribute('disabled');
           }
    }

    _hasInvalidInput() {
        return (this._inputList.some((input) => {
            return !input.validity.valid;
        }));
    }


    enableValidation(){
        this._validationErrorsDelete();
        this._setEventListeners();
    }
}


