import { motion ,AnimatePresence, useScroll, filterProps} from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import {getMovies,IGetMoviesResult,IGetMoviesDetail} from '../api';
import { makeImagePath } from "../utils";
import {useEffect, useState} from 'react'
import { useNavigate,useMatch, useParams} from "react-router-dom";
import Detail from "./Components/Detail";

const Wrapper = styled.div`
    background-color: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)) ,url(${(props) => props.bgPhoto});
    background-size: cover;
    
`;

const Title = styled.h2`
    font-size: 58px;
    font-weight: bold;
    margin-bottom: 300px; 
    

`;

const SliderTitle = styled.div`
    font-size: 48px;
    font-weight: bold;
    padding: 25px;
    top: -200px;
    position: relative;
`;

const Slider =styled.div`
    position: relative;
    top: -200px;
`;
 
const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap: 5px;
    position: absolute;
    width: 100%;
    font-size: 66px;
    padding: 20px;

`;

const Box = styled(motion.div)<{bgPhoto:string}>`
    background-color: white;
    height: 200px;
    font-size: 66px;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center;
    &:first-child {
        transform-origin:center left ;
    }
    &:last-child {
        transform-origin:center right ;
    }

`;





const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;

`;

const BigMovie = styled(motion.div)`
    position: absolute;
    width: 80vw;
    height: 80vh;
    right: 0;
    left: 0;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
    
`;

const BigTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    padding: 10px;
    font-size: 48px;
    position: relative;
    top: -80px;
`;

const BigOverview = styled.p`
    padding: 20px;
    color: ${(props) => props.theme.white.lighter};
`;

const BigGenre = styled.div`
    font-size: 40px;
`;

const rowBariants = {
    hidden: {
        x: window.outerWidth + 10,
    },
    visible: {
        x:0,
    },
    exit: {
        x: - window.outerWidth - 10,
    }   
}

const BoxVarinant = {
    normal: {
        scale:1
    },
    hover:{
        scale: 1.2,
        y:-50,
        borderRadius: "5px",
        transition: {
            delay:0.5,
            duration: 0.3,
            type:"tween",
        }
    }
}




const offset = 6;


function Home(){
    const navigate = useNavigate();
    const pam = useParams();
    const wow =Number(pam.movieId);
    const bigMovieMatch = useMatch("/movies/:movieId");
    const {scrollY} = useScroll();
    const {data : moiveData, isLoading: movieLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    console.log(moiveData);
    // const {data,isLoading} = useQuery<IGetMoviesDetail>(["moivesDetail"], ()=> {
    //   return getMoviesDetail(wow)  
    // });
    const [index, setIndex] = useState(0);
    const increaseIndex = () => {
        if(moiveData){
            if(leaving) return;
            toggleLeaving();
            const totalMovies = moiveData.results.length;
            const maxIndex = Math.floor(totalMovies / offset) -1;
            setIndex((prev) => prev === maxIndex ? 0 : prev+1);
        }
    }
    const [random, setRandom] = useState(0);
    useEffect(()=> {
        if(moiveData){
            const randomNumber = Math.floor(Math.random() * moiveData.results.length);
            setRandom(randomNumber)
        }
    },[moiveData,random])
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    }
    const onBoxClicked = (movieId:number) => {
         navigate(`movies/${movieId}`);
         
    }
    const onOverlayClick = () => {
        navigate("/");
    }

    const clickedMovie = bigMovieMatch?.params.movieId && moiveData?.results.find(movie => movie.id === Number(bigMovieMatch.params.movieId))
    console.log(clickedMovie);
    return (
        <Wrapper 
        style={{backgroundColor: "black", height: "200vh"}}>
            {movieLoading ?
             <Loader>...Loading</Loader> 
             : 
             <><Banner onClick={increaseIndex} bgPhoto={makeImagePath(moiveData?.results[random].backdrop_path || "")}>
                <Title>{moiveData?.results[random].title}</Title>
            </Banner></>}
            <SliderTitle>Now Playing</SliderTitle>
            <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row 
              variants={rowBariants} 
              initial="hidden" 
              animate="visible" exit="exit" 
              transition={{type:"tween", duration:1}}
              key={index}>
               {moiveData?.results.slice(1).slice(offset*index, offset*index+offset).map((movie) =>
                <Box
                layoutId={movie.id+""}
                onClick={()=> onBoxClicked(movie.id)}
                variants={BoxVarinant}
                whileHover="hover"
                initial="normal"
                transition={{type:"tween"}}
                key={movie.id}
                bgPhoto={makeImagePath(movie.backdrop_path, "w500")}>
                <Detail id={movie.id}/>         
                     </Box>)}
              </Row>
              </AnimatePresence>
            </Slider>
            <AnimatePresence>
                {bigMovieMatch ? (
                <>
                <Overlay onClick={onOverlayClick} animate={{opacity: 1}} exit={{opacity:0}}></Overlay>
                <BigMovie 
                layoutId={bigMovieMatch.params.movieId}
                 style={{top: scrollY.get() + 100}}>
                    {clickedMovie && <>
                        <BigCover style={{backgroundImage: `url(${makeImagePath(clickedMovie.backdrop_path, "w1280")})`}} />
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                        {/* <BigGenre>{data?.genres.map((item) => <span key={item.id}>{item.name}</span>)}</BigGenre> */}
                    </>}
                    </BigMovie></>
                     ): null}
            </AnimatePresence>
            </Wrapper>
    );
}

export default Home;