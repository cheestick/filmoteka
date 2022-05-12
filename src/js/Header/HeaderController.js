import { searchForm, libraryTabs, controlsError } from './HeaderMarkup';
import * as HeaderHandlers from './HeaderEventHandlers';
import { REF } from './HeaderRefs';

console.log(REF);

class HeaderController {
  constructor() {
    this.initStaticContent();
    this.addNavigationHandlers();
    this.refreshPageMarkup();
  }

  initStaticContent() {
    this.logo = REF.LOGO;
    this.home = REF.HOME;
    this.lib = REF.LIBRARY;
    this.controls = REF.CONTAINER;
    this.markup = libraryTabs();
  }

  initDynamicContent() {}

  refreshPageMarkup() {
    this.controls.insertAdjacentHTML('afterbegin', this.markup);
  }

  loadLibraryControls() {
    this.clearPageControls();
    this.markup = libraryTabs();
    this.refreshPageMarkup();
  }

  loadHomeControls() {
    this.clearPageControls();
    this.markup = searchForm();
    this.refreshPageMarkup();
  }

  clearPageControls() {
    this.controls?.firstElementChild?.remove();
    this.markup = controlsError();
  }

  addNavigationHandlers() {
    this.onClickStatic = HeaderHandlers.onClickStatic.bind(this);
    this.logo.addEventListener('click', this.onClickStatic);
    this.home.addEventListener('click', this.onClickStatic);
    this.lib.addEventListener('click', this.onClickStatic);
  }

  addTabsHandlers() {}

  removeTabsHandlers() {}

  addSubmitHandler() {}

  removeSubmitHandler() {}
}

export default new HeaderController();
