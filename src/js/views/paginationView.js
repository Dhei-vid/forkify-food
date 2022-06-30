import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PageView extends View {
  _parentElement = document.querySelector('.pagination');

  // publisher-SUBSCRIBER design pattern (2)
  paginationHander(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._recipeData.page;
    const numPages = Math.ceil(
      this._recipeData.result.length / this._recipeData.resultPerPage
    );

    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._RightArrow(curPage);
    }

    // other pages
    if (curPage > 1 && numPages > curPage) {
      return [this._LeftArrow(curPage), this._RightArrow(curPage)];
    }

    // Last page
    if (curPage === numPages && curPage > 1) {
      return this._LeftArrow(curPage);
    }

    // page 1
    return '';
  }

  _RightArrow(page) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${page + 1}">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }

  _LeftArrow(page) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${page - 1}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>
    `;
  }
}

export default new PageView();
