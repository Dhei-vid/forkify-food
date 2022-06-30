import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helperF.js';
import { AJAX } from './helperF.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmark: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image_url,
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    cookingTime: recipe.cooking_time,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    // 1) Load recipe
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    // console.log(data);

    state.recipe = createRecipeObject(data);

    if (state.bookmark.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    // since the result for the search will be an array of recipes, we need to loop through each one. Reason we are using map
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
        ...(rec.key && { key: rec.key }),
      };
    });

    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // updating the ingredients mathematically
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // updating the servings
  state.recipe.servings = newServings;
};

const persistBookmark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmark.push(recipe);

  //Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark();
};

export const removeBookmark = function (id) {
  const index = state.bookmark.findIndex(ind => ind);
  // delete bookmark
  state.bookmark.splice(index, 1);

  //Mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
};

const init = function () {
  const storedBookmark = localStorage.getItem('bookmark');

  if (storedBookmark) state.bookmark = JSON.parse(storedBookmark);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// clearBookmarks();

/**
 * Upload the recipe data to be rendered and stored in the localStorage
 * @param {Object[]} newRecipe An array of recipe objects
 * @author David Etuk
 * @todo Further implementation
 */
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredients format. Please use correct format'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // Making a post request for the recipe to be uploaded
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    // we want to render the new recipe to the DOM, hence we created the createRecipeObject method as a first step, which we will use here
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
