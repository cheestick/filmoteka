import FilmsApiService from './fetch';

const filmsApiService = new FilmsApiService();

document.querySelector('.main-section').addEventListener('click', onCardClick);
function onCardClick(e) {
  if (e.target !== e.currentTarget) {
    showModal(e.target.getAttribute('filmId'));
  }
}

function showModal(filmId) {
  document.querySelector('.modal').classList.add('active');
  document.querySelector('.backdrop').classList.add('active');
  document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
  document.querySelector('.backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', onKeyPress);
  filmsApiService
    .fetchFilmInfo(filmId)
    .then(showFilmInfo)
    .catch(error => {
      console.log(error);
      return;
    });
}
function closeModal() {
  document.querySelector('.film-info').innerHTML = '';
  document.querySelector('.modal').classList.remove('active');
  document.querySelector('.backdrop').classList.remove('active');
  document.querySelector('.modal-close-btn').removeEventListener('click', closeModal);
  document.querySelector('.backdrop').removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onKeyPress);
}
function onKeyPress(e) {
  if (e.key === 'Escape') {
    closeModal();
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
      loading="lazy"
    />
    </div>
    <div class="infoThumb">
      <h2 class="filmTitle">${title}</h2>

    

    <table class="infoStatistic">
    
      <tr>
        <td class="statTitle">Vote / Votes</td>
        <td class="statData"><span class="statData"> <span class="spanAccent" >${vote_average}</span> /<span class="span" >${vote_count}</span></td>
      </tr>
      <tr>
        <td class="statTitle">Popularity</td>
        <td class="statData">${popularity.toFixed(1)}</td>
      </tr>
      <tr>
        <td class="statTitle">Original Title</td>
        <td class="statData">${original_title.toUpperCase()}</td>
      </tr>
      <tr>
        <td class="statTitle">Genre</td>
        <td class="statData">${genres.map(genre => genre.name).join(', ')}</td>
      </tr>
    </table>

     
      <h3 class="aboutTitle">ABOUT</h3>
      <p class="aboutText">${overview}</p>
       <div class="buttonThumb">
         <button type="button" class="modalButton accentBtn">add to Watched</button>
          <button type="button" class="modalButton">add to queue</button>
        </div>
    </div>`;

  document.querySelector('.film-info').innerHTML = markup;
}
