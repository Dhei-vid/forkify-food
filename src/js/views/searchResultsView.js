import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class SearcResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found! Please try another ;)';

  _generateMarkup() {
    return this._recipeData
      .map(results => {
        console.log(results);
        return previewView.render(results, false);
      })
      .join();
  }
}

export default new SearcResultView();
