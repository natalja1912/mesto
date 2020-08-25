
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

        this._likeButton = this._element.querySelector('.place__like-button');
        if (this._likesUsers.includes(this._currentUserId)){
            this._likeButton.classList.add('place__like-button_active');
        }

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => { this._addLike() });
        this._deleteButton.addEventListener('click', () => { this._handleDeleteCard() });
        this._element.querySelector('.place__image-button').addEventListener('click', () => { this._handleCardClick({ image: this._image, text: this._text }) });
    }

    _addLike() {
        this._likeButton.classList.toggle('place__like-button_active');

            if (this._likeButton.classList.contains('place__like-button_active')) {
                this._countLikesButton.textContent = this._likesCount + 1;
                this._addLikeClick(this._cardId);
            }

            else {
                if (this._likesCount === 0) {
                    this._countLikesButton.textContent = 0;
                }
                else {
                    this._countLikesButton.textContent -= 1;
                    this._deleteLikeClick(this._cardId);
                }
            }
        }

    _handleDeleteCard() {
        this._handleDeleteClick(this);
    } 
    
    removeCard(){
        this._element.remove();
        this._element = null;
    }

}