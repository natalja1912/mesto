import './index.css';
import { editButton, addButton, avatarButton, popupSaveButton, popupName, popupJob, selectors, api } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithButton from '../components/PopupWithButton.js';
import PopupWithImage from '../components/PopupWithImage.js';

const profileValidator = new FormValidator(selectors, document.querySelector('.popup__container_type_profile'));
profileValidator.enableValidation();

const placeValidator = new FormValidator(selectors, document.querySelector('.popup__container_type_place'));
placeValidator.enableValidation();

const avatarValidator = new FormValidator(selectors, document.querySelector('.popup__container_type_avatar'));
avatarValidator.enableValidation();

const userInfo = new UserInfo({ userNameSelector: '.cover__heading', userJobSelector: '.cover__subheading', avatarSelector: '.cover__image' });

//изменение текста на кнопке sumbit при загрузке данных с сервера

function renderLoading(data) {
  if (data) {
    popupSaveButton.textContent = "Сохранение...";
  }
  else {
    popupSaveButton.textContent = "Сохранить";
  }
}

//загрузка данных о пользователе с сервера
let myId = '';
api.getUserInfo()
  .then((res) => {
    const name = res.name;
    const job = res.about;
    const link = res.avatar;
    myId = res._id;
    userInfo.setUserInfo({ name, job, link });
  })
  .catch((err) => {
    console.log(err);
  });

const popupProfile = new PopupWithForm('.popup_type_profile', (data) => {
  const { popup__text_type_name: name, popup__text_type_job: job } = data;
  renderLoading(true);
  api.sendUserInfo({ name, job })
    .then(() => {
      userInfo.setUserInfo({ name, job });
    })
    .then(() => {
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(renderLoading(false))
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

  api.getUserInfo()
    .then((res) => {
      popupName.value = res.name;
      popupJob.value = res.about;
    })
    .then(() => popupProfile.open())
    .catch((err) => {
      console.log(err);
    })
}

//замена аватара
function formAvatarOpen() {
  avatarValidator.formReset();
  popupAvatar.open();
}

const popupAvatar = new PopupWithForm('.popup_type_avatar', (data) => {
  const avatarLink = data.popup__text_type_placelink;
  renderLoading(true);
  api.changeAvatar(avatarLink)
    .then(() => {
      avatarButton.style.backgroundImage = `url(${avatarLink})`;
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(renderLoading(false));
});

popupAvatar.setEventListeners();

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
  renderLoading(true);
  api.postNewCard({ name, link })
    .then((res) => {
      const card = {};
      createItem(res, card);
      renderCard(card);
    })
    .then(() => {
      popupPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(renderLoading(false));
});

popupPlace.setEventListeners();

function renderCard(item) {
  const card = new Card(item, myId, '.place__template', (item) => handleCardClick(item), (cardID) => handleDeleteClick(cardID), (cardID) => addLikeClick(cardID), (cardID) => deleteLikeClick(cardID));
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

function handleCardClick(item) {
  popupImage.open(item);
}

function addLikeClick(cardId) {
  api.addLike(cardId)
    .catch((err) => {
      console.log(err);
    });
}

function deleteLikeClick(cardId) {
  api.deleteLike(cardId)
    .catch((err) => {
      console.log(err);
    });
}

//удаление карточки по клику на корзину

let cardId = '';
function handleDeleteClick(id) {
  cardId = id;
}

const popupDelete = new PopupWithButton('.popup_type_delete', () => {
  api.deleteCard(cardId)
    .then(() => popupDelete.close())
    .then(() => document.querySelector(placesSelector).firstChild.remove())
    .then(() => api.getInitialCards())
    .catch((err) => {
      console.log(err);
    });
});
popupDelete.setEventListeners();

//обработчики событий кнопок

editButton.addEventListener('click', formProfileOpen);
addButton.addEventListener('click', formPlaceOpen);
avatarButton.addEventListener('click', formAvatarOpen);






