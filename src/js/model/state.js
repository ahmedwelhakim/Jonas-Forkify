import { RESULTS_PER_PAGE } from '../config';

class State {
   #query;
   #recipe;
   #results = [];
   #bookmarked = [];
   #page = 1;
   #maxPages = 0;
   #resultsPerPage = RESULTS_PER_PAGE;
   /**
    * @param {Recipe} recipe
    */
   set recipe(recipe) {
      this.#recipe = recipe;
   }

   get recipe() {
      return this.#recipe;
   }

   /**
    * @param {string} query
    */
   set query(query) {
      this.#query = query;
      this.#saveToLocal();
   }

   get query() {
      return this.#query;
   }

   /**
    * @param {Recipe[]} results
    */
   set results(results) {
      this.#results = [...results];
      this.#maxPages = Math.ceil(this.#results.length / this.#resultsPerPage);
   }

   get results() {
      return this.#results.slice(0);
   }

   get maxPage() {
      return this.#maxPages;
   }
   /**
    * @param {Recipe[]} bookmarked
    */

   addTobookmarked(...rec) {
      if (!rec[0]) return;
      this.#bookmarked.push(...rec);
      this.#saveToLocal();
   }

   removeFromBookmarked(rec) {
      this.#bookmarked = this.#bookmarked.filter(b => b.id !== rec.id);
      this.#saveToLocal(rec);
   }

   get bookmarked() {
      return this.#bookmarked.slice(0);
   }

   set page(p) {
      this.#page = p;
   }

   get page() {
      return this.#page;
   }

   get resultsPerPage() {
      return this.#resultsPerPage;
   }

   #saveToLocal(del) {
      const obj = JSON.parse(localStorage.getItem('recipes'));
      const idSet = new Set();
      if (obj?.bookmarks) obj.bookmarks.forEach(id => idSet.add(id));
      this.#bookmarked.forEach(rec => idSet.add(rec.id));
      localStorage.setItem(
         'recipes',
         JSON.stringify({
            bookmarks: [...idSet.values()].filter(id => id !== del?.id),
            query: this.query ? this.query : obj.query,
         })
      );
   }
}
export default new State();
