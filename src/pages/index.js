import './index.css';
import { editButton, addButton, popupName, popupJob, selectors, api} from '../utils/constants.js';
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


const userInfo = new UserInfo({ userNameSelector: '.cover__heading', userJobSelector: '.cover__subheading' });

//загрузка данных о пользователе с сервера
let myId = '';
api.getUserInfo()
  .then((res) => {
        const name = res.name;
        const job = res.about;
        myId = res._id;
        userInfo.setUserInfo({name, job});
      })
  .catch((err) => {
    console.log(err); 
  });

const popupProfile = new PopupWithForm('.popup_type_profile', (data) => {
    const { popup__text_type_name: name, popup__text_type_job: job } = data;
    userInfo.setUserInfo({ name, job });
    api.sendUserInfo({ name, job });

});

popupProfile.setEventListeners();

//добавление новых карточек на страницу

function createItem(item, card){
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
    api.postNewCard({ name, link })
    .then((res) => {
      const card = {};
      createItem(res, card);
      renderCard(card);
    })
    .catch((err) => {
        console.log(err); 
      })    
});

popupPlace.setEventListeners();

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
      })})
  .then(() => render())
  .catch((err) => {
    console.log(err); 
  });

function render() {
    cardList.renderItems();    
    }

//добавление новых карточек на страницу

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






