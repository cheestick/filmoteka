import FilmsApiService from './fetch';

const filmsApiService = new FilmsApiService();

const cardContainer = document.querySelector('.main-section');
cardContainer.addEventListener('click', onCardClick);
function onCardClick(e) {
  if (e.target !== e.currentTarget) {
    showModal(e.target.getAttribute('filmId'));
  }
}

function showModal(filmId) {
  document.querySelector('.modal').classList.add('active');
  document.querySelector('.backdrop').classList.add('active');
  document.querySelector('.modal-close-btn').addEventListener('click', onCloseBtnClick);
  document.querySelector('.backdrop').addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onKeyPress);
  filmsApiService
    .fetchFilmInfo(filmId)
    .then(showFilmInfo)
    .catch(error => {
      console.log(error);
      return;
    });
}
function onCloseBtnClick() {
  document.querySelector('.film-info').innerHTML = '';
  document.querySelector('.modal').classList.remove('active');
  document.querySelector('.backdrop').classList.remove('active');
  document.querySelector('.modal-close-btn').removeEventListener('click', onCloseBtnClick);
  document.querySelector('.backdrop').removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onKeyPress);
}
function onKeyPress(e) {
  if (e.key === 'Escape') {
    onCloseBtnClick();
  }
}

function showFilmInfo(filmInfo) {
  const {
    original_title,
    vote_average,
    vote_count,
    popularity,
    title,
    genres,
    overview,
    poster_path,
  } = filmInfo.data;

  const markup = `<div class="pictureThumb">
    <img
      class="film-picture"
      src="https://image.tmdb.org/t/p/w500${poster_path}"
      alt="${original_title}"
    />
    </div>
    <div class="infoThumb">
      <h2 class="filmTitle">${title}</h2>

      <div class="infoStatistic">
        <div>
          <p class="statTitle">Vote / Votes</p>
          <p class="statTitle">Popularity</p>
          <p class="statTitle">Original Title</p>
          <p class="statTitle">Genre</p>
        </div>
        <div class="statDataThumb">
          <p class="statData"> <span class="spanAccent" >${vote_average}</span> /<span class="span" >${vote_count}</span></p>
          
          
          <p class="statData">${popularity.toFixed(1)}</p>
          <p class="statData">${original_title}</p>
          <p class="statData">${genres.map(genre => genre.name).join(', ')}</p>
         
        </div>
        
      </div>
      <h3 class="aboutTitle">ABOUT</h3>
      <p class="aboutText">${overview}</p>
       <div class="buttonThumb">
         <button type="button" class="modalButton accentBtn">add to Watched</button>
          <button type="button" class="modalButton">add to queue</button>
        </div>
    </div>`;

  document.querySelector('.film-info').innerHTML = markup;
}
