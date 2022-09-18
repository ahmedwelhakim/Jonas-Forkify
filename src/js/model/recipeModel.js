import { API_URL } from '../config';
import { fetchDataAsJSON } from './helper';

class Recipe {
   #id;
   #title;
   #publisher;
   #sourceUrl;
   #image;
   #servings;
   #cookingTime;
   #ingredients;
   #isBookmarked;

   constructor(id, title, publisher, sourceUrl, image, servings, cookingTime, ingredients) {
      this.#id = id;
      this.#title = title;
      this.#publisher = publisher;
      this.#sourceUrl = sourceUrl;
      this.#image = image;
      this.#servings = servings;
      this.#cookingTime = cookingTime;
      this.#ingredients = ingredients;
      this.#isBookmarked = false;
      this.#ingredients = this.#ingredients.map(v => ({
         quantity: !v.quantity ? 0 : v.quantity,
         unit: v.unit,
         description: v.description,
      }));
   }

   #setBookmark() {
      this.#isBookmarked = true;
   }

   #removeBookmark() {
      this.#isBookmarked = false;
   }

   toggleBookmark() {
      if (this.#isBookmarked) this.#removeBookmark();
      else this.#setBookmark();
   }

   increaseServings() {
      this.#ingredients = this.#ingredients.map(v => ({
         quantity: v.quantity + v.quantity / this.#servings,
         unit: v.unit,
         description: v.description,
      }));
      this.#servings += 1;
   }

   decreaseServings() {
      if (this.#servings - 1 < 1) return;
      this.#ingredients = this.#ingredients.map(v => ({
         quantity: !v.quantity ? 0 : v.quantity - v.quantity / this.#servings,
         unit: v.unit,
         description: v.description,
      }));
      this.#servings -= 1;
   }

   get id() {
      return this.#id;
   }

   get title() {
      return this.#title;
   }

   get publisher() {
      return this.#publisher;
   }

   get sourceUrl() {
      return this.#sourceUrl;
   }

   get image() {
      return this.#image;
   }

   get servings() {
      return this.#servings;
   }

   get cookingTime() {
      return this.#cookingTime;
   }

   get ingredients() {
      return this.#ingredients;
   }

   get isBookmarked() {
      return this.#isBookmarked;
   }
}
export function createRecipeObject(dataJSON) {
   const { recipe } = dataJSON.data;
   return new Recipe(
      recipe.id,
      recipe.title,
      recipe.publisher,
      recipe.source_url,
      recipe.image_url,
      recipe.servings,
      recipe.cooking_time,
      recipe.ingredients
   );
}
export async function getRecipe(id) {
   const url = `${API_URL}/${id}`;
   const res = await fetchDataAsJSON(url);
   const recipe = createRecipeObject(res);
   return recipe;
}
