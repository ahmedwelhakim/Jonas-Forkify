import { getRecipe } from './model/recipeModel';
import { RecipeView } from './view/recipeView';

const recipe = getRecipe('5ed6604591c37cdc054bc886');
console.log(recipe);
RecipeView.render(recipe);
