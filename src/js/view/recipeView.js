// eslint-disable-next-line import/no-unresolved
import { Fraction } from 'fractional';
import icons from 'url:../../img/icons.svg';
import View from './view';

const recipeContainer = document.querySelector('.recipe');
export class RecipeView extends View {
   #recipeDetailsEl;
   #recipeIngredientsEl;
   #currentRecipe;
   constructor() {
      super(recipeContainer);
      this.#currentRecipe = null;
   }

   async render(recipe) {
      try {
         this.renderSpinner();
         const res = await recipe;
         const html = RecipeView.#generateRecipeMarkup(res);
         this.#currentRecipe = res;
         super.renderMarkup(html);
         this.#recipeDetailsEl = document.querySelector('.recipe__details');
         this.#recipeIngredientsEl = document.querySelector('.recipe__ingredients');
      } catch (err) {
         RecipeView.#renderError(err.message);
      }
   }

   updateServings() {
      if (!this.#currentRecipe) return;
      this.#recipeDetailsEl.querySelector(
         '.recipe__info-data.recipe__info-data--people'
      ).innerText = this.#currentRecipe.servings;
      this.#recipeIngredientsEl.querySelectorAll('.recipe__quantity').forEach((recEl, i) => {
         // eslint-disable-next-line no-param-reassign
         recEl.innerText = new Fraction(this.#currentRecipe.ingredients[i].quantity).toString();
      });
   }

   async addServingHandler(increaseCallbackfn, decreaseCallbackfn) {
      super.addEventHandler(async e => {
         const target = e.target.closest('[class ^= btn]');
         if (!target) return;
         if (target.classList.contains('btn--increase-servings')) await increaseCallbackfn();
         if (target.classList.contains('btn--decrease-servings')) await decreaseCallbackfn();
         this.updateServings();
      });
   }

   addBookmarkHandler(callbackfn) {
      super.addEventHandler(e => {
         const target = e.target.closest('[class ^= btn]');
         if (!target) return;
         if (target.classList.contains('btn--bookmark')) callbackfn();
      });
   }

   static #generateRecipeMarkup(recipe) {
      const markup = `
      <figure class="recipe__fig">
          <img src=${recipe.image} alt=${recipe.title} class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>
          ${RecipeView.#generateRecipeDetails(recipe)}
          ${RecipeView.#generateIngredientsMarkup(recipe)}
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href=${recipe.sourceUrl}
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
      return markup;
   }

   static #generateRecipeDetails(recipe) {
      return `
          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">
                ${recipe.cookingTime}
              </span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">
                ${recipe.servings}   
              </span>
              <span class="recipe__info-text">servings</span>
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--decrease-servings">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
            <div class="recipe__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          ${RecipeView.#generateBookmarkMarkup(recipe)}
    `;
   }

   static #generateBookmarkMarkup(recipe) {
      return ` 
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${recipe.isBookmarked ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>`;
   }

   static #generateIngredientsMarkup(recipe) {
      let ingredients = `
      <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            
`;
      recipe.ingredients.forEach(ing => {
         ingredients += `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${new Fraction(ing.quantity).toString()}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
      });
      ingredients += `</ul>
                     </div>`;
      const markup = ` 
         ${ingredients}    
`;
      return markup;
   }

   static #generateErrorMarkup(message) {
      return `
         <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
         </div>`;
   }

   static #renderError(message) {
      const html = RecipeView.#generateErrorMarkup(message);
      recipeContainer.insertAdjacentHTML('afterbegin', html);
   }
}
export default { RecipeView };