
export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    removeItem(link) {
        this._elements = document.querySelectorAll('.place');
        this._elements.forEach((element) => {
            if (element.querySelector('.place__image').src === link){
                element.style.display = 'none';
            }
        })
    }

    renderItems() {
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        });
    }

}