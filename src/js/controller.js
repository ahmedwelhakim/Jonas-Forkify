import 'core-js/stable';

import { getRecipe } from './model/recipeModel';
import searchRecipes from './model/searchModel';
import state from './model/state';
import updateStateFromLocal from './model/stateUpdater';
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
//updateStateFromLocal();
recipeView.addServingHandler(
   () => state.recipe.increaseServings(),
   () => state.recipe.decreaseServings()
);
recipeView.addBookmarkHandler(() => state.recipe.toggleBookmark());
searchView.addSearchHandler(async () => {
   try {
      await searchRecipes(searchView.getQuery());
      resultsView.renderResults();
      paginationView.renderPagination();
   } catch (err) {
      resultsView.renderError(err.message);
   }
});
window.addEventListener('hashchange', async () => {
   // to update the selected recipe in recipe result
   console.log(state);
   resultsView.renderResults();
   renderRecipeFromHash();
});
renderRecipeFromHash();
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
