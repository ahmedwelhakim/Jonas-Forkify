import 'core-js/stable';
import { getRecipe } from './model/recipeModel';
import { searchRecipes } from './model/searchModel';
import { RecipeView } from './view/recipeView';

const recipe = getRecipe('5ed6604591c37cdc054bc886');
const recipeView = new RecipeView();
recipeView.render(recipe);
searchRecipes('pizza');
recipeView.addServingHandler(
   () =>
      recipe.then(res => {
         res.increaseServings();
      }),
   () => recipe.then(res => res.decreaseServings())
);
recipeView.addBookmarkHandler(() => recipe.then(res => res.toggleBookmark()));
const myClasses = document.querySelectorAll('.my-class');
const dataIsShowingElements = [...myClasses.values()].filter(
   el => el.getAttribute('data-is-showing') === true
);
if (dataIsShowingElements.length > 0) dataIsShowingElements.at(-1).classList.add('last-of-type');
