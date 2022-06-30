import View from './view.js';
//  Ways to load the icons in parcel 1 and 2
// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
import fracty from 'fracty';
// import Fraction from 'fractional';

// var Fraction = require('fractional').Fraction;

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another';
  _successMessage =
    'Start by searching for a recipe or an ingredient. Have fun!';

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');

      if (!btn) return;

      const updateServings = +btn.dataset.servings;
      if (updateServings > 0) handler(updateServings);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;

      console.log(btn);

      handler();
    });
  }

  // PUBLISHER-subscriber Design pattern
  addHandlerRender(handler) {
    /**
     * Using the load event handler we want to listen for each hash id load. Without the load, the hash does not change especially when we paste the link in another tab.
     */
    // window.addEventListener('load', controlRecipe);
    // window.addEventListener('hashchange', controlRecipe);

    // a more efficient way to call multiple event handlers
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  _generateMarkup() {
    return `
            <figure class="recipe__fig">
              <img src="${this._recipeData.image}" alt="${
      this._recipeData.title
    }" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._recipeData.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._recipeData.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  this._recipeData.servings
                }</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--update-servings" data-servings="${
                    this._recipeData.servings - 1
                  }">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--update-servings" data-servings="${
                    this._recipeData.servings + 1
                  }">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>
 
              <div class="recipe__user-generated ${
                this._recipeData.key ? '' : 'hidden'
              }"> 
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round btn--bookmark">
                <svg class="">
                  <use href="${icons}#icon-bookmark${
      this._recipeData.bookmarked ? '-fill' : ''
    }"></use>
                </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">

              ${this._recipeData.ingredients
                .map(ing => this._generateIngredientMarkup(ing))
                .join('')}
              </ul>
            </div>

            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  this._recipeData.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${this._recipeData.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
   `;
  }

  _generateIngredientMarkup(ing) {
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ing.quantity ? fracty(ing.quantity).toString() : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>`;
  }
}

// we create a new object other than export the other because we don't want any the external code to access its contents
export default new RecipeView();
