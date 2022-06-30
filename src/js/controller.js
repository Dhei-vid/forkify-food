import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import PageView from './views/paginationView.js';
import PreviewBookmark from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SECONDS as modalClose } from './config.js';

// Polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    // Getting the hash ID
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    searchResultsView.updateDOM(model.getSearchResultPage());
    // 0) Updating bookmark view
    PreviewBookmark.updateDOM(model.state.bookmark);

    // 1) Spinner before we load recipe
    recipeView.renderSpinner();

    // 2) Load recipe
    // We have to handle this because it is an async function being called so a promise is returned
    await model.loadRecipe(id);

    // 3) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResult = async function () {
  try {
    // Spinner for the search results
    searchResultsView.renderSpinner();

    // 1) Get and clear search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResult(query);

    // 3) Render search results . model.state.search.page
    // searchResultsView.render(model.state.search.result);
    searchResultsView.render(model.getSearchResultPage());

    // 4) Render page buttons
    PageView.render(model.state.search);
  } catch (error) {
    throw error;
  }
};

// Publisher-SUBSCRIBER Design pattern (2)
// controlling what happens when the button is clicked
const controlPagination = function (goToPage) {
  // render new click results
  searchResultsView.render(model.getSearchResultPage(goToPage));

  // 4) Render new click page buttons
  PageView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the state servings
  model.updateServings(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.updateDOM(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  // 2) Updating the recipe data
  recipeView.updateDOM(model.state.recipe);

  // 3) Render bookmark
  PreviewBookmark.render(model.state.bookmark);
};

const controlBookmark = function () {
  PreviewBookmark.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Loading Spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render the new recie in the DOm
    recipeView.render(model.state.recipe);

    // Render bookmark view
    addRecipeView.render(model.state.bookmark);

    // success message
    addRecipeView.renderMessage();

    // Change ID of url using the browser HISTORY API - it allows us to change the URL without reloading the page
    // It takes 3 arguments 1) State - doesn't really matter 2) Title - doesn't matter 3) URL to the id we want to change
    window.history.pushState(' ', ' ', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
      location.reload();
    }, modalClose * 1000);
  } catch (err) {
    throw err;

    addRecipeView.renderError(err.message);
  }
};

// Publisher-SUBSCRIBER Design pattern (1)
const init = function () {
  PreviewBookmark.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.searchHandler(controlSearchResult);
  PageView.paginationHander(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('I did it');
};

init();
