import { onSwitchTab } from './HeaderEventHandlers';
import { isTheSameControl } from './HeaderEventHandlers';
import { LocalStorageApi as LS } from '../localStorageAPI';
import { libraryTabs } from './HeaderMarkup';
import { REF } from './HeaderRefs';

// const WATCHED_REF = document.querySelector('.tab-watched');
// const QUEUE_REF = document.querySelector('.tab-queue');

class TabController {
  constructor(parent) {
    this.parent = parent;
    this.init();
  }

  init() {
    this.page = REF.LIBRARY;
    this.markup = libraryTabs;
    this.render();
    this.watched = document.querySelector('.tab-watched');
    this.queue = document.querySelector('.tab-queue');
    console.log(this.watched);
    console.log(this.queue);
    this.activeTab = this.queue;
    this.onSwitchTab = onSwitchTab.bind(this);
    console.log(this.onSwitchTab);
    this.addSwitchTabHandlers();
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.markup());
  }

  remove() {
    this.removeSwitchTabHandlers();
    this.watched = null;
    this.queue = null;
    this.activeTab = null;
    this.onSwitchTab = null;
  }

  addSwitchTabHandlers() {
    console.log(this);
    this.watched.addEventListener('click', this.onSwitchTab);
    this.queue.addEventListener('click', this.onSwitchTab);
  }

  removeSwitchTabHandlers() {
    this.watched.removeEventListener('click', this.onSwitchTab);
    this.queue.removeEventListener('click', this.onSwitchTab);
  }

  switchToTab(tab) {
    !isTheSameControl(this.activeTab, tab) && this.setActiveTab(tab);
  }

  setActiveTab(tab) {
    this.activeTab.classList.remove('tab-active');
    this.activeTab = tab;
    this.activeTab.classList.add('tab-active');
  }
}

export default TabController;
