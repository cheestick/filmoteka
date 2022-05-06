import Pagination from 'tui-pagination';
// import { refs , renderFilms } from './main-raduka';
import axios from 'axios';

const refs = {
  homeButton: document.querySelector('.submitHomeButton'),
  filmsGalleyDiv: document.querySelector('.main_filmsGallery-raduka'),
};
function renderFilms(films) {
  const markup = films.data.results
    .map(({ poster_path, original_title, release_date, genre_ids }) => {
      console.log(original_title, poster_path, release_date, genre_ids);
      return `
        <div class="film__container">
    <img class="gallery__image" src="https://image.tmdb.org/t/p/h100/${poster_path}" alt="${original_title}" />
    <span>${original_title}</span>
    <span>${release_date}</span>
    <span>${genre_ids}</span>
    </div>
        `;
    })
    .join('');

  refs.filmsGalleyDiv.insertAdjacentHTML('beforeend', markup);
}
// построение пагинации
const optionsPagination = {
  totalItems: 500,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
// buildPagination.reset(100);
const buildPagination = new Pagination('pagination-container', optionsPagination);

// const paginationPage = buildPagination.getCurrentPage();
function raitingFilms(nextCurrentPage) {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=ad8c6c4dd7f8a685c9c739255442ccd5&page=${nextCurrentPage}`,
  );
}

// получения тотал обьектов
export function totalPages(total) {
  buildPagination.reset(total.data.total_results);
}
// передача следующего номера страницы + рендер страницы
export function currentNextPagePagination() {
  buildPagination.on('afterMove', event => {
    const nextCurrentPage = event.page;
    document.querySelector('.main_filmsGallery-raduka').innerHTML = '';
    raitingFilms(nextCurrentPage)
      .then(renderFilms)
      .catch(error => {
        console.log(error);
        return;
      });
  });
}
currentNextPagePagination();
