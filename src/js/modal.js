import FilmsApiService from './fetch';
import ourTeam from '../data/team.json';
import svg from '../images/sprite.svg';

const filmsApiService = new FilmsApiService();

const cardContainer = document.querySelector('.main-gallery-lisnichyi');
cardContainer.addEventListener('click', onCardClick);

function onCardClick(e) {
  if (!e) {
    showModal();
    return;
  }
  if (e.target !== e.currentTarget) {
    showModal(e.target.getAttribute('filmId'));
    // showModal(e.target.closest('.card__container').getAttribute('filmId'));
  }
}

function showModal(filmId) {
  document.querySelector('.modal').classList.add('active');
  document.querySelector('.backdrop').classList.add('active');
  document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
  document.querySelector('.backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', onKeyPress);
  if (!filmId) {
    showTeamInfo();
    return;
  }
  filmsApiService
    .fetchFilmInfo(filmId)
    .then(showFilmInfo)
    .catch(error => {
      console.log(error);
      return;
    });
}

function closeModal() {
  document.querySelector('.modal-thumb').innerHTML = '';
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

  document.querySelector('.modal-thumb').innerHTML = markup;
}

document.querySelector('.students-ref').addEventListener('click', () => onCardClick());
function showTeamInfo() {
  const m = ourTeam
    .map(({ name, position, photo, fb, tg, ld }) => {
      return `<li class='team-cards-item'>
      <img class='team-member-photo' src='${photo}' alt='${name}' />
      <h2 class="team-member-name">${name}</h2>
      <p class="team-member-position">${position}</p>
          <ul class="link-icon-list">
        <li>
          <a href='${fb}'>
            <svg class='link-icon'>
              <use href='${svg}#facebook'></use>
            </svg>
          </a></li>
        <li>
          <a href='${ld}'>
            <svg class='link-icon'>
              <use href='${svg}#linkedin'></use>
            </svg>
          </a></li>
        <li>
          <a href='${ld}'>
            <svg class='link-icon'>
              <use href='${svg}#telegram'></use>
            </svg>
          </a></li>
        <li><a href='${tg}'>
            <svg class='link-icon'>
              <use href='${svg}#github'></use>
            </svg>
          </a></li>
      </ul>
    </li>`;
    })
    .join('');

  document.querySelector('.modal-thumb').innerHTML = '<ul class="team-cards-list">' + m + '</ul>';
}
