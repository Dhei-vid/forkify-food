import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class PreviewBookmark extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet! Find a nice recipe and bookmark it ;)';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._recipeData
      .map(bookmark => previewView.render(bookmark, false))
      .join();
  }
}

export default new PreviewBookmark();
