import { formatGenresData, formatReleaseYearData, formatNumericalToFixed } from './InfoFormatter';
import {buildPaginationLibrary, libraryFilms, buildPagination} from '../pagination'
const ROUT = { POSTER: 'https://image.tmdb.org/t/p/' };
let paginationApp= {};
function movieCardMarkup(movieInfo) {
  const { id, genres, poster_path, original_title, release_date, vote_average } = movieInfo;
  const formattedGenres = formatGenresData(genres);
  const formattedReleaseYear = formatReleaseYearData(release_date);
  const formattedVoteAverage = formatNumericalToFixed(vote_average);
  return `
            <li class="movie__card js-card" data-movie-id="${id}">
                <a class="movie__link">
                    <img
                    class="movie__poster"
                    loading="lazy"
                    alt="${original_title} poster"
                    src="${ROUT.POSTER}w500${poster_path}"
                    srcset="${ROUT.POSTER}w342${poster_path} 1x, ${ROUT.POSTER}w500${poster_path} 2x"
                    />
                    <div class="movie__description">
                    <h2 class="movie__title">${original_title}</h2>
                    <p class="movie__briefs">
                        <span class="movie__genre">${formattedGenres}</span>
                        <span class="movie__devider">&nbsp|&nbsp</span>
                        <span class="movie__year">${formattedReleaseYear}</span>
                        <span class="movie__rating">${formattedVoteAverage}</span>
                    </p>
                    </div>
                </a>
            </li>
    `;
}

function createMovieCardCollectionMarkup(movieCollection) {
  const movieCardCollectionMarkup = movieCollection.map(movie => movieCardMarkup(movie)).join('');
  return movieCardCollectionMarkup;
}

function clearMovieCollectionContainer(collectionContainer) {
  collectionContainer.innerHTML = null;
}

export function showMoievsCollectionOnPage(movieCollectionData, collectionContainer) {
  shownMovieCollectionData(movieCollectionData);
  clearMovieCollectionContainer(collectionContainer);
  collectionContainer.insertAdjacentHTML(
    'afterbegin',
    createMovieCardCollectionMarkup(movieCollectionData),
  );
   paginationApp = {
    data: {
      page: 1,
      perPage: 9,
      results: [],
      total_results: movieCollectionData.length,
      total_pages: Math.ceil(movieCollectionData.length / 9),
      pages: [],
    },
    methods: {
      getCardFilm () {
        this.results=q.data;
        console.log("q.data",movieCollectionData.data)
      },
      setPages () {
        let numberOfPages = Math.ceil(movieCollectionData.length / this.perPage);
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
  buildPaginationLibrary(movieCollectionData)
  libraryFilms(movieCollectionData)
  buildPagination.on('afterMove', event => {
    const nextCurrentPage = event.page;
    document.querySelector('.main-gallery-lisnichyi').innerHTML = '';
      //   onLoadSpinner();
      libraryFilms(movieCollectionData)
      //  setTimeout(offLoadSpinner, 2000);
  });
}

export const shownMovieCollectionData = movieCollectionData => movieCollectionData;
