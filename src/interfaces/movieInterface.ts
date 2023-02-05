
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



