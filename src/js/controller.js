import 'core-js/stable';

import { getRecipe, uploadRecipe } from './model/recipeModel';
import searchRecipes from './model/searchModel';
import state from './model/state';
import updateStateFromLocal from './model/stateUpdater';
import addRecipeView from './view/addRecipeView';
import bookmarkView from './view/bookmarkView';
import paginationView from './view/paginationView';
import previewView from './view/previewView';
import recipeView from './view/recipeView';
import resultsView from './view/resultsView';
import searchView from './view/searchView';

async function renderRecipeFromHash() {
   const { hash } = window.location;
   try {
      await getRecipe(hash.slice(1));
      recipeView.render();
   } catch (err) {
      recipeView.renderError(err.message);
   }
}
async function searchRenderRecipesResults() {
   try {
      const query = searchView.getQuery();
      await searchRecipes(query === '' ? state.query : query);
      resultsView.renderResults();
      paginationView.renderPagination();
   } catch (err) {
      resultsView.renderError(err.message);
   }
}
async function init() {
   await updateStateFromLocal();
   renderRecipeFromHash();
   searchRenderRecipesResults();
}
recipeView.addServingHandler(
   () => state.recipe.increaseServings(),
   () => state.recipe.decreaseServings()
);
recipeView.addBookmarkHandler(() => state.recipe.toggleBookmark());
searchView.addSearchHandler(async () => {
   await searchRenderRecipesResults();
});
window.addEventListener('hashchange', async () => {
   // to update the selected recipe in recipe result
   resultsView.renderResults();
   renderRecipeFromHash();
});
init();
paginationView.renderPagination();
paginationView.addNextPageHandler(() => {
   state.page += 1;
   resultsView.renderResults();
});
paginationView.addPrevPageHandler(() => {
   state.page -= 1;
   resultsView.renderResults();
});

previewView.renderPreview();
bookmarkView.addBookmarkHandler(() => {
   previewView.renderPreview();
});

addRecipeView.addUploadHandler(async rec => {
   await uploadRecipe(rec);
   recipeView.render();
});
