import icons from 'url:../../img/icons.svg';

const recipeContainer = document.querySelector('.recipe');
export class RecipeView {
   static async render(recipe) {
      try {
         RecipeView.#renderSpinner();
         const res = await recipe;
         RecipeView.#clear();
         const html = RecipeView.#generateRecipeMarkup(res);
         recipeContainer.insertAdjacentHTML('afterbegin', html);
      } catch (err) {
         RecipeView.#renderError(err.message);
      }
   }

   static #clear() {
      recipeContainer.innerHTML = '';
   }

   static #renderSpinner() {
      const html = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
      RecipeView.#clear();
      recipeContainer.insertAdjacentHTML('afterbegin', html);
   }

   static #generateRecipeMarkup(recipe) {
      const markup = `
      <figure class="recipe__fig">
          <img src=${recipe.image} alt=${recipe.title} class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
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
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
      });
      ingredients += `</ul>
                     </div>`;
      const markup = ` <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>
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
      RecipeView.#clear();
      const html = RecipeView.#generateErrorMarkup(message);
      recipeContainer.insertAdjacentHTML('afterbegin', html);
   }
}
export default { RecipeView };
