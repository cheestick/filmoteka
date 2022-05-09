import Pagination from 'tui-pagination';
import { refs, makeFilmCard } from './card';
import axios from 'axios';
let lastPage;
let totalPagesOn;
// построение пагинации

export function formPagination(last, totalPagesOn) {
  let buildPagination = new Pagination('pagination-container', {
    totalItems: totalPagesOn,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    lastItemClassName: 'last-child-tui',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<span class="tui-page-btn tui-is-selected">{{page}}</span>',
      moveButton: ({ type }) => {
        lastPage = last;

        let template = ' ';

        if (type === 'next') {
          template =
            '<a href="#" class="tui-page-btn tui-next">' +
            '<span class="tui-ico-next"></span>' +
            '</a>';
        }

        if (type === 'prev') {
          template =
            '<a href="#" class="tui-page-btn tui-prev">' +
            '<span class="tui-ico-prev"></span>' +
            '</a>';
        }

        if (type === 'last') {
          template = `<a data-type="last" class="inner-page-number">${lastPage}</a>`;
        }
        if (type === 'first') {
          if (true) {
          }
          template = `<a data-type="first" class="inner-page-number">1</a>`;
        }
        return template;
      },
    },
  });

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

function raitingFilms(nextCurrentPage) {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=ad8c6c4dd7f8a685c9c739255442ccd5&page=${nextCurrentPage}`,
  );
}

// получения тотал обьектов
export function buildPaginationSection(total) {
  totalPagesOn = total.data.total_results;
  lastPage = total.data.total_pages;
  formPagination(lastPage, totalPagesOn);
}
