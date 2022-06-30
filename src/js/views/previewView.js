import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
          <a class="preview__link ${
            this._recipeData.id === id ? 'preview__link--active' : ''
          }" href="#${this._recipeData.id}">
            <figure class="preview__fig">
              <img src="${this._recipeData.image}" alt="${
      this._recipeData.title
    }" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${this._recipeData.title}</h4>
              <p class="preview__publisher">${this._recipeData.publisher}</p> 
              <div class="preview__user-generated ${
                this._recipeData.key ? '' : 'hidden'
              }"> 
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
        `;
  }
}

export default new PreviewView();
