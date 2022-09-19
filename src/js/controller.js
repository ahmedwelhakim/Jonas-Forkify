import 'core-js/stable';

import { getRecipe } from './model/recipeModel';
import searchRecipes from './model/searchModel';
import state from './model/state';
import recipeView from './view/recipeView';
import resultsView from './view/resultsView';
import searchView from './view/searchView';

async function init() {
   const { hash } = window.location;
   await getRecipe(hash.slice(1));
   recipeView.render();
}
recipeView.addServingHandler(
   () => state.recipe.increaseServings(),
   () => state.recipe.decreaseServings()
);
recipeView.addBookmarkHandler(() => state.recipe.toggleBookmark());
searchView.addSearchHandler(async () => {
   await searchRecipes(searchView.getQuery());
   resultsView.renderResults();
});
window.addEventListener('hashchange', async () => {
   const { hash } = window.location;
   resultsView.renderResults();
   await getRecipe(hash.slice(1));
   recipeView.render();
});
init();
// recipeView.render(recipe);
// searchRecipes('pizza');
// recipeView.addServingHandler(
//    () =>
//       recipe.then(res => {
//          res.increaseServings();
//       }),
//    () => recipe.then(res => res.decreaseServings())
// );
// recipeView.addBookmarkHandler(() => recipe.then(res => res.toggleBookmark()));
// console.log(searchRecipes('pizza'));
// console.log(getRecipe('5ed6604591c37cdc054bcd09'));
