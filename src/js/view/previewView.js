// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';
import state from '../model/state';
import View from './view';

const parentEl = document.querySelector('.bookmarks__list');

class PreviewView extends View {
   constructor() {
      super(parentEl);
   }

   renderPreview() {
      super.renderMarkup(
         state.bookmarked.length === 0 ? PreviewView.#defaultMarkup() : PreviewView.#createMarkup()
      );
   }

   static #defaultMarkup() {
      return `	<div class="message">
                  <div>
                    <svg>
                      <use href="${icons}#icon-smile"></use>
                    </svg>
                  </div>
                  <p>
                    No bookmarks yet. Find a nice recipe and bookmark it :)
                  </p>
               </div> `;
   }

   static #createMarkup() {
      return state.bookmarked
         .map(
            rec => `
					<li class="preview">
						<a class="preview__link" href="#${rec.id}">
							<figure class="preview__fig">
								<img src="${rec.image}" alt="${rec.title}" />
							</figure>
							<div class="preview__data">
								<h4 class="preview__name">
								${rec.title}
								</h4>
								<p class="preview__publisher">${rec.publisher}</p>
							</div>
						</a>
					</li> 
					`
         )
         .join('');
   }
}

export default new PreviewView();
