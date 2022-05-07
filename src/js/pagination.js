import Pagination from 'tui-pagination';
import { refs , makeFilmCard } from './card';
import axios from 'axios';

// построение пагинации
const optionsPagination = {
  totalItems: 0,
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
    document.querySelector('.main-gallery-lisnichyi').innerHTML = '';
    raitingFilms(nextCurrentPage)
      .then(makeFilmCard)
      .catch(error => {
        console.log(error);
        return;
      });
  });
}
currentNextPagePagination();
