import { useQuery } from "react-query";
import {getMovie} from '../api';
import {IGetMoviesResult} from '../interfaces/movieInterface';
import {Wrapper,Loader, Banner, Title} from '../style/HomeStyle';
import Slider from './Components/Slider';
import { makeImagePath } from "../utils";
import { AnimatePresence } from "framer-motion";
import {useMatch,useNavigate} from 'react-router-dom'
import { Overlay } from "../style/SliderStyle";


function Home(){
    const navigate = useNavigate();
    const {data,isLoading} = useQuery<IGetMoviesResult>(["movies", "now playing"],getMovie);
    const  clickedMovie = useMatch('movie/:movieId');
    const clickedMovieId = Number(clickedMovie?.params.movieId);
    const onOverlayClick = () => {
         navigate('/');
    }
    return (
        <Wrapper>{isLoading ? <Loader>..Loading</Loader> : <>
        <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
        </Banner>
       <Slider data={data!}/>
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