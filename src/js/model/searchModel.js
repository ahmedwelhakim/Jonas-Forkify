import { API_URL } from '../config';
import { fetchDataAsJSON } from './helper';

export async function searchRecipes(query) {
   const url = `${API_URL}?search=${query}`;
   const res = await fetchDataAsJSON(url);
}
export default searchRecipes;
