const ROUT = { POSTER: 'https://image.tmdb.org/t/p/' };

function movieCardMarkup(movieInfo) {
  const { id, genres, poster_path, original_title, release_date, vote_average } = movieInfo;
  const formattedGenres = formatGenresData(genres);
  const formattedReleaseYear = formatReleaseYearData(release_date);
  const formattedVoteAverage = formatNumericalToFixed(vote_average);
  return `
            <li class="movie__card" filmId="${id}">
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

export function showMoievsCollectionOnPage(movieCollection, collectionContainer) {
  clearMovieCollectionContainer(collectionContainer);
  collectionContainer.insertAdjacentHTML(
    'afterbegin',
    createMovieCardCollectionMarkup(movieCollection),
  );
}

function formatGenresData(genres) {
  const genreNames = genres
    .map(genre => genre.name)
    .slice(0, 2)
    .join(', ');
  return genreNames;
  //   return genreNames.length <= 2
  //     ? genreNames.join(', ')
  //     : genreNames.splice(2).push('Other').join(', ');
}

function formatReleaseYearData(releaseYear) {
  return releaseYear.slice(0, 4);
}

function formatNumericalToFixed(number) {
  return number.toFixed(1);
}

//
// `
//  <li class="card__container" filmId="${id}">
//      <a class="movie__link">
//         <img
//             class="card__picture"
//             loading="lazy"
//             src="${ROUT.POSTER}w500${poster_path}"
//             srcset="${ROUT.POSTER}w342${poster_path} 1x, ${ROUT.POSTER}w500${poster_path} 2x"
//         alt="${original_title}"
//         />
//         <div class="card__title">
//             <span class="card__title--name"> ${original_title}</span>
//             <div class="">
//                 <span class="card__title--genres">${formattedGenres}&nbsp|&nbsp${formattedReleaseYear}</span>
//                 <span class="card__filmRaiting">${formattedVoteAverage}</span>
//             </div>
//         </div>
//     </a>
// </li>
// `.trim();
