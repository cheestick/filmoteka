import { searchForm, libraryTabs, controlsError } from './HeaderMarkup';
import * as HeaderHandlers from './HeaderEventHandlers';
import { isTheSameControl as isTheSamePage } from './HeaderEventHandlers';
import TabController from './TabContorller';
import SearchController from './SearchController';
import { REF } from './HeaderRefs';

console.log(REF);

class HeaderController {
  constructor() {
    this.initStaticContent();
    this.addNavigationHandlers();
  }

  initStaticContent() {
    this.logo = REF.LOGO;
    this.home = REF.HOME;
    this.lib = REF.LIBRARY;
    this.container = REF.CONTAINER;
    this.controls = new TabController(this.container);
    this.currentPage = this.controls.page;
  }

  loadLibraryControls() {
    !isTheSamePage(this.controls.page, this.lib) &&
      this.updateControls(new TabController(this.container));
  }

  loadHomeControls() {
    !isTheSamePage(this.controls.page, this.home) &&
      this.updateControls(new SearchController(this.container));
  }

  updateControls(controller) {
    this.controls.remove();
    this.clearPageControls();
    console.log(controller);
    this.controls = controller;
    this.controls.render();
    this.currentPage = this.controls.page;
  }

  clearPageControls() {
    console.log('-> ', this.container);
    // this.container?.firstElementChild?.remove();
    this.container.innerHTML = ``;
  }

  addNavigationHandlers() {
    this.onClickStatic = HeaderHandlers.onClickStatic.bind(this);
    this.logo.addEventListener('click', this.onClickStatic);
    this.home.addEventListener('click', this.onClickStatic);
    this.lib.addEventListener('click', this.onClickStatic);
  }
}

export default new HeaderController();
