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


const closeButtonProfile = popupProfile.querySelector('.popup__close-button_type_profile');
const closeButtonPlace = popupPlace.querySelector('.popup__close-button_type_place');
const closeButtonPhoto = popupPhoto.querySelector('.popup__close-button_type_photo');

const formList = Array.from(document.querySelectorAll('.popup__item'));
const popupList = Array.from(document.querySelectorAll('.popup'));

//открытие и закрытие форм

function togglePopup(popup){
    popup.classList.toggle('popup_opened');
    validationErrorsDelete (popup);
};

//очистка ошибок валидации
function validationErrorsDelete (popup) {
    const form = popup.querySelector('.popup__container');
    const inputList = form.querySelectorAll('.popup__text');
    inputList.forEach ( (input) => {
        const formError = input.closest('.popup__input').querySelector('.popup__input-error');
        hideInputError(input, formError);
    });
};

//загрузка данных со страницы в форму редактирования профиля

function formProfileInitialInfo (){
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
    
};


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
    const text = item.name;
    const link = item.link;
    renderCard(text, link);
});

function formSubmitHandlerPlace(evt){
    evt.preventDefault();
    const text = popupPlaceName.value;
    const link = popupPlaceLink.value;
    renderCard(text, link);
    popupPlaceForm.reset();
    togglePopup(popupPlace);
};

//затемнение кнопки лайк
function addLike(evt){
    
    evt.target.classList.toggle('place__like-button_active');
};

//удаление карточки
function deleteCard(evt){
    
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

//Закрытие попапов кликом на оверлей и нажатием на Esc

formList.forEach( (form) => closePopup(form));

function closePopup (form) {
    popupList.forEach ( (popup) => {
    popup.addEventListener('click', (evt)  => {
        if (!form.contains(evt.target)){
            togglePopup(popup);
            }
        })

    window.addEventListener('keydown', (evt)  => {
        if (evt.key === 'Escape'){
            popup.classList.remove('popup_opened');
            }
        })

    })

};

