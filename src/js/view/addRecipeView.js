// eslint-disable-next-line import/no-unresolved
import View from './view';

const parentEl = document.querySelector('.upload');
const window = document.querySelector('.add-recipe-window');
const overlay = document.querySelector('.overlay');
const btnOpen = document.querySelector('.nav__btn--add-recipe');
const btnClose = document.querySelector('.btn--close-modal');

class AddRecipeView extends View {
   constructor() {
      super(parentEl);
      btnClose.addEventListener('click', AddRecipeView.#toggleWindow);
      overlay.addEventListener('click', AddRecipeView.#toggleWindow);
      btnOpen.addEventListener('click', AddRecipeView.#toggleWindow);
   }

   static #toggleWindow() {
      overlay.classList.toggle('hidden');
      window.classList.toggle('hidden');
   }

   addUploadHandler(callbackfn) {
      super.addEventHandler('submit', () => {
         const dataEntries = [...new FormData(this)];
         callbackfn(Object.fromEntries(dataEntries));
      });
   }
}

export default new AddRecipeView();
