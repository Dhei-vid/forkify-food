class SearchView {
  _parentElement = document.querySelector('.search');
  _searchBar = document.querySelector('.search__field');

  getQuery() {
    // Two ways of doing the same thing
    // return this.#parentElement.querySelector('.search__field').value;
    const queryResult = document.querySelector('.search .search__field').value;
    this._clearQuery();
    return queryResult;
  }

  _clearQuery() {
    this._searchBar.value = '';
  }

  // publisher-SUBSCRIBER design pattern (1)
  searchHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
