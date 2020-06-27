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


//загрузка 6 карточек на страницу

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//затемнение кнопки лайк
function addLike(evt){
    const eventTarget = evt.target;
    eventTarget.classList.toggle('place__like-button_active');
};

//удаление карточки
function deleteCard(evt){
    const eventTarget = evt.target;
    eventTarget.closest('.place').remove();
};


//открытие и закрытие форм

function popupToggle(popup){
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened') && popup.classList.contains('popup_type_profile') ) {
        popupName.value = coverName.textContent;
        popupJob.value = coverJob.textContent;
    }

};

//увеличение фото
function enlargePhoto(popupPhoto, link, text){
    popupToggle(popupPhoto);
    popupImageText.textContent = text;
    popupImage.src = link;
    popupImage.alt = text;
    
};


//загрузка данных из формы редактирования профиля исследователя на страницу

function formSubmitHandlerProfile(evt){
    evt.preventDefault();
    coverName.textContent = popupName.value;
    coverJob.textContent = popupJob.value;
    popupToggle(popupProfile);
}

//добавление карточек на страницу

function formSubmitHandlerPlace(evt){
    evt.preventDefault();
    let text = popupPlaceName.value;
    let link = popupPlaceLink.value;
    addCard(text, link);
    popupToggle(popupPlace);
}

function addCard(text, link) {
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.place__heading').textContent=text;
    newCard.querySelector('.place__image').src=link;
    newCard.querySelector('.place__image').alt = text;
    newCard.querySelector('.place__like-button').addEventListener('click', addLike);
    newCard.querySelector('.place__delete-button').addEventListener('click', deleteCard);
    newCard.querySelector('.place__image-button').addEventListener('click', () => enlargePhoto(popupPhoto, link, text));
    places.prepend(newCard);
};

initialCards.forEach(item => {
    let text = item.name;
    let link = item.link;
    addCard(text, link);
});

//добавление фунциональности кнопкам

editButton.addEventListener('click', () => popupToggle(popupProfile));
addButton.addEventListener('click', () => popupToggle(popupPlace));

closeButtonProfile.addEventListener('click', () => popupToggle(popupProfile));
closeButtonPlace.addEventListener('click', () => popupToggle(popupPlace));
closeButtonPhoto.addEventListener('click', () => popupToggle(popupPhoto));

popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);
popupPlaceForm.addEventListener('submit', formSubmitHandlerPlace);






