import FilmsApiService from './fetch-raduka';

const refs = {
  homeButton: document.querySelector('.submitHomeButton'),
  filmsGalleyDiv: document.querySelector('.main_filmsGallery-raduka'),
};

const filmsApiService = new FilmsApiService();

refs.homeButton.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();
  filmsApiService
    .fetchArticles()
    .then(renderFilms)
    .catch(error => {
      console.log(error);
      return;
    });
}

function renderFilms(films) {
//   console.log(films.data.results);
  const markup = films.data.results.map(
    ({ poster_path, original_title, release_date, genre_ids }) => {
      // console.log(original_title,poster_path,release_date,genre_ids);
      return `
    <div class="film__container">
<img class="gallery__image" src="https://image.tmdb.org/t/p/h100/${poster_path}" alt="${original_title}" />
<span>${original_title}</span>
<span>${release_date}</span>
<span>${genre_ids}</span>
</div>
    `;
    },
  ).join('');


  refs.filmsGalleyDiv.insertAdjacentHTML('beforeend', markup);

}
