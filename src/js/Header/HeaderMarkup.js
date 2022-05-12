export function libraryTabs() {
  return `
     <ul class="library-tabs">
        <li class="library-tab"><a class="tab-watched" href="#" role="button">watched</a></li>
        <li class="library-tab">
          <a class="tab-queue tab-active" href="#" role="button">queue</a>
        </li>
      </ul>
    `;
}

export function searchForm() {
  return `
    <form class="search-form" id="search-form">
      <input class="search-input" type="text" name="searchFilm" placeholder="Пошук фільмів" />
      <button class="btn-search" type="submit" width="12" height="12">
        <svg class="btn-search-icon" width="12" height="12">
          <use href="#"></use>
        </svg>
      </button>
    </form>
    `;
}
