// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';
import state from '../model/state';
import View from './view';

const resultsEl = document.querySelector('.results');

class ResultsView extends View {
   constructor() {
      super(resultsEl);
   }

   renderError() {
      super.renderError('No recipes found for your query! Please try again ;)');
   }

   renderResults() {
      const recipes = state.results.slice(
         state.resultsPerPage * (state.page - 1),
         state.resultsPerPage * state.page
      );
      let markup = '';
      recipes.forEach(r => {
         markup += ResultsView.#generatePreviewMarkup(r);
      });
      this.renderMarkup(markup);
   }

   static #generatePreviewMarkup(recipe) {
      const id = window.location.hash.slice(1);

      return `
      <li class="preview">
        <a class="preview__link ${recipe.id === id ? 'preview__link--active' : ''}" href="#${
         recipe.id
      }">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated ${recipe.key ? '' : 'hidden'}">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
   }
}
export default new ResultsView();
