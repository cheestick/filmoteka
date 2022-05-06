import axios from 'axios';

export default class GenresApi {
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
