let cover = document.querySelector('.cover');
let editButton = cover.querySelector('.cover__edit');
let coverName = cover.querySelector('.cover__heading');
let coverJob = cover.querySelector('.cover__subheading');
let popup = document.querySelector('.popup');
let addButton = popup.querySelector('.popup__add-button');
let closeButton = popup.querySelector('.popup__close-button');
let popupName = popup.querySelector('.popup__text_type_name');
let popupJob = popup.querySelector('.popup__text_type_job');

//открытие и закрытие формы с редактированием профиля

function popupToggle(){
    popup.classList.toggle('popup_opened');
}


editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);

popupName.value = coverName.textContent;
popupJob.value = coverJob.textContent;


//загрузка данных из формы на страницу

let popupForm = document.querySelector('.popup');

let formSubmitHandler = function formSubmitHandler(evt){
    evt.preventDefault();
    coverName.textContent = popupName.value;
    coverJob.textContent = popupJob.value;
    popupToggle();
}

popupForm.addEventListener('submit', formSubmitHandler);





