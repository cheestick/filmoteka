import FilmsApiService from './fetch-raduka';
import GetGenres from './getGenres';

export const refs = {
  homeButton: document.querySelector('.submitHomeButton'),
  logoButton: document.querySelector('.submitLogoButton'),
  filmsGalleyDiv: document.querySelector('.main_filmsGallery-raduka'),
};

const filmsApiService = new FilmsApiService();
const getGenres = new GetGenres();

getGenres.Genres().then(res => console.log('results', res));

refs.logoButton.addEventListener('click', onClick);
refs.homeButton.addEventListener('click', onClick);

window.onload = () => {
  filmsApiService
    .fetchArticles()
    .then(renderFilms)
    .catch(error => {
      console.log(error);
      return;
    });
};

function onClick(event) {
  event.preventDefault();
  window.location.href = '/';

  // filmsApiService
  //   .fetchArticles()
  //   .then(renderFilms)
  //   .catch(error => {
  //     console.log(error);
  //     return;
  //   });
}

export function renderFilms(films) {
  const markup = films.data.results
    .map(({ poster_path, original_title, release_date, genre_ids }) => {
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
