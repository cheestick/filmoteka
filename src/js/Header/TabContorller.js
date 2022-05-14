import { onSwitchTab } from './HeaderEventHandlers';
import { isTheSameReferenceElement } from './HeaderEventHandlers';
import { LocalStorageApi as LS } from '../localStorageAPI';
import { libraryTabs } from './HeaderMarkup';
import { REF } from './HeaderRefs';

// const WATCHED_REF = document.querySelector('.tab-watched');
// const QUEUE_REF = document.querySelector('.tab-queue');

class TabController {
  constructor(parentContainer) {
    this.parentContainer = parentContainer;
    this.headerPageElement = REF.LIBRARY;
    this.controllerMarkup = libraryTabs;
    this.onSwitchTab = onSwitchTab.bind(this);
  }

  getVisibleReferences() {
    this.watchedTab = document.querySelector('.tab-watched');
    this.queueTab = document.querySelector('.tab-queue');
    this.activeTab = this.queueTab;
  }

  showInParentContainer() {
    this.parentContainer.insertAdjacentHTML('afterbegin', this.controllerMarkup());
  }

  removeFromParentContainer() {
    this.removeSwitchTabHandlers();
    this.watchedTab = null;
    this.queueTab = null;
    this.activeTab = null;
    this.onSwitchTab = null;
  }

  addControllerHandlers() {
    this.watchedTab.addEventListener('click', this.onSwitchTab);
    this.queueTab.addEventListener('click', this.onSwitchTab);
  }

  removeSwitchTabHandlers() {
    this.watchedTab.removeEventListener('click', this.onSwitchTab);
    this.queueTab.removeEventListener('click', this.onSwitchTab);
  }

  switchToActiveTab(tab) {
    !isTheSameReferenceElement(this.activeTab, tab) && this.setActiveTab(tab);
  }

  setActiveTab(tab) {
    this.activeTab.classList.remove('tab-active');
    this.activeTab = tab;
    this.activeTab.classList.add('tab-active');
<<<<<<< Updated upstream
=======
    this.fetchMyLibraryDataAndRender();
  }

  fetchMyLibraryDataAndRender() {
    const myLibraryData =
      this.activeTab.dataset.tab === 'queue' ? LS.getFromQueu() : LS.getFromWatched();
    console.log(myLibraryData);
    showMoievsCollectionOnPage(myLibraryData, MOVIE_GALLERY_REF);
>>>>>>> Stashed changes
  }
}

export default TabController;
