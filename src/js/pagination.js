import Pagination from 'tui-pagination';

const optionsPagination = {
    totalItems: 500,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
export const buildPagination = new Pagination('pagination-container', optionsPagination);
instance.getCurrentPage();

// pagination.on('beforeMove', function(eventData) {
//     return confirm('Go to page ' + eventData.page + '?');
// });

// pagination.on('afterMove', function(eventData) {
//     alert('The current page is ' + eventData.page);
// });
