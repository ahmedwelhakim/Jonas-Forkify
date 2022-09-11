import { API_URL } from '../config';
import { fetchDataAsJSON } from './helper';

function createRecipeObject(dataJSON) {
   const { recipe } = dataJSON.data;
   return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
   };
}
export async function getRecipe(id) {
   const url = `${API_URL}/${id}`;
   const res = await fetchDataAsJSON(url);
   const recipe = createRecipeObject(res);
   return recipe;
}
export default { getRecipe };
