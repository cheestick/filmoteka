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

  //   refreshHeaderMarkup() {
  //     this.clearPageControls();
  //     this.controls.render();
  //   }

  loadLibraryControls() {
    !isTheSamePage(this.currentPage, this.lib) &&
      this.updateControls(new TabController(this.container));
  }

  loadHomeControls() {
    !isTheSamePage(this.currentPage, this.home) &&
      this.updateControls(new SearchController(this.container));
  }

  updateControls(controller) {
    this.clearPageControls();
    this.controls.destroy();
    this.controls = controller;
    this.controls.render();
    this.markup = this.controls.markup;
    this.currentPage = this.controls.page;
    // this.refreshHeaderMarkup();
  }

  clearPageControls() {
    this.container?.firstElementChild?.remove();
    this.markup = controlsError;
  }

  addNavigationHandlers() {
    this.onClickStatic = HeaderHandlers.onClickStatic.bind(this);
    this.logo.addEventListener('click', this.onClickStatic);
    this.home.addEventListener('click', this.onClickStatic);
    this.lib.addEventListener('click', this.onClickStatic);
  }
}

export default new HeaderController();
