import View from './view.js';

class SortRecipeView extends View {
  btn = document.querySelector('.nav__btn--sort');

  constructor() {
    console.log('This will work');
  }
}

export default new SortRecipeView();
