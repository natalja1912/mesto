
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        window.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        window.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {

        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._quickClosePopup();
        this._closeButton.addEventListener('click', () => this.close());
    }

    _quickClosePopup() {
        const popupElement = this._popup.querySelector('.popup__item');
        this._popup.addEventListener('click', (evt) => {
            if (!popupElement.contains(evt.target)) {
                this.close();
            }
        });
    }

}