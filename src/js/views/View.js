// this will be a parent class for all the child classes
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
// generate this markup and then compare that new HTML to the current HTML,
//and then only change text and attributes that actually have changed from the old version to the new version

//目標: 不完全更換整個RECIPEVIEW，而是只有更新數字
//newMarkup會是string，很難比較，所以轉換成DOMoBJECT
//convert this markup string to a DOM object that's living in the memory
//and that we can then use to compare with the actual DOM that's on the page.

//So a DOM that is not really living on the page but  lives in our memory.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // updates changed text
      //比較+選取出文字
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(newEl.firstChild.nodeValue.trim(), newEl.firstChild);
        curEl.textContent = newEl.textContent;
      }

      // updates changed attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // rendering the error
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // rendering the success
  renderMessage(message = this._errorMessage) {
    const markup = `
        <div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
