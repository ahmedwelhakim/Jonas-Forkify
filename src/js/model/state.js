import { RESULTS_PER_PAGE } from '../config';

class State {
   #query;
   #recipe;
   #results = [];
   #bookmarked = [];
   #page = 1;
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
   }

   get query() {
      return this.#query;
   }

   /**
    * @param {Recipe[]} results
    */
   set results(results) {
      this.#results = [...results];
   }

   get results() {
      return this.#results.slice(0);
   }

   /**
    * @param {Recipe[]} bookmarked
    */

   addTobookmarked(rec) {
      this.#bookmarked.push(rec);
   }

   removeFromBookmarked(rec) {
      this.#bookmarked = this.#bookmarked.filter(b => b !== rec);
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
}
export default new State();
