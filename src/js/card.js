//  backdrop_path  original_title release_date   genres (array[objects])
import Pagination from 'tui-pagination';
import FilmsApiService from './fetch';
import { buildPagination, buildPaginationSection, firstPage } from './pagination';
const refs = {
  buildFilmGallery: document.querySelector('.buildFilmGallery'),
  filmsGalleyDiv: document.querySelector('.main-gallery-lisnichyi'),
  GenresArray: [],
};

localStorage.setItem('GenresArray', JSON.stringify(refs.GenresArray));

const filmsApiService = new FilmsApiService();

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
  document.querySelector('.main-gallery-lisnichyi').innerHTML = '';
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
    .map(({ poster_path, original_title, release_date, genre_ids }) => {
      if (genre_ids.length <= 2) {
        return `
        <li class="card__container">
    <img
      class="card__picture"
      src="https://image.tmdb.org/t/p/w500/${poster_path}"
      alt="${original_title}"
    />
      <p class="card__title"><span class="card__title--name"> ${original_title}</span>
     <span class="card__title--genres">${genre_ids[0]},${genre_ids[1]}| ${release_date}</span></p>
        </li>`;
      } else {
        return `
        <li class="card__container">
    <img
      class="card__picture"
      src="https://image.tmdb.org/t/p/w500/${poster_path}"
      alt="${original_title}"
    /> 
    <p class="card__title"><span class="card__title--name"> ${original_title}</span>
     <span class="card__title--genres">${genre_ids[0]},${genre_ids[1]}, Other | ${release_date}</span></p>
        
        </li>`;
      }
    })
    .join(' ');
  refs.filmsGalleyDiv.insertAdjacentHTML('beforeend', markup);
}
