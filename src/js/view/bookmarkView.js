// eslint-disable-next-line import/no-unresolved
import View from './view';

const parentEl = document.querySelector('.nav__btn--bookmarks');

class BookmarkView extends View {
   constructor() {
      super(parentEl);
   }

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
}

export default new BookmarkView();
