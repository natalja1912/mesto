//валидация форм редактирования профиля и добавления нового места


function showInputError(formInput, formError){
    formError.classList.add('popup__input-error_active');
    formInput.classList.add('popup__text_type_error');
    if (formInput){
        formError.textContent = formInput.validationMessage;
    }
}

function hideInputError(formInput, formError){
    formError.classList.remove('popup__input-error_active');
    formInput.classList.remove('popup__text_type_error');
}

function isValid(formInput, formError) {
    
    if (!formInput.validity.valid){
        showInputError(formInput, formError);
    }
    else {
        hideInputError(formInput, formError);
    }
}


function setEventListeners (form, fieldSelector, inputSelector, errorSelector, buttonSelector) {
    
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(buttonSelector);
    toggleSubmitButton (inputList, submitButton);

    inputList.forEach( (formInput) => {
        const formError = formInput.closest(fieldSelector).querySelector(errorSelector);
        formInput.addEventListener('input', function () {
             isValid(formInput, formError);
             toggleSubmitButton (inputList, submitButton);
        });
    });
}

function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach( (form) => {
        setEventListeners (form, obj.fieldSelector, obj.inputSelector, obj.errorSelector, obj.buttonSelector);
    });
}

enableValidation({
    formSelector: '.popup__container',
    fieldSelector: '.popup__input',
    inputSelector: '.popup__text',
    errorSelector: '.popup__input-error',
    buttonSelector: '.popup__add-button',
    
});

//активация кнопки закрытия формы

function toggleSubmitButton (inputList, button){
    if (hasInvalidInput (inputList)){
    button.classList.add('popup__add-button_inactive');
   }
   else {
    button.classList.remove('popup__add-button_inactive');
   }
}

function hasInvalidInput (inputList){
    
    return (inputList.some((input) => {
        return !input.validity.valid;
    }));
    
}