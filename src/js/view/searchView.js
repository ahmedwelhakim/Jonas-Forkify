import View from './view';

const searchEl = document.querySelector('.search');
class SearchView extends View {
   #parentEl = searchEl;
   constructor() {
      super(searchEl);
   }

   getQuery() {
      const query = this.#parentEl.querySelector('.search__field').value;
      this.#clearInput();
      return query;
   }

   #clearInput() {
      this.#parentEl.querySelector('.search__field').value = '';
   }

   addSearchHandler(callbackfn) {
      this.addEventHandler('submit', e => {
         callbackfn(e);
      });
   }
}

export default new SearchView();
