import { optionsIMDB } from './api/imdb-api';
import { paginationFetch } from './pagination-fetch';
import { renderFetchMoviesCard } from './render-fetch-movies-card';
import axios from 'axios';

const libraryFetchEl = document.querySelector('.gallery_fetch-box');
const librarySearchEl = document.querySelector('.gallery_search-box');

const paginationItemsFetchContainer = document.querySelector(
  '.pagination-fetch_container'
);
const paginationItemsSearchContainer = document.querySelector(
  '.pagination-search_container'
);

let BASE_URL = optionsIMDB.specs.baseURL;
let API_KEY = optionsIMDB.specs.key;
let page = 1;

//export { fetchMovies };

async function fetchMovies() {
  paginationItemsFetchContainer.classList.remove('is-hidden');
  paginationItemsSearchContainer.classList.add('is-hidden');
  try {
    const res = await axios.get(
      `${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );

    libraryFetchEl.innerHTML = '';
    clearGalleryMarkup();

    console.log(`Fetch Movies`);
    console.log(res);
    renderFetchMoviesCard(res.data.results);

    page = optionsIMDB.specs.page;

    optionsIMDB.specs.totalPages = res.data.total_pages;
    totalPages = optionsIMDB.specs.totalPages;

    paginationItemsFetchContainer.addEventListener(
      'click',
      onFetchPaginationClick
    );
    paginationFetch(page, totalPages);

    return res;
  } catch (error) {
    console.log(error);
  }
}

async function onFetchPaginationClick({ target }) {
  console.log(`Fetch Movies | Pagination`);

  let fetchStatus = 0;

  if (
    target.classList.contains('btn-left') &&
    !target.classList.contains('disabled')
  ) {
    fetchStatus = 1;
  }

  if (
    target.classList.contains('btn-right') &&
    !target.classList.contains('disabled')
  ) {
    fetchStatus = 2;
  }

  console.log(
    `Fetch Movies | Pagination | Target ClassList${target.classList}`
  );

  console.log(`Fetch Movies | Pagination | Fetch Status:${fetchStatus}`);

  if (!fetchStatus) {
    if (target.nodeName === 'UL' || target.classList.contains('disabled')) {
      return;
    }

    if (isNaN(Number(target.textContent)) && fetchStatus != 0) {
    } else if (isNaN(Number(target.textContent))) {
      return;
    }

    if (Number(target.textContent) === optionsIMDB.specs.page) {
      return;
    }
  }

  console.log(`Fetch Movies | Pagination | Fetch Status:${fetchStatus}`);

  switch (fetchStatus) {
    case 0:
      optionsIMDB.specs.page = Number(target.textContent);
      break;
    case 1:
      optionsIMDB.specs.page--;
      break;
    case 2:
      optionsIMDB.specs.page++;
      break;
  }

  globalCurrentPage = optionsIMDB.specs.page;

  let BASE_URL = optionsIMDB.specs.baseURL;
  let API_KEY = optionsIMDB.specs.key;
  let query = optionsIMDB.specs.query;
  let page = optionsIMDB.specs.page;

  console.log(optionsIMDB.specs);

  try {
    const res = await axios.get(
      `${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );

    clearGalleryMarkup();

    console.log(`Fetch Movies | Pagination | Fetch res`);
    console.log(res.data.results);

    renderFetchMoviesCard(res.data.results);
    //optionsIMDB.specs.totalPages = res.data.total_pages;
    totalPages = optionsIMDB.specs.totalPages;

    console.log(optionsIMDB.specs);

    console.log(totalPages);
    paginationFetch(page, totalPages);

    return res;
  } catch (err) {
    console.log('ERROR: ', err.message);
    console.log('ERROR CODE: ', err.code);
  }

  paginationItemsFetchContainer.addEventListener(
    'click',
    onFetchPaginationClick
  );
  paginationFetch(optionsIMDB.specs.page, optionsIMDB.specs.totalPages);
}

function clearGalleryMarkup() {
  libraryFetchEl.innerHTML = '';
  //librarySearchEl.innerHTML = '';
}

fetchMovies();