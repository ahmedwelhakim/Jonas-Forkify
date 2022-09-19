import { API_URL } from '../config';
import { fetchDataAsJSON } from './helper';
import state from './state';

export class Recipe {
   #id;
   #title;
   #publisher;
   #sourceUrl;
   #image;
   #servings;
   #cookingTime;
   #ingredients;
   #isBookmarked;
   #isFull;
   constructor(id, image, publisher, title, sourceUrl, servings, cookingTime, ingredients) {
      this.#id = id;
      this.#title = title;
      this.#publisher = publisher;
      this.#sourceUrl = sourceUrl;
      this.#image = image;
      this.#servings = servings;
      this.#cookingTime = cookingTime;
      this.#ingredients = ingredients;
      this.#isBookmarked = false;
      this.#ingredients =
         this.#ingredients?.map(v => ({
            quantity: !v.quantity ? 0 : v.quantity,
            unit: v.unit,
            description: v.description,
         })) || [];
      this.#isFull = cookingTime && sourceUrl && servings;
   }

   setFullRecipe(sourceUrl, servings, cookingTime, ingredients) {
      this.#sourceUrl = sourceUrl;
      this.#servings = servings;
      this.#cookingTime = cookingTime;
      this.#ingredients = ingredients;
      this.#isFull = true;
   }

   #setBookmark() {
      this.#isBookmarked = true;
      state.addTobookmarked(this);
   }

   #removeBookmark() {
      this.#isBookmarked = false;
      state.removeFromBookmarked(this);
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

   get isFull() {
      return this.#isFull;
   }
}
export function createRecipeObject(dataJSON) {
   const {
      id,
      image_url: imageUrl,
      publisher,
      title,
      source_url: soureUrl,
      servings,
      cooking_time: cookingTime,
      ingredients,
   } = dataJSON;
   return new Recipe(id, imageUrl, publisher, title, soureUrl, servings, cookingTime, ingredients);
}
export async function getRecipe(id) {
   const url = `${API_URL}/${id}`;
   const res = await fetchDataAsJSON(url);
   const recipe = createRecipeObject(res.data.recipe);
   state.recipe = recipe;
   return state.recipe;
}
