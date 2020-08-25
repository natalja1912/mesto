import './index.css';
import { editButton, addButton, avatarButton, popupName, popupJob, selectors, api } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

const profileValidator = new FormValidator(selectors, document.querySelector('.popup__container_type_profile'));
profileValidator.enableValidation();

const placeValidator = new FormValidator(selectors, document.querySelector('.popup__container_type_place'));
placeValidator.enableValidation();

const avatarValidator = new FormValidator(selectors, document.querySelector('.popup__container_type_avatar'));
avatarValidator.enableValidation();

const userInfo = new UserInfo({ userNameSelector: '.cover__heading', userJobSelector: '.cover__subheading', avatarSelector: '.cover__image' });

const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

//изменение текста на кнопке sumbit при загрузке данных с сервера
function renderLoading(data, containerSelector) {
  const popupSaveButton = document.querySelector(containerSelector).querySelector('.popup__add-button');
  if (data) {
    popupSaveButton.textContent = "Сохранение...";
    popupSaveButton.setAttribute('disabled', true);
  }
  else {
    popupSaveButton.textContent = "Сохранить";
    popupSaveButton.setAttribute('disabled', false);
  }
}
//замена аватара
function formAvatarOpen() {
  avatarValidator.formReset();
  popupAvatar.open();
}

const popupAvatar = new PopupWithForm('.popup_type_avatar', (data) => {
  const avatarLink = data.popup__text_type_placelink;
  renderLoading(true, '.popup_type_avatar');
  api.changeAvatar(avatarLink)
    .then(() => {
      avatarButton.style.backgroundImage = `url(${avatarLink})`;
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, '.popup_type_avatar'));
});

popupAvatar.setEventListeners();

//загрузка данных о пользователе с сервера
let myId = '';
api.getUserInfo()
  .then((res) => {
    myId = res._id;
    const { name, about, avatar } = res;
    userInfo.setUserInfo({ name, about, avatar });
  })
  .catch((err) => {
    console.log(err);
  });

const popupProfile = new PopupWithForm('.popup_type_profile', (data) => {
  const { popup__text_type_name: name, popup__text_type_job: about } = data;
  renderLoading(true, '.popup_type_profile');
  api.sendUserInfo({ name, about })
    .then(() => {
      const avatar = avatarButton.style.backgroundImage;
      userInfo.setUserInfo({ name, about, avatar });
    })
    .then(() => {
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, '.popup_type_profile'))
});

popupProfile.setEventListeners();

//открытие формы для добавления нового места

function formPlaceOpen() {
  placeValidator.formReset();
  popupPlace.open();
}

//открытие формы для редактирования информации о пользователе

function formProfileOpen() {
  profileValidator.formReset();
  const info = userInfo.getUserInfo();
  popupName.value = info.name;
  popupJob.value = info.about;
  popupProfile.open();
}

//загрузка первых карточек на страницу
const placesSelector = '.places';
let initialCards = [];

const cardList = new Section({ data: initialCards, renderer: renderCard }, placesSelector);

api.getInitialCards()
  .then((res) => {
    const data = res;
    data.forEach(item => {
      const card = {};
      createItem(item, card);
      initialCards.push(card);
    })
  })
  .then(() => render())
  .catch((err) => {
    console.log(err);
  });

function render() {
  cardList.renderItems();
}

//добавление новых карточек на страницу

function createItem(item, card) {
  card.name = item.name;
  card.link = item.link;
  card.ownerId = item.owner._id;
  card.cardId = item._id;
  card.likes = [];
  item.likes.forEach((like) => {
    card.likes.push(like._id);
  })
}

const popupPlace = new PopupWithForm('.popup_type_place', (data) => {
  const { popup__text_type_placename: name, popup__text_type_placelink: link } = data;
  renderLoading(true, '.popup_type_place');
  api.postNewCard({ name, link })
    .then((res) => {
      const card = {};
      createItem(res, card);
      initialCards.push(card);
      renderCard(card);
    })
    .then(() => {
      popupPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, '.popup_type_place'));
});

popupPlace.setEventListeners();

//функция для создания и отрисовки новой карточки
function renderCard(item) {
  const card = new Card(item, myId, '.place__template', (item) => handleCardClick(item), (card) => handleDeleteClick(card), (cardID) => addLikeClick(cardID), (cardID) => deleteLikeClick(cardID));
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

function handleCardClick(item) {
  popupImage.open(item);
}

function addLikeClick(cardId) {
  api.changeLike(cardId, 'PUT')
    .catch((err) => {
      console.log(err);
    });
}

function deleteLikeClick(cardId) {
  api.changeLike(cardId, 'DELETE')
    .catch((err) => {
      console.log(err);
    });
}

//удаление карточки по клику на корзину
const popupDelete = new Popup('.popup_type_delete');
popupDelete.setEventListeners();

function handleDeleteClick(card) {
  popupDelete.open();
  document.querySelector('.popup__add-button_type_delete').addEventListener('click', () => {
    api.deleteCard(card._cardId)
      .then(() => card.removeCard())
      .then(() => popupDelete.close())
      .catch((err) => {
        console.log(err);
      });
  })
}

//обработчики событий кнопок

editButton.addEventListener('click', formProfileOpen);
addButton.addEventListener('click', formPlaceOpen);
avatarButton.addEventListener('click', formAvatarOpen);






