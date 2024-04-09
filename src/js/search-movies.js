// ---------- IMPORTS

import { optionsIMDB } from './api/imdb-api';
import { paginationSearch } from './pagination-search';
import { renderSearchMoviesCard } from './render-search-movies-card';

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-aio.js';

// ---------- DECLARATIONS

const libraryFetchEl = document.querySelector('.gallery_fetch-box');
const librarySearchEl = document.querySelector('.gallery_search-box');
const searchInputEl = document.querySelector('input[name="searchQuery"]');
const searchFormEl = document.getElementById('search-form');

const paginationItemsSearchContainer = document.querySelector(
  '.pagination-search_container'
);

const paginationItemsFetchContainer = document.querySelector(
  '.pagination-fetch_container'
);

const optionError = {
  width: '390px',
  position: 'center-top',
  distance: '145px',
  fontSize: '14px',
  opacity: 1,
  useIcon: false,
  failure: {
    textColor: '#FF001B',
    background: 'rgba(0,0,0,0)',
  },
};

let query = '';
//let page = 1;

// ---------- FUNCTION
async function onSearchMovies(e) {
  paginationItemsFetchContainer.classList.add('is-hidden');
  paginationItemsSearchContainer.classList.remove('is-hidden');

  e.preventDefault();

  optionsIMDB.specs.query = searchInputEl.value.trim();

  console.log(optionsIMDB.specs.query);

  if (optionsIMDB.specs.query === '') {
    return;
  } else if (optionsIMDB.specs.query !== undefined) {
    initializeParam();
  }

  let BASE_URL = optionsIMDB.specs.baseURL;
  let API_KEY = optionsIMDB.specs.key;
  let query = optionsIMDB.specs.query;
  let page = optionsIMDB.specs.page;

  try {
    const res = await axios.get(
      `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`
    );

    if (res.data.results.length === 0) {
      Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
      searchInputEl.value = '';
      initializeParam();
    } else {
      libraryFetchEl.innerHTML = '';
      paginationItemsFetchContainer.innerHTML = '';
      clearGalleryMarkup();

      console.log(`Search Movies`);
      console.log(res.data.results);

      renderSearchMoviesCard(res.data.results);

      optionsIMDB.specs.totalPages = res.data.total_pages;
      totalPages = optionsIMDB.specs.totalPages;

      paginationItemsSearchContainer.addEventListener(
        'click',
        onSearchPaginationClick
      );
      paginationSearch(optionsIMDB.specs.page, optionsIMDB.specs.totalPages);
    }
    return res;
  } catch (error) {
    Notify.failure(error);
  }
}

function initializeParam() {
  optionsIMDB.specs.page = 1;
}

function onResultSearchError() {
  Notiflix.Notify.failure(
    'Search result not successful. Enter the correct movie name.',
    optionError
  );
  initializeParam();
}

async function onSearchPaginationClick({ target }) {
  console.log(`Search Movies | Pagination`);

  let searchStatus = 0;

  if (
    target.classList.contains('btn-left') &&
    !target.classList.contains('disabled')
  ) {
    searchStatus = 1;
  }

  if (
    target.classList.contains('btn-right') &&
    !target.classList.contains('disabled')
  ) {
    searchStatus = 2;
  }

  console.log(
    `Search Movies | Pagination | Target ClassList${target.classList}`
  );

  console.log(`Search Movies | Pagination | Search Status:${searchStatus}`);

  if (!searchStatus) {
    if (target.nodeName === 'UL' || target.classList.contains('disabled')) {
      return;
    }

    if (isNaN(Number(target.textContent)) && searchStatus != 0) {
    } else if (isNaN(Number(target.textContent))) {
      return;
    }

    if (Number(target.textContent) === optionsIMDB.specs.page) {
      return;
    }
  }

  console.log(`Search Movies | Pagination | Search Status:${searchStatus}`);

  switch (searchStatus) {
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

  try {
    const res = await axios.get(
      `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`
    );

    //clearGalleryMarkup();

    renderSearchMoviesCard(res.data.results);
    optionsIMDB.specs.totalPages = res.data.total_pages;
    totalPages = optionsIMDB.specs.totalPages;

    console.log(totalPages);
    paginationSearch(response.data.page, response.data.total_pages);

    return res;
  } catch (err) {
    console.log('ERROR: ', err.message);
    console.log('ERROR CODE: ', err.code);
  }

  paginationItemsSearchContainer.addEventListener(
    'click',
    onSearchPaginationClick
  );
  paginationSearch(optionsIMDB.specs.page, optionsIMDB.specs.totalPages);
}

function clearGalleryMarkup() {
  //libraryFetchEl.innerHTML = '';
  librarySearchEl.innerHTML = '';
}

// ---------- EVENT LISTENERS
searchFormEl.addEventListener('submit', onSearchMovies);