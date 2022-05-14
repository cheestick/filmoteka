//  backdrop_path  original_title release_date   genres (array[objects])
import Pagination from './Pagination/dist_p/tui-pagination';
import FilmsApiService from './fetch';
import {
  formatGenresData,
  formatReleaseYearData,
  formatNumericalToFixed,
} from './Header/InfoFormatter';

import { buildPagination, buildPaginationSection, firstPage } from './pagination';
const refs = {
  buildFilmGallery: document.querySelector('.buildFilmGallery'),
  filmsGalleyDiv: document.querySelector('.main-gallery-lisnichyi'),
  GenresArray: [],
};

const ROUT = { POSTER: 'https://image.tmdb.org/t/p/' };

localStorage.setItem('GenresArray', JSON.stringify(refs.GenresArray));

const filmsApiService = new FilmsApiService();
const getGenres = filmsApiService.Genres().then(res => console.log('results', res));

// getGenres.then(res => console.log('results', res));

refs.buildFilmGallery.addEventListener('click', onClick);

window.onload = () => {
  if ((refs.GenresArray = [])) {
    filmsApiService.Genres();
  }

  filmsApiService
    .fetchArticles()
    .then(res => {
      makeFilmCard(res);
      buildPaginationSection(res);
    })
    .catch(error => {
      console.log(error);
      return;
    });
};

function onClick(event) {
  event.preventDefault();
  // window.location.href = '/';
  document.querySelector('.main-gallery-lisnichyi').innerHTML = null;
  filmsApiService
    .fetchArticles()
    .then(res => {
      makeFilmCard(res);
      buildPaginationSection(res);
    })
    .catch(error => {
      console.log(error);
      return;
    });
}

export function makeFilmCard(films) {
  const markup = films.data.results
    .map(({ poster_path, original_title, title, release_date, genre_ids, id, vote_average }) => {
      return `
        <li class="card__container js-card"  data-movie-id ="${id}">
          <img
            class="card__picture"
            src="${ROUT.POSTER}w500${poster_path}"
            srcset="${ROUT.POSTER}w342${poster_path} 1x, ${ROUT.POSTER}w500${poster_path} 2x"
            alt="${title} poster"
          /> 
          <p class="card__title"><span class="card__title--name"> ${title}</span>
            <span class="card__title--genres">${formatGenresData(
              genre_ids,
            )}&nbsp|&nbsp ${formatReleaseYearData(release_date)}
              <span class="card__filmRaiting"> ${formatNumericalToFixed(vote_average)}</span>
            </span>
          </p>
        </li>`;
    })
    .join('');
  refs.filmsGalleyDiv.insertAdjacentHTML('beforeend', markup);
}
