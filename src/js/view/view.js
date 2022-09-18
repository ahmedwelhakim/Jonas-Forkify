// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';

export default class View {
   #parentEl;
   constructor(parentEl) {
      this.#parentEl = parentEl;
   }

   #clear() {
      this.#parentEl.innerHTML = '';
   }

   renderSpinner() {
      const html = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
      this.#clear();
      this.#parentEl.insertAdjacentHTML('afterbegin', html);
   }

   renderMarkup(markup) {
      this.#clear();
      this.#parentEl.insertAdjacentHTML('afterbegin', markup);
   }

   addEventHandler(callbackfn) {
      this.#parentEl.addEventListener('click', e => {
         e.preventDefault();
         callbackfn(e);
      });
   }
}
