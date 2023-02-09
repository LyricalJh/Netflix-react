import { useQuery } from "react-query";
import {getMovie,getTopRatedMovies,getUpComingSoon,getPopularMovie} from '../api';
import {IGetMoviesResult} from '../interfaces/movieInterface';
import {Wrapper,Loader, Banner, Title} from '../style/HomeStyle';
import Slider from './Components/Slider';
import { makeImagePath } from "../utils";
import { AnimatePresence } from "framer-motion";
import {useMatch,useNavigate} from 'react-router-dom'
import { Overlay } from "../style/SliderStyle";


function Home(){
    const navigate = useNavigate();
    const {data: nowMovie,isLoading} = useQuery<IGetMoviesResult>(["movies", "now playing"],getMovie);
    const {data: TopMovie,isLoading: TopLoading} = useQuery<IGetMoviesResult>(["movies", "Top Rated"], getTopRatedMovies);
    const {data: UpComingMoive,isLoading: UpComingMoiveLoading} = useQuery<IGetMoviesResult>(["movies", "Top Rated"], getUpComingSoon);
    const {data: PopularMovie,isLoading: PopularMovieLoading} = useQuery<IGetMoviesResult>(["movies", "Top Rated"], getPopularMovie);
    
    const  clickedMovie = useMatch('movie/:movieId');
    const clickedMovieId = Number(clickedMovie?.params.movieId);
    const onOverlayClick = () => {
         navigate('/');
    }
    return (
        <Wrapper>{isLoading ? <Loader>..Loading</Loader> : <>
        <Banner bgPhoto={makeImagePath(nowMovie?.results[0].backdrop_path || "")}>
            <Title>{nowMovie?.results[0].title}</Title>
        </Banner>
       <Slider  title="Now Playing" data={nowMovie!}/>
       <Slider  title="Top Rating" data={TopMovie!}/>
       <Slider  title="Popular Moive" data={PopularMovie!}/>
       <Slider  title="Coming Soon" data={UpComingMoive!}/>

        </>}
        <AnimatePresence>
            {clickedMovieId &&
             <Overlay
             animate={{opacity:1}}
             exit={{opacity:0}}
            onClick={onOverlayClick}/>}
        </AnimatePresence>
        </Wrapper>
    )
}

export default Home;