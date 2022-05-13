import { searchForm, libraryTabs, controlsError } from './HeaderMarkup';
import * as HeaderHandlers from './HeaderEventHandlers';
import { isTheSameReferenceElement } from './HeaderEventHandlers';
import TabController from './TabContorller';
import SearchController from './SearchController';
import { REF } from './HeaderRefs';

// console.log(REF);

class HeaderController {
  constructor() {
    this.logoButton = REF.LOGO;
    this.homeButton = REF.HOME;
    this.myLibraryButton = REF.LIBRARY;
    this.formAndTabsContainer = REF.CONTAINER;
    this.addNavigationHandlers();
    this.controller = new SearchController(this.formAndTabsContainer);
    this.currentHeaderPage = this.controller.headerPageElement;
    this.showAndUpdateCurrentHeaderLook();
  }

  showAndUpdateCurrentHeaderLook() {
    this.setActiveHeaderPage();
    this.controller.showInParentContainer();
    this.controller.getVisibleReferences();
    this.controller.addControllerHandlers();
  }

  updateToMyLibraryControls() {
    !isTheSameReferenceElement(this.controller.headerPageElement, this.myLibraryButton) &&
      this.updateControls(new TabController(this.formAndTabsContainer));
  }

  updateToSearchControls() {
    !isTheSameReferenceElement(this.controller.headerPageElement, this.homeButton) &&
      this.updateControls(new SearchController(this.formAndTabsContainer));
  }

  updateControls(controller) {
    this.clearPageControls();
    this.controller.removeFromParentContainer();
    this.controller = controller;
    this.showAndUpdateCurrentHeaderLook();
  }

  setActiveHeaderPage() {
    this.currentHeaderPage.classList.remove('active');
    this.currentHeaderPage = this.controller.headerPageElement;
    this.currentHeaderPage.classList.add('active');
  }

  clearPageControls() {
    // this.container?.firstElementChild?.remove();
    this.formAndTabsContainer.innerHTML = null;
  }

  addNavigationHandlers() {
    this.onClickStatic = HeaderHandlers.onClickStatic.bind(this);
    this.logoButton.addEventListener('click', this.onClickStatic);
    this.homeButton.addEventListener('click', this.onClickStatic);
    this.myLibraryButton.addEventListener('click', this.onClickStatic);
  }
}

export default new HeaderController();
