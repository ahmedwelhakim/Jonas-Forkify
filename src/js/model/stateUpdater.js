import { getRecipe } from './recipeModel';
import state from './state';

export default async function updateStateFromLocal() {
   const storage = localStorage.getItem('recipes');
   if (!storage) return;
   const obj = JSON.parse(storage);

   await Promise.all(obj.bookmarks.map(id => state.addTobookmarked(getRecipe(id))));
   state.query = obj.query;
}
