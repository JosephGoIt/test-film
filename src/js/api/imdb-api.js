export const IMDB_API_KEY = `15150ce69b4b8fc4394b6dfaa88a912b`;
export const IMDB_URL = `https://api.themoviedb.org`;

export const optionsIMDB = {
  specs: {
    trendingMovie: '/3/trending/movie/day',
    searchMovie: '/3/search/movie',
    movieDetails: `/3/movie/`,
    key: IMDB_API_KEY,
    baseURL: IMDB_URL,
    page: 1,
    query: '',
    totalPages: 1,
  },
};