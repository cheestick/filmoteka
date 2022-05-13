export function formatGenresData(genres) {
  const genreNames = genres.map(genre => genre.name);
  return genreNames.length <= 2
    ? genreNames.join(', ')
    : genreNames.slice(0, 2).join(', ').concat(', other');
}

export function formatReleaseYearData(releaseYear) {
  return releaseYear.slice(0, 4);
}

export function formatNumericalToFixed(number) {
  return number.toFixed(1);
}
