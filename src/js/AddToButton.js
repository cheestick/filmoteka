import LocalStorageApi from './localStorageAPI';

const LocalStorage = new LocalStorageApi();

const TEXT_ADD_TO = 'add to';
const TEXT_REMOVE_FROM = 'remove from';
const dbFieldName = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};
export function changeButtonText(buttonElement, movieID) {
  const storageName = buttonElement?.dataset?.button || '*****';
  if (isMovieAlreadyStored(movieID, storageName)) {
    buttonElement.value = `${TEXT_REMOVE_FROM} ${storageName}`;
    return;
  }

  buttonElement.value = `${TEXT_ADD_TO} ${storageName}`;
}

function isMovieAlreadyStored(movieID, storageName) {
  //special case... not good at all. it works only for two buttons
  return storageName === dbFieldName.QUEUE
    ? LocalStorage.getFromWatched().find(movie => movie.Id === movieID)
    : LocalStorage.getFromQueue().find(movie => movie.id === movieID);
}
