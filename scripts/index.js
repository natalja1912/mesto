const cover = document.querySelector('.cover');
const editButton = cover.querySelector('.cover__edit');
const addButton = cover.querySelector('.cover__add');
const coverName = cover.querySelector('.cover__heading');
const coverJob = cover.querySelector('.cover__subheading');

const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupPhoto = document.querySelector('.popup_type_photo');

const popupProfileForm = document.querySelector('.popup__container_type_profile');
const popupPlaceForm = document.querySelector('.popup__container_type_place');

const popupName = popupProfile.querySelector('.popup__text_type_name');
const popupJob = popupProfile.querySelector('.popup__text_type_job');
const popupPlaceName = popupPlace.querySelector('.popup__text_type_placename');
const popupPlaceLink = popupPlace.querySelector('.popup__text_type_placelink');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupImageText = popupPhoto.querySelector('.popup__text_type_photo');

const places = document.querySelector('.places');
const cardTemplate = document.querySelector('.place__template').content;

const addButtonProfile = popupProfile.querySelector('.popup__add-button_type_profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close-button_type_profile');
const closeButtonPlace = popupPlace.querySelector('.popup__close-button_type_place');
const closeButtonPhoto = popupPhoto.querySelector('.popup__close-button_type_photo');



//открытие и закрытие форм

function togglePopup(popup){
    popup.classList.toggle('popup_opened');

};

//загрузка данных со страницы в форму редактирования профиля

function formProfileInitialInfo (evt){
    togglePopup(popupProfile);
    popupName.value = coverName.textContent;
    popupJob.value = coverJob.textContent;
};

//загрузка данных из формы редактирования профиля исследователя на страницу

function formSubmitHandlerProfile(evt){
    evt.preventDefault();
    coverName.textContent = popupName.value;
    coverJob.textContent = popupJob.value;
    togglePopup(popupProfile);
}


//создание новой карточки

function addCard(text, link) {
    const newCard = cardTemplate.cloneNode(true);
    const placeImage = newCard.querySelector('.place__image');
    newCard.querySelector('.place__heading').textContent=text;
    placeImage.src=link;
    placeImage.alt = text;
    newCard.querySelector('.place__like-button').addEventListener('click', addLike);
    newCard.querySelector('.place__delete-button').addEventListener('click', deleteCard);
    newCard.querySelector('.place__image-button').addEventListener('click', () => handlePreviewPicture(popupPhoto, link, text));
    return newCard;
};

//добавление карточек на страницу

function renderCard(text, link){
    const newCard = addCard(text, link);
    places.prepend(newCard);
};

initialCards.forEach(item => {
    let text = item.name;
    let link = item.link;
    renderCard(text, link);
});

function formSubmitHandlerPlace(evt){
    evt.preventDefault();
    let text = popupPlaceName.value;
    let link = popupPlaceLink.value;
    renderCard(text, link);
    togglePopup(popupPlace);
};

//затемнение кнопки лайк
function addLike(evt){
    const eventTarget = evt.target;
    evt.target.classList.toggle('place__like-button_active');
};

//удаление карточки
function deleteCard(evt){
    const eventTarget = evt.target;
    evt.target.closest('.place').remove();
};

//увеличение фото
function handlePreviewPicture(popupPhoto, link, text){
    togglePopup(popupPhoto);
    popupImageText.textContent = text;
    popupImage.src = link;
    popupImage.alt = text;
    
};

//обработчики событий кнопок

editButton.addEventListener('click', formProfileInitialInfo);
addButton.addEventListener('click', () => togglePopup(popupPlace));

closeButtonProfile.addEventListener('click', () => togglePopup(popupProfile));
closeButtonPlace.addEventListener('click', () => togglePopup(popupPlace));
closeButtonPhoto.addEventListener('click', () => togglePopup(popupPhoto));

popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);
popupPlaceForm.addEventListener('submit', formSubmitHandlerPlace);


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


function setEventListeners (form) {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.from(form.querySelectorAll('.popup__text'));
    const submitButton = form.querySelector('.popup__add-button');
    toggleCloseButton (inputList, submitButton);

    inputList.forEach( (formInput) => {
        const formError = form.querySelector(`#${formInput.id}-error`);
        formInput.addEventListener('input', function () {
             isValid(formInput, formError);
             toggleCloseButton (inputList, submitButton);
        });
    });
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__container'));
    formList.forEach( (form) => {
        setEventListeners (form);
    });
}

enableValidation();

//активация кнопки закрытия формы

function toggleCloseButton (inputList, button){
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