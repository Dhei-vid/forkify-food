import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = 'Recipe was successfully uploaded : )';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  //form
  _form = document.querySelector('.upload');
  title = document.querySelector('#title');
  image = document.querySelector('#image');
  cookingTime = document.querySelector('#cookingTime');
  servings = document.querySelector('#servings');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    if (
      Array.from(this._parentElement.childNodes).length === 1 &&
      Array.from(this._overlay.classList).includes('hidden')
    ) {
      this._parentElement.innerHTML = this._generateFormMarkup();
    }

    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // FormData lets you get data from forms
      const dataArr = [...new FormData(this)];
      // a new way of transforming arrays to objects
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateFormMarkup() {
    return `
        <form class="upload">
            <div class="upload__column">
              <h3 class="upload__heading">Recipe data</h3>
              <label>Title</label>
              <input value="TEST23" required id="title" name="title" type="text" />
              <label>URL</label>
              <input
                value="TEST23"
                required
                id="sourceUrl"
                name="sourceUrl"
                type="text"
              />
              <label>Image URL</label>
              <input value="TEST23" required id="image" name="image" type="text" />
              <label>Publisher</label>
              <input
                value="TEST23"
                required
                id="publisher"
                name="publisher"
                type="text"
              />
              <label>Prep time</label>
              <input
                value="23"
                required
                id="cookingTime"
                name="cookingTime"
                type="number"
              />
              <label>Servings</label>
              <input
                value="23"
                required
                id="servings"
                name="servings"
                type="number"
              />
            </div>

            <div class="upload__column">
              <h3 class="upload__heading">Ingredients</h3>
              <label>Ingredient 1</label>
              <input
                id="ing1"
                value="0.5,kg,Rice"
                type="text"
                required
                name="ingredient-1"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 2</label>
              <input
                id="ing2"
                value="1,,Avocado"
                type="text"
                name="ingredient-2"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 3</label>
              <input
                id="ing3"
                value=",,salt"
                type="text"
                name="ingredient-3"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 4</label>
              <input
                type="text"
                name="ingredient-4"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 5</label>
              <input
                type="text"
                name="ingredient-5"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
              <label>Ingredient 6</label>
              <input
                type="text"
                name="ingredient-6"
                placeholder="Format: 'Quantity,Unit,Description'"
              />
            </div>

            <button class="btn upload__btn">
              <svg>
                <use href="src/img/icons.svg#icon-upload-cloud"></use>
              </svg>
              <span>Upload</span>
            </button>
          </form>`;
  }

  _generateMarkup() {
    return ``;
  }

  _validate() {
    const title = document.querySelector('#title');
    const url = document.querySelector('#sourceUrl');
    const image = document.querySelector('#image');
    const publisher = document.querySelector('#publisher');
    const cookingTime = document.querySelector('#cookingTime');
    const servings = document.querySelector('#servings');
    const ingr1 = document.querySelector('#ingr1');
  }
}

export default new AddRecipeView();
