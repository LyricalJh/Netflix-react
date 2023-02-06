import {Wrapper,Row,GetPre,GetNext,rowVariants,Box,MovieType,BoxVariants,Info,infoVariants,NextBtnVariants,Genre,Modal, ModalCover, ModalTitle} from '../../style/SliderStyle';
import {AnimatePresence} from 'framer-motion';
import { useEffect, useState } from 'react';
import {IMovieProps,IMovieGenres,IDetail} from '../../interfaces/movieInterface'
import { makeImagePath } from '../../utils';
import { useNavigate ,useMatch} from 'react-router-dom';
import { useQuery } from 'react-query';
import {getMovieGenres,API_KEY,BASE_URL} from '../../api';


const offset = 6;

function Slider({data}:IMovieProps){
    const navigate = useNavigate();
    const clickedMacth = useMatch(`movie/:movieId`);
    const clickedMovieId = Number(clickedMacth?.params.movieId);
    const {data:movieGenres, isLoading} = useQuery<IMovieGenres>(['movieDetail'],getMovieGenres)
    const [detail,setDetail] = useState<IDetail>();
    useEffect(()=> {
        if(clickedMovieId){
          fetch(`${BASE_URL}/movie/${clickedMovieId}?api_key=${API_KEY}`)
          .then((response)=>response.json())
          .then((json)=>setDetail(json));
        }
    },[clickedMovieId]);
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
                layoutId={movie.id+""}
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
                      <span>{detail?.runtime}</span>
                    </>
                    </Info>
                  </Box>)}
                <GetNext 
                variants={NextBtnVariants} 
                whileHover="hover"
                onClick={increaseIndex}>click</GetNext>
                
            </Row>
            </AnimatePresence>

            <AnimatePresence>

            {clickedMovieId ? (<> 
                <Modal
                  style={{borderRadius: "15px"}}              
                  layoutId={clickedMovieId+""}
                  >
                    {detail && <>
                      <ModalCover
                      style={{backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImagePath(detail.backdrop_path, "w1280")})`}}
                      />
                      <ModalTitle>{detail.title}</ModalTitle>
                    </>}
              </Modal></> ): null}
        </AnimatePresence>
        </Wrapper>
    )
}

export default Slider;