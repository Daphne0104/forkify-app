import icons from 'url:../../img/icons.svg';
import View from './View.js';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _message = `Recipe was successfully loaded`;

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  keydownWindow(e) {
    if (
      e.key === 'Escape' &&
      !this._window.classList.contains('hidden') &&
      !this._window.classList.contains('hidden')
    ) {
      this._overlay.classList.toggle('hidden');
      this._window.classList.toggle('hidden');
    }
  }
//handler內部的this會指向被監聽物件
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));

    document.addEventListener('keydown', this.keydownWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //here this points to the _parentElement
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
