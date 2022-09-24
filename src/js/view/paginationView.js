// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';
import state from '../model/state';
import View from './view';

const parentEl = document.querySelector('.pagination');

class PaginationView extends View {
   constructor() {
      super(parentEl);
   }

   renderPagination() {
      super.renderMarkup(PaginationView.#createMarkup());
   }

   static #createMarkup() {
      if (state.maxPage === 0) return '';
      let markup = '';
      if (state.page !== 1 && state.page !== state.maxPage)
         markup = `
			<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${state.page - 1}</span>
         </button>
			<button class="btn--inline pagination__btn--next">
            <span>Page ${state.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
         </button>
		`;
      if (state.page === 1)
         markup += `
			<button class="btn--inline pagination__btn--next">
            <span>Page ${state.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
         </button>
		`;
      if (state.page === state.maxPage)
         markup += `
			<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${state.page - 1}</span>
         </button>`;
      return markup;
   }

   addNextPageHandler(callbackfn) {
      super.addEventHandler('click', e => {
         if (e.target.closest('.pagination__btn--next')) {
            callbackfn();
            this.renderPagination();
         }
      });
   }

   addPrevPageHandler(callbackfn) {
      super.addEventHandler('click', e => {
         if (e.target.closest('.pagination__btn--prev')) {
            callbackfn();
            this.renderPagination();
         }
      });
   }
}

export default new PaginationView();
