
interface IGenres {
    id:number;
    name:string;
}

export interface IMovieGenres{
    genres:IGenres[];
}



export interface IMovie {
    id:number;
    backdrop_path:string;
    poster_path:string;
    title:string;
    overview:string;
    genre_ids: IGenres[];
    
}

export interface IGetMoviesResult {
    dates: {
        maximum:string;
        minimum:string;
    },
    page:number;
    results: IMovie[];
    total_pages:number;
    total_results:number
}

export interface IMovieProps {
    title:string;
    data: {
        dates: {
            maximum:string;
            minimum:string;
        },
        page:number;
        results: IMovie[];
        total_pages:number;
        total_results:number
    }
}

export interface IDetail {
    genres:IGenres[];
    id:number;
    release_date:string;
    runtime:number;
    title:string;
    vote_average:number;
    vote_count:number;
    backdrop_path:string;
    overview:string;
    
}



