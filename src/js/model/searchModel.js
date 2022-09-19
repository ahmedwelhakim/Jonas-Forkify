import { API_URL } from '../config';
import { fetchDataAsJSON } from './helper';
import { createRecipeObject } from './recipeModel';
import state from './state';

export default async function searchRecipes(query) {
   state.query = query;
   const url = `${API_URL}?search=${query}`;
   const res = await fetchDataAsJSON(url);
   state.results = res.data.recipes.map(r => createRecipeObject(r));
   return state.results;
}
