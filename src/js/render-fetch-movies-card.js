import { findGenresOfMovie } from './find-genre';
import img from '../images/foto.jpg';
const libraryFetchEl = document.querySelector('.gallery_fetch-box');

export { renderFetchMoviesCard };

function renderFetchMoviesCard(movies) {
  console.log(`Fetch Movies | Rendering Movie Cards`);
  console.log(movies);

  const markup = movies
    .map(movie => {
      const { poster_path, title, genre_ids, release_date, id } = movie;
      const date = new Date(release_date).getFullYear();
      if (poster_path) {
        return `
            <div class="card" id="${id}">
                <img class="card_img" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" />
                <p class="card_title"> ${title} <br />
                    <span class="card_text">${findGenresOfMovie(
                      genre_ids
                    )} | ${date}</span>
                </p>
            </div>`;
      }
      return `
            <div class="card" id="${id}">
                <img class="card__img"  src="${img}" alt="${title}" />
                <p class="card__titel"> ${title} <br />
                    <span class="card__text">${findGenresOfMovie(
                      genre_ids
                    )} | ${date}</span>
                </p>
            </div>`;
    })
    .join('');

  libraryFetchEl.insertAdjacentHTML('beforeend', markup);
}