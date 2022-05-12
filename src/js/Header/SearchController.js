import * as HeaderHandlers from './HeaderEventHandlers';
import { isTheSameControl } from './HeaderEventHandlers';
import { searchForm } from './HeaderMarkup';
import { REF } from './HeaderRefs';

// const SEARCH_REF = document.querySelector('#search-form');

class SearchController {
  constructor(parent) {
    this.parent = parent;
    this.init();
  }

  init() {
    this.page = REF.HOME;
    this.markup = searchForm;
    this.render();
    this.searchForm = document.querySelector('#search-form');
    this.onSearchSubmit = HeaderHandlers.onSearchSubmit.bind(this);
    this.addSubmitHandler();
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.markup());
  }

  remove() {
    this.removeSubmitHandler();
    this.searchForm = null;
  }

  addSubmitHandler() {
    this.searchForm.addEventListener('submit', this.onSearchSubmit);
  }

  removeSubmitHandler() {
    this.searchForm.removeEventListener('submit', this.onSearchSubmit);
    this.onSubmit = null;
  }
}

export default SearchController;
