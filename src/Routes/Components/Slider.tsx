import {Wrapper,Row,GetPre,GetNext,rowVariants,Box,MovieType,BoxVariants,Info,infoVariants,NextBtnVariants,Genre} from '../../style/SliderStyle';
import {AnimatePresence} from 'framer-motion';
import { useState } from 'react';
import {IMovieProps,IMovieGenres} from '../../interfaces/movieInterface'
import { makeImagePath } from '../../utils';
import { useNavigate ,useMatch} from 'react-router-dom';
import { useQuery } from 'react-query';
import {getMovieGenres} from '../../api';



const offset = 6;

function Slider({data}:IMovieProps){
    const navigate = useNavigate();
    const clickedMacth = useMatch(`movie/:movieId`);
    const clickNumber = Number(clickedMacth?.params.movieId);
    const {data:movieGenres, isLoading} = useQuery<IMovieGenres>(['movieDetail'],getMovieGenres)
    
    const [index,setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex =() => {
       if(data){
        if(leaving) return;
        toggleLeaving();
        const totalMovie = data?.results.length - 1;
        const maxIndex = Math.floor( totalMovie / offset) -1; 
        setIndex((pageIndex) => pageIndex === maxIndex ? 0: pageIndex+1)
       }
    }
    const toggleLeaving = () => setLeaving(leaving => !leaving)
    const onBoxClicked = (movieId:number) => {
        navigate(`movie/${movieId}`);
    }
    return(
        <Wrapper>
            <MovieType>Now Playing</MovieType>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            
            <Row 
            key={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{type:"tween", duration:1}}
            >
                <GetPre
                variants={NextBtnVariants} 
                whileHover="hover"
                onClick={increaseIndex}>click</GetPre>
                {data?.results.slice(1).slice(offset* index, offset * index + offset).map((movie) => 
                <Box 
                onClick={()=>onBoxClicked(movie.id)}
                variants={BoxVariants}
                whileHover="hover"
                initial="normal"
                transition={{type:"tween"}} 
                key={movie.id} 
                bgphoto={makeImagePath(movie.backdrop_path,"w1280")}
                  >
                    <Info
                    variants={infoVariants}
                    >
                    <>
                      
                      <h4>{movie?.title}</h4>
                      {movieGenres?.genres.map((genre) => String(genre.id) === String(movie.genre_ids[0]) ?  <Genre key={genre.id}>Genre:{genre.name}</Genre> : null)}
                    </>
                      
                    </Info>
                  </Box>)}
                <GetNext 
                variants={NextBtnVariants} 
                whileHover="hover"
                onClick={increaseIndex}>click</GetNext>
                
            </Row>
            </AnimatePresence>
        </Wrapper>
    )
}

export default Slider;