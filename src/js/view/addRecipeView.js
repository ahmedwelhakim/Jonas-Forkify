// eslint-disable-next-line import/no-unresolved
import View from './view';

const parentEl = document.querySelector('.upload');
class AddRecipeView extends View {
   constructor() {
      super(parentEl);
   }

   window = document.querySelector('.add-recipe-window');
   overlay = document.querySelector('.overlay');
   btnOpen = document.querySelector('.nav__btn--add-recipe');
   btnClose = document.querySelector('.btn--close-modal');

   renderError() {
      super.renderError('No bookmarks yet. Find a nice recipe and bookmark it ;)');
   }

   addBookmarkHandler(callbackfn) {
      super.addEventHandler('mouseover', e => {
         if (e.target.closest('.nav__btn--bookmarks')) {
            callbackfn();
         }
      });
      super.addEventHandler('click', e => {
         if (e.target.closest('.nav__btn--bookmarks')) {
            callbackfn();
         }
      });
   }

   toggleWindow() {
      this.overlay.classList.toggle('hidden');
      this.window.classList.toggle('hidden');
   }

   addShowWindowHandler() {
      this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
   }

   addHideWindowHandler() {
      this.btnClose.addEventListener('click', this.toggleWindow.bind(this));
      this.overlay.addEventListener('click', this.toggleWindow.bind(this));
   }


}

export default new AddRecipeView();
