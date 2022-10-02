export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._cardContainer = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._cardContainer.prepend(element);
  }

  renderItems(items) {
    /* Array.from(this._renderedItems).forEach*/
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
