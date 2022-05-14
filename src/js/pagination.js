import Pagination from './Pagination/dist_p/tui-pagination';
import { API_KEY, QUERY_VALUE } from './fetch';
import { onLoadSpinner, offLoadSpinner } from './spinner';
import { refs, makeFilmCard } from './card';
import axios from 'axios';
import {shownMovieCollectionData} from '../js/Header/CollectionController'
let lastPage;
let totalPagesOn;
let itemsPages;



// построение пагинации
let buildPagination;
function newOptionsPagination(last, totalPagesOn, itemsPages) {
  buildPagination = new Pagination('pagination-container', {
    totalItems: totalPagesOn,
    itemsPerPage: itemsPages,
    visiblePages: 5,
    centerAlign: true,
    // lastItemClassName: 'last-child-tui',
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
          template = `<a data-type="first" class="inner-page-number">1</a>`;
        }
        return template;
      },
    },
  });
}

function afterMovePaginationTranding(buildPagination) {
  buildPagination.on('afterMove', event => {
    const nextCurrentPage = event.page;
    document.querySelector('.main-gallery-lisnichyi').innerHTML = '';
    onLoadSpinner();
    raitingFilms(nextCurrentPage)
      .then(res => {
        makeFilmCard(res);
      })
      .catch(error => {
        console.log(error);
        return;
      }).finally(setTimeout(offLoadSpinner, 2000));
  });
}
function afterMovePaginationSearch(buildPagination) {
  buildPagination.on('afterMove', event => {
    const nextCurrentPage = event.page;
    document.querySelector('.main-gallery-lisnichyi').innerHTML = '';
    searchFilms(nextCurrentPage)
      .then(makeFilmCard)
      .catch(error => {
        console.log(error);
        return;
      });
  });
}

function afterMovePaginationLibrary(buildPagination) {
  buildPagination.on('afterMove', event => {
    const nextCurrentPage = event.page;
    document.querySelector('.main-gallery-lisnichyi').innerHTML = '';
    libraryFilms()    
    console.log("dataFilms",dataFilms)
      //   onLoadSpinner();
      //   makeFilmCard(res);
        // console.log(movieCollectionData)
      //  setTimeout(offLoadSpinner, 2000);
  });
}

function raitingFilms(nextCurrentPage) {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/day${API_KEY}&page=${nextCurrentPage}`,
  );
}
function searchFilms(nextCurrentPage) {
  const searchFilmsName = 'batman';
  return axios.get(
    `https://api.themoviedb.org/3/search/movie${API_KEY}&query=${searchFilmsName}&page=${nextCurrentPage}`,
  );
}
export function libraryFilms(q) {
  const paginationApp = {
    data: {
      page: 1,
      perPage: 9,
      results: [],
      total_results: q.length,
      total_pages: Math.ceil(q.length / 9),
      pages: [],
    },
    methods: {
      getCardFilm () {
        this.results=q.data;
        console.log("q.data",q.data)
      },
      setPages () {
        let numberOfPages = Math.ceil(q.length / this.perPage);
        for (let index = 1; index <= total_pages; index++) {
          this.pages.push(index);
          console.log(numberOfPages)
        }
      },
      paginate (results) {
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return  results.slice(from, to);
      }
    },
    created () {
      this.getCardFilm();
    },
    watch: {
      results () {
        this.setPages();
      }
    },
    computed: {
      displayedCardFilm() {
        return this.paginate(this.results);
      }
    },
  };
  console.log("paginationApp",paginationApp)
}

// получения обьектов
export function buildPaginationSection(total) {
  console.log("total", total)
  totalPagesOn = total.data.total_results;
  lastPage = total.data.total_pages;
  itemsPages = 20;
  newOptionsPagination(lastPage, totalPagesOn, itemsPages);
  afterMovePaginationTranding(buildPagination);
}
export function buildPaginationSearch(total) {
  totalPagesOn = total.data.total_results;
  lastPage = total.data.total_pages;
  itemsPages = 20;
  newOptionsPagination(lastPage, totalPagesOn, itemsPages);
  afterMovePaginationSearch(buildPagination);
}
export function buildPaginationLibrary(total) {
  document.querySelector('#pagination-container').innerHTML = '';
  totalPagesOn = total.length;
  itemsPages = 9;
  lastPage = Math.ceil(totalPagesOn/itemsPages);
  newOptionsPagination(lastPage, totalPagesOn, itemsPages);
  afterMovePaginationLibrary(buildPagination);
}
