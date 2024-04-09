// fetch-movies.js
import axios from 'axios';
import { optionsIMDB } from './api/imdb-api';
import { findGenresOfMovie } from './find-genre';

const libraryFetchEl = document.querySelector('.gallery');
const paginationItemsFetchContainer = document.querySelector('.pagination-fetch_container');

let BASE_URL = optionsIMDB.specs.baseURL;
let API_KEY = optionsIMDB.specs.key;
let page = 1;
let totalPages = 0;

async function fetchMovies() {
  try {
    const res = await axios.get(`${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}&page=${page}`);

    clearGalleryMarkup();
    renderFetchMoviesCard(res.data.results);

    page = optionsIMDB.specs.page;
    totalPages = res.data.total_pages;

    setupPagination();

    return res;
  } catch (error) {
    console.log('Error fetching movies:', error);
  }
}

function clearGalleryMarkup() {
  if (libraryFetchEl) {
    libraryFetchEl.innerHTML = '';
  }
}

function setupPagination() {
  paginationItemsFetchContainer.innerHTML = generatePaginationMarkup(page, totalPages);
  paginationItemsFetchContainer.addEventListener('click', onFetchPaginationClick);
}

function generatePaginationMarkup(currentPage, totalPages) {
  let markup = '';

  const generatePageButton = page => `<li class="pagination-btn ${page === currentPage ? 'current' : ''}">${page}</li>`;
  
  const addPageButton = page => {
    markup += generatePageButton(page);
  };

  const addEllipsis = () => {
    markup += '<li class="pagination-btn">...</li>';
  };

  const addPrevButton = () => {
    markup += currentPage > 1 ? '<li class="pagination-btn btn-left">&#129144;</li>' : '<li class="pagination-btn btn-left disabled" disabled>&#129144;</li>';
  };

  const addNextButton = () => {
    markup += totalPages > currentPage ? '<li class="pagination-btn btn-right">&#129146;</li>' : '<li class="pagination-btn btn-right disabled">&#129146;</li>';
  };

  const addFirstPageButton = () => {
    if (currentPage > 3) {
      addPageButton(1);
    }
  };

  const addLastPageButton = () => {
    if (totalPages - currentPage > 2) {
      addPageButton(totalPages);
    }
  };

  addPrevButton();
  addFirstPageButton();

  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    addPageButton(i);
  }

  addLastPageButton();
  addNextButton();

  paginationContainer.innerHTML = markup;
}

async function onFetchPaginationClick(event) {
  const target = event.target;

  // Check if the clicked element is a pagination button
  if (!target.classList.contains('pagination-btn')) {
    return;
  }

  // Determine the fetch status based on the clicked button
  let fetchStatus = 0; // Default status for page number change
  if (target.classList.contains('btn-left')) {
    fetchStatus = -1; // Previous page
  } else if (target.classList.contains('btn-right')) {
    fetchStatus = 1; // Next page
  }

  // Update the current page number based on the fetch status
  switch (fetchStatus) {
    case -1: // Previous page
      optionsIMDB.specs.page--;
      break;
    case 1: // Next page
      optionsIMDB.specs.page++;
      break;
    default: // Page number change
      optionsIMDB.specs.page = parseInt(target.textContent);
      break;
  }

  // Fetch movies for the updated page
  await fetchMovies();
}

function renderFetchMoviesCard(movies) {
  console.log('Rendering movies:', movies); // Debugging
  const markup = movies.map(movie => {
    const { poster_path, title, genre_ids, release_date, id } = movie;
    const date = new Date(release_date).getFullYear();
    const poster = poster_path ? `https://image.tmdb.org/t/p/w400${poster_path}` : img;
    const genresString = findGenresOfMovie(genre_ids).slice(0, 2).join(', ') + (genre_ids.length > 2 ? ', Other' : '');

    return `
      <div class="card" id="${id}">
        <img class="card_img" src="${poster}" alt="${title}" />
        <p class="card_title">${title} <br />
          <span class="card_text">${genresString} | ${date}</span>
        </p>
      </div>`;
  }).join('');
  console.log('Generated markup:', markup); // Debugging
  libraryFetchEl.insertAdjacentHTML('beforeend', markup);
}

export { fetchMovies, renderFetchMoviesCard };