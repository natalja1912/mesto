
//создание новой карточки

export default class Card {
    constructor(data, myId, cardSelector, handleCardClick, handleDeleteClick, addLikeClick, deleteLikeClick) {
        this._text = data.name;
        this._image = data.link;
        this._currentUserId = myId;
        this._userId = data.ownerId;
        this._cardId = data.cardId;
        this._likesCount = data.likes.length;
        this._likesUsers = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._addLikeClick = addLikeClick;
        this._deleteLikeClick = deleteLikeClick;

    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.place');
        const newTemplate = cardTemplate.cloneNode(true);
        return newTemplate;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._placeImage = this._element.querySelector('.place__image');
        this._deleteButton = this._element.querySelector('.place__delete-button');
        this._countLikesButton = this._element.querySelector('.place__sumoflikes-button');
        this._placeImage.src = this._image;
        this._element.querySelector('.place__heading').textContent = this._text;
        this._placeImage.alt = this._text;
        this._countLikesButton.textContent = this._likesCount;
        if (this._userId !== this._currentUserId) {
            this._deleteButton.style.display = 'none';
        }

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        const likeButton = this._element.querySelector('.place__like-button');
        likeButton.addEventListener('click', () => { this._addLike(likeButton) });
        this._deleteButton.addEventListener('click', () => { this._deleteCard() });
        this._element.querySelector('.place__image-button').addEventListener('click', () => { this._handleCardClick({ image: this._image, text: this._text }) });
    }

    _addLike(likeButton) {
        if (!this._likesUsers.includes(this._currentUserId)) {
            likeButton.classList.toggle('place__like-button_active');

            if (likeButton.classList.contains('place__like-button_active')) {
                this._countLikesButton.textContent = this._likesCount + 1;
                this._addLikeClick(this._cardId);
            }
            else {
                if (this._likesCount === 0) {
                    this._countLikesButton.textContent = 0;
                }
                else {
                    this._countLikesButton.textContent -= 1;
                }
                this._deleteLikeClick //добавление новых карточек на страницу

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

                popupPlace.setEventListeners(); (this._cardId);
            }
        }
    }

    _deleteCard() {
        document.querySelector('.popup_type_delete').classList.add('popup_opened');
        this._handleDeleteClick(this._cardId);
    }

}