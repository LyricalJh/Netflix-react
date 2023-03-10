export const API_KEY = "7275d79e46913625a3dc6f8c406803c4";
export const BASE_URL = "https://api.themoviedb.org/3/";


export function getMovie(){
    return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
}

export function getMovieGenres(){
    return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`).then((response) => response.json());
}

export function getTopRatedMovies(){
    return fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}`).then((response) => response.json());
}

export function getUpComingSoon(){
    return fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}`).then((response) => response.json());
}

export function getPopularMovie(){
    return fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}`).then((response) => response.json());
}