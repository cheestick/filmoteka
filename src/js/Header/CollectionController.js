import { formatGenresData, formatReleaseYearData, formatNumericalToFixed } from './InfoFormatter';
import { buildPaginationLibrary, libraryFilms, buildPagination } from '../pagination';
import {onLoadSpinner, offLoadSpinner} from '../spinner'
import { makeFilmCard } from '../card';
const ROUT = { POSTER: 'https://image.tmdb.org/t/p/' };

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
  // collectionContainer.insertAdjacentHTML(
  //   'afterbegin',
  //   createMovieCardCollectionMarkup(movieCollectionData),
  // );
  myLibraryPagination(movieCollectionData);
}

function myLibraryPagination(movieCollectionData) {
  buildPaginationLibrary(movieCollectionData);
  let paginationApp = dataForPagination(movieCollectionData, 9);
  document
    .querySelector('.main-gallery-lisnichyi')
    .insertAdjacentHTML('afterbegin', createMovieCardCollectionMarkup(paginationApp[0].results));
  buildPagination.on('afterMove', event => {
    let nextCurrentPage = event.page;
    document.querySelector('.main-gallery-lisnichyi').innerHTML = '';
    onLoadSpinner();
    document
    .querySelector('.main-gallery-lisnichyi')
    .insertAdjacentHTML('afterbegin', createMovieCardCollectionMarkup(paginationApp[nextCurrentPage-1].results));
    setTimeout(offLoadSpinner, 2000);
  });
}

export const shownMovieCollectionData = movieCollectionData => movieCollectionData;

const copyObject = object => JSON.parse(JSON.stringify(object));

const dataForPagination = (data, numPagesFromBack) => {
  const pagData = [];
  for (let i = 0; i < data.length; i += numPagesFromBack) {
    pagData.push({
      page: 1 + i / numPagesFromBack,
      total_results: data.length,
      total_pages: Math.ceil(data.length / numPagesFromBack),
      results: data.slice(i, i + numPagesFromBack),
    });
  }
  return pagData;
};
