export default class LocalStorageApi {
  setStorage() {
    if (localStorage.getItem('watched') == null) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
    if (localStorage.getItem('queue') == null) {
      localStorage.setItem('queue', JSON.stringify([]));
    }
    localStorage.setItem('modalFilmInfo', JSON.stringify([]));
    localStorage.setItem('all', JSON.stringify([]));
  }

  saveToAll(value) {
    try {
      localStorage.setItem('all', JSON.stringify(value));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  saveToModal(value) {
    try {
      localStorage.setItem('modalFilmInfo', JSON.stringify(value));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  getFromModal(value) {
    try {
      const data = localStorage.getItem('modalFilmInfo');
      return JSON.parse(data);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  getFromWatched() {
    try {
      const data = localStorage.getItem('watched');
      return JSON.parse(data);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  saveToWatched(value) {
    try {
      const tempArr = this.getFromWatched();
      tempArr.push(value);
      localStorage.setItem('watched', JSON.stringify(tempArr));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  deleteFromWatched(value) {
    const { id: checkingId } = value;
    try {
      const tempArr = this.getFromWatched();
      const arrForSave = tempArr.filter(({ id }) => id != checkingId);
      localStorage.setItem('watched', JSON.stringify(arrForSave));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  filmIsPresentInWatched(value) {
    const { id: checkingId } = value;
    try {
      const filmsFromWatched = this.getFromWatched();
      console.log(filmsFromWatched);
      const resultOfSearch = filmsFromWatched.find(({ id }) => id == checkingId);
      return resultOfSearch ? true : false;
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  getFromQueu() {
    try {
      const data = localStorage.getItem('queue');
      return JSON.parse(data);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  saveToQueu(value) {
    try {
      const tempArr = this.getFromQueu();
      tempArr.push(value);
      localStorage.setItem('queue', JSON.stringify(tempArr));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  deleteFromQueu(value) {
    const { id: checkingId } = value;
    try {
      const tempArr = this.getFromQueu();
      const arrForSave = tempArr.filter(({ id }) => id != checkingId);
      localStorage.setItem('queue', JSON.stringify(arrForSave));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  filmIsPresentQueu(value) {
    const { id: checkingId } = value;
    try {
      const filmsFromQueu = this.getFromQueu();
      const resultOfSearch = filmsFromQueu.find(({ id }) => id == checkingId);
      return resultOfSearch ? true : false;
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  getFromAll() {
    try {
      const data = localStorage.getItem('all');
      return JSON.parse(data);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }
}
