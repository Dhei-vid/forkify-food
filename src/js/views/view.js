import icons from 'url:../../img/icons.svg';

export default class View {
  _recipeData;

  render(recipeData, render = true) {
    // To check if the recipe exists,
    // It checks if there is data and if there is if the data has an array and if it does if it is empty
    if (!recipeData || (Array.isArray(recipeData) && recipeData.length === 0))
      return this.renderError();

    this._recipeData = recipeData;
    const markup = this._generateMarkup();

    if (!render) return markup;

    // This removes any existing XML in the recipe container
    this._clearMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // This algorithm is to change selected parts of the DOM and not update everything
  updateDOM(data) {
    this._recipeData = data;
    const newMarkup = this._generateMarkup();

    // this is to convert the markup string to DOM node objects that is in the memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // We can treat the newDOM object as the DOM and select all the elements there

    // Having the new and current elements, we want to compare the DOM elements for both and make changes where there are not equal.
    // Array.from we can convert elements to array.
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];

      // UPDATE CHANGED TEXT
      // we need to check for nodes that are not equal and for nodes that have text
      // We are making use of firstChild because that is where the text is. newEl is just an element, where the text is its child element
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
        // console.log('🍘🍘🍘', newEl.firstChild?.nodeValue);
      }

      // UPDATE CHANGED ATTRIBUTE
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clearMarkup() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._generateSpinnerMarkup()
    );
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clearMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;
    this._clearMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateSpinnerMarkup() {
    return `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
  }
}
