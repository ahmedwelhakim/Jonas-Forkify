// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';

export default class View {
   #parentEl;
   constructor(parentEl) {
      this.#parentEl = parentEl;
   }

   get parentEl() {
      return this.#parentEl;
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

   renderError(message) {
      const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
      this.renderMarkup(markup);
   }

   renderMessage(message) {
      const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
      this.renderMarkup(markup);
   }

   renderMarkup(markup) {
      this.#clear();
      this.#parentEl.insertAdjacentHTML('afterbegin', markup);
   }

   addEventHandler(type, callbackfn) {
      this.#parentEl.addEventListener(type, e => {
         e.preventDefault();
         callbackfn(e);
      });
   }
}
