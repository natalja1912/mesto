let cover = document.querySelector('.cover');
let editButton = cover.querySelector('.cover__edit');
let coverName = cover.querySelector('.cover__heading');
let coverJob = cover.querySelector('.cover__subheading');
let popup = document.querySelector('.popup');
let addButton = popup.querySelector('.popup__add-button');
let closeButton = popup.querySelector('.popup__close-button');
let popupName = popup.querySelector('.popup__text_type_name');
let popupJob = popup.querySelector('.popup__text_type_job');

editButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    popupName.placeholder = coverName.textContent;
    popupJob.placeholder = coverJob.textContent;
});

addButton.addEventListener('click', function () {
    coverName.textContent = popupName.value;
    coverJob.textContent = popupJob.value;
    popup.classList.remove('popup_opened');
});

closeButton.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

