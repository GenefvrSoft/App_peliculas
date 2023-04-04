const numero_random = Math.floor((Math.random() * (10 - 1 + 1)) + 1);
export const KEY_API = '?api_key=98afb7ea157a87d81ec88a6ff53a386a';
export const URL_TRAILER_YOUTUBE = 'https://www.youtube.com/embed/';
export const URL_IMAGEN = 'https://image.tmdb.org/t/p/w1280/';
export const URL_PELICULAS_POPULARES = `https://api.themoviedb.org/3/movie/popular${KEY_API}&page=${numero_random}`;

export const URL_REPARTO_PELICULA = ( idMovie ) => `https://api.themoviedb.org/3/movie/${idMovie}/credits${KEY_API}`
export const URL_QUERY_PELICULA = ( nombreMovie ) => `https://api.themoviedb.org/3/search/movie${KEY_API}&language=en-US&page=1&query=${nombreMovie}`;
export const URL_KEY_VIDEO = ( idMovie ) => `https://api.themoviedb.org/3/movie/${idMovie}${KEY_API}&append_to_response=videos
`;