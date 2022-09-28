import { getRecipe } from './recipeModel';
import state from './state';

export default async function updateStateFromLocal() {
   const storage = localStorage.getItem('recipes');
   if (!storage) return;
   const obj = JSON.parse(storage);
   if (!obj?.bookmarks) return;
   await Promise.all(obj.bookmarks.map(async id => state.addTobookmarked(await getRecipe(id))));
   state.query = obj.query;
}
