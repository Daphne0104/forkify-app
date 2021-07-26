import icons from 'url:../../img/icons.svg';
import View from './View.js';
import PreviewView from './previewView.js';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it`;
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
    // using the render method with false parameter we will render the preview as a string
  }
}

export default new bookmarksView();
