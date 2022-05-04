import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';

export default class FilmsApiService {
  async fetchArticles() {
    // console.log(data);
    const url = `${BASE_URL}trending/movie/week?api_key=ad8c6c4dd7f8a685c9c739255442ccd5`;
    return await axios.get(url).then(res => {
      // console.log(res);
      if (!(res.status >= 200 && res.status < 300)) {
        throw Error(res.statusText);
      }
      return res;
    });
  }
}
