export const API_KEY = "7275d79e46913625a3dc6f8c406803c4";
const BASE_URL = "https://api.themoviedb.org/3/";


export function getMovie(){
    return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
}