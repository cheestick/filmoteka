//  backdrop_path  original_title release_date   genres (array[objects])
import FilmsApiService from './fetch-raduka';
import GetGenres from './getGenres';

const refs = {
  buildFilmGallery: document.querySelector('.buildFilmGallery'),
  filmsGalleyDiv: document.querySelector('.main-gallery-lisnichyi'),
  // input:document.querySelector("#search-box")
};

const filmsApiService = new FilmsApiService();
const getGenres = new GetGenres();

getGenres.Genres().then(res => console.log('results', res));

refs.buildFilmGallery.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();
  filmsApiService
    .fetchArticles()
    .then(makeFilmCard)
    .catch(error => {
      console.log(error);
      return;
    });
}

function makeFilmCard(films) {
  const markup = films.data.results.map(
    ({ poster_path, original_title, release_date, genre_ids, id, vote_average }) => {
        if (genre_ids.length <=2) {
                 return `
        <li class="card__container">
    <img
      class="card__picture"
      filmId ="${id}"
      src="https://image.tmdb.org/t/p/w500/${poster_path}"
      alt="${original_title}"
    />
      <p class="card__title"><span class="card__title--name"> ${original_title}</span>
     <span class="card__title--genres">${genre_ids[0]},${genre_ids[1]}| ${release_date}  <span class="card__filmRaiting"> ${vote_average }</span></span>
      
     </p>
        </li>`
        }
        else {
                return `
        <li class="card__container">
    <img
      class="card__picture"
      filmId ="${id}"
      src="https://image.tmdb.org/t/p/w500/${poster_path}"
      alt="${original_title}"
    /> 
    <p class="card__title"><span class="card__title--name"> ${original_title}</span>
     <span class="card__title--genres">${genre_ids[0]},${genre_ids[1]}, Other | ${release_date}  <span class="card__filmRaiting"> ${vote_average }</span></span>
    
     </p>
        </li>`
        }
      }).join(" ");
    refs.filmsGalleyDiv.insertAdjacentHTML('beforeend', markup);
}