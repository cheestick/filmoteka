import { REF } from './Header/HeaderRefs';
import LocalStorageApi from './localStorageAPI';

const TEXT_ADD_TO = 'add to';
const TEXT_REMOVE_FROM = 'remove from';
const dbFieldName = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};

// const buttonWatched = document.querySelector('[data-button="watched"]');
// const buttonQueue = document.querySelector('[data-button="queue"]');

const LocalStorage = new LocalStorageApi();

export function composeButtonText(movieID, storageName) {
  console.log(movieID, storageName);
  return isMovieAlreadyStored(movieID, storageName)
    ? `${TEXT_REMOVE_FROM} ${storageName}`
    : `${TEXT_ADD_TO} ${storageName}`;
}

export function changeButtonText() {
  this.innerText = composeButtonText(Number(this.dataset.movieId), this.dataset.button);
}

function isMovieAlreadyStored(movieID, storageName) {
  //special case... not good at all. it works only for two buttons
  let isStored = null;
  if (storageName === dbFieldName.QUEUE) {
    isStored = LocalStorage.getFromQueue().find(movie => movie.id === movieID) ? true : false;
  }
  if (storageName === dbFieldName.WATCHED) {
    isStored = LocalStorage.getFromWatched().find(movie => movie.id === movieID) ? true : false;
  }
  console.log(isStored);

  return isStored;
}

export function isLibraryTabAcive() {
  return document.querySelector;
}
