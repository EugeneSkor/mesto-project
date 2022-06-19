export default class Section {
  constructor({ items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }

  renderItems() {
    /* Array.from(this._renderedItems).forEach*/
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
