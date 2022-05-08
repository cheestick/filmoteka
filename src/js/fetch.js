import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '?api_key=ad8c6c4dd7f8a685c9c739255442ccd5';

export default class FilmsApiService {
  async fetchArticles(filmName) {
    const urlTrending = `${BASE_URL}trending/movie/day${API_KEY}&page=1`;

    if (!filmName) {
      return await axios.get(urlTrending).then(res => {
        // console.log(res.data.total_results);
        if (!(res.status >= 200 && res.status < 300)) {
          throw Error(res.statusText);
        }
        return res;
      });
    } else {
      console.log(filmName);
      const QUERY_VALUE = filmName;
      const urlQuery = `${BASE_URL}search/movie${API_KEY}&query=${QUERY_VALUE}&page=1`;

      return await axios.get(urlQuery).then(res => {
        // console.log(res.data.total_results);
        if (!(res.status >= 200 && res.status < 300)) {
          throw Error(res.statusText);
        }
        return res;
      });
    }
  }

  async fetchFilmInfo(filmId) {
    const urlQuery = `${BASE_URL}movie/${filmId}${API_KEY}&language=en-US`;

    return await axios.get(urlQuery).then(res => {
      if (!(res.status >= 200 && res.status < 300)) {
        throw Error(res.statusText);
      }
      return res;
    });
  }

  async Genres() {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=ad8c6c4dd7f8a685c9c739255442ccd5&language=en-US',
      )
      .then(res => {
        const GENRES = res.data;
        console.log(GENRES);
        return GENRES;
      });
  }
}
