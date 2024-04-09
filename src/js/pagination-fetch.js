const paginationContainer = document.querySelector(
  '.pagination-fetch_container'
);
//paginationContainer.addEventListener('click', onPagination);

window.globalCurrentPage = null;

export function paginationFetch(page, totalPages) {
  const beforeToPage = page - 2;
  const beforePage = page - 1;
  const afterToPage = page + 2;
  const afterPage = page + 1;

  globalCurrentPage = page;

  let markup = '';
  if (page > 1) {
    markup += '<li class="pagination-btn btn-left">&#129144;</li>';
  } else {
    markup +=
      '<li class="pagination-btn btn-left disabled" disabled>&#129144;</li>';
  }
  if (page > 1) {
    markup += '<li class="pagination-btn">1</li>';
  }
  if (page > 4) {
    ``;
    markup += '<li class="pagination-btn">...</li>';
  }
  if (page > 3) {
    markup += `<li class="pagination-btn">${beforeToPage}</li>`;
  }
  if (page > 2) {
    markup += `<li class="pagination-btn">${beforePage}</li>`;
  }
  markup += `<li class="pagination-btn">${page}</li>`;
  if (totalPages - 1 > page) {
    markup += `<li class="pagination-btn">${afterPage}</li>`;
  }
  if (totalPages - 2 > page) {
    markup += `<li class="pagination-btn">${afterToPage}</li>`;
  }
  if (totalPages - 3 > page) {
    markup += `<li class="pagination-btn">...</li>`;
  }
  if (totalPages > page) {
    markup += `<li class="pagination-btn">${totalPages}</li>`;
    markup += '<li class="pagination-btn btn-right">&#129146;</li>';
  } else {
    markup += '<li class="pagination-btn btn-right disabled">&#129146;</li>';
  }

  paginationContainer.innerHTML = markup;

  const containerItems = [...paginationContainer.children];

  containerItems.forEach(item => {
    if (Number(item.textContent) === globalCurrentPage) {
      item.classList.add('current');
    }
  });
}

function onPagination({ target }) {
  if (target.nodeName !== 'LI') {
    return;
  }

  if (target.textContent === '...') {
    return;
  }

  if (target.textContent === '🡸') {
    if (target.classList.contains('disabled')) {
      return;
    }
    globalCurrentPage -= 1;
    return;
  }

  if (target.textContent === '🡺') {
    if (target.classList.contains('disabled')) {
      return;
    }
    globalCurrentPage += 1;
    return;
  }
  globalCurrentPage = Number(target.textContent);
}