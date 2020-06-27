const cover = document.querySelector('.cover');
const editButton = cover.querySelector('.cover__edit');
const addButton = cover.querySelector('.cover__add');
const coverName = cover.querySelector('.cover__heading');
const coverJob = cover.querySelector('.cover__subheading');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup__container_type_profile');
const popupPlace = document.querySelector('.popup__container_type_place');
const addButtonProfile = popupProfile.querySelector('.popup__add-button_type_profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close-button_type_profile');
const closeButtonPlace = popupPlace.querySelector('.popup__close-button_type_place');
const popupName = popupProfile.querySelector('.popup__text_type_name');
const popupJob = popupProfile.querySelector('.popup__text_type_job');
const places = document.querySelector('.places');
const cardTemplate = document.querySelector('.place__template').content;

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

function addCard(name, link) {
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.place__heading').textContent=name;
    newCard.querySelector('.place__image').src=link;
    places.append(newCard);
};

initialCards.forEach(item => {
    let name = item.name;
    let link = item.link;
    addCard(name, link);
});

//открытие и закрытие форм

function popupToggle(popupContainer){
    const popupCurrent = popupContainer.parentElement;
    popupCurrent.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened') && popupContainer.classList.contains('popup__container_type_profile') ) {
    popupName.value = coverName.textContent;
    popupJob.value = coverJob.textContent;
    }
}

//загрузка данных из формы редактирования профиля исследователя на страницу

function formSubmitHandler(evt){
    evt.preventDefault();
    coverName.textContent = popupName.value;
    coverJob.textContent = popupJob.value;
    popupToggle();
}

editButton.addEventListener('click', () => popupToggle(popupProfile));
addButton.addEventListener('click', () => popupToggle(popupPlace));
closeButtonProfile.addEventListener('click', () => popupToggle(popupProfile));
closeButtonPlace.addEventListener('click', () => popupToggle(popupPlace));
popupProfile.addEventListener('submit', formSubmitHandler);





