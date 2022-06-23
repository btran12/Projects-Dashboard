/* eslint-disable import/prefer-default-export */
export const API_KEY = '4c40b76e885cbdd0161087ef43a8fce5';
export const TMDB = (movieId, endPoint) => {
  return `https://api.themoviedb.org/3/movie/${movieId}${endPoint}?api_key=${API_KEY}&language=en-US`;
};
