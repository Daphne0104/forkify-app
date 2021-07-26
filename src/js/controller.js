// import icons from '../img/icons.svg'; //worked in parcel1
import * as model from './model.js'; //this creates a model object in which all the elements of model.js will be there
import { MODAL_CLOSE_SEC } from './config.js';

import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeVIew.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//loading recipe from api
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // fetch().then(res =>res.json()).the(data =>console.log(data))
    recipeView.renderSpinner();

    // 0) update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1)updating the bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2)loading recipe
    await model.loadRecipe(id); //since loadRecipe is an async function we await it but since it doesn;t return anything we need not store it

    // 3)rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err.message);
    recipeView.renderError();
    console.log(err);
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    // 1)get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResult(query);

    // 3) render results
    // ResultsView.render(model.state.search.results);
    ResultsView.render(model.getSearchResultsPage());

    // 4) render the initial pagination buttons
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // render new results
  ResultsView.render(model.getSearchResultsPage(goToPage));

  // rendering new pagination buttons
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);

  console.log(model.state.recipe);

  // update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// for uploading
const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render the bookmark view
    bookmarksView.render(model.state.bookmarks);

    // history api to change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const newFeautre = function () {
  console.log(`Welcome to hte application`);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeautre();
};

init();
