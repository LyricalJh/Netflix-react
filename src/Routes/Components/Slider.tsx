import {Wrapper,Row,GetPre,GetNext,rowVariants,Box,MovieType,BoxVariants,Info,infoVariants,NextBtnVariants,Genre,Modal, ModalCover, ModalTitle,ModalWrapper,ModalBtns,PlayBtn,GoodThumsUp,ModalOverview,ModalGenre,ModalDate,ModalFirstLine,InfoTitle,InfoBtns,InfoBtnWrapper,InfoSpan} from '../../style/SliderStyle';
import {AnimatePresence} from 'framer-motion';
import { useEffect, useState } from 'react';
import {IMovieProps,IMovieGenres,IDetail} from '../../interfaces/movieInterface'
import { makeImagePath } from '../../utils';
import { useNavigate ,useMatch} from 'react-router-dom';
import { useQuery } from 'react-query';
import {getMovieGenres,API_KEY,BASE_URL} from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPlus, faThumbsUp } from '@fortawesome/free-solid-svg-icons';


const offset = 6;

function Slider({data, title}:IMovieProps){
    const navigate = useNavigate();
    const clickedMacth = useMatch(`movie/:movieId`);
    const clickedMovieId = Number(clickedMacth?.params.movieId);
    const {data:movieGenres, isLoading} = useQuery<IMovieGenres>(['movieDetail'],getMovieGenres)
    const [detail,setDetail] = useState<IDetail>();
    const [like,setLike] = useState(0)
    
    useEffect(()=> {
        if(clickedMovieId){
          fetch(`${BASE_URL}/movie/${clickedMovieId}?api_key=${API_KEY}`)
          .then((response)=>response.json())
          .then((json)=>(setDetail(json), setLike(json.vote_count)));
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
            <MovieType>{title}</MovieType>
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
                      <InfoTitle>{ movie.title.length > 15 ? movie.title.slice(0,10)+ "..." : movie.title}</InfoTitle>
                      <InfoBtnWrapper>
                          <InfoBtns style={{backgroundColor: "white", color:"black"}}><FontAwesomeIcon icon={faPlay}/></InfoBtns>
                          <InfoBtns><FontAwesomeIcon icon={faPlus}/></InfoBtns>
                          <InfoBtns><FontAwesomeIcon icon={faThumbsUp}/></InfoBtns>
                    </InfoBtnWrapper>   
                      <div>{movieGenres?.genres.map((genre) => +genre.id  === +movie.genre_ids[0] ? <InfoSpan style={{fontSize: "20px"}} key={genre.id}>Genre : {genre.name}</InfoSpan> : null)}</div>
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
                    <ModalWrapper>
                      <ModalCover
                      style={{backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImagePath(detail.backdrop_path, "w1280")})`}}
                      />
                      <ModalTitle>{detail.title}</ModalTitle>
                      <ModalBtns>
                        <PlayBtn><FontAwesomeIcon icon={faPlay}/>재생하기</PlayBtn>
                        <GoodThumsUp ><FontAwesomeIcon icon={faThumbsUp}/></GoodThumsUp>
                      </ModalBtns>
                      <ModalFirstLine>
                      
                      <span style={{fontSize:18, color: "green", fontWeight: "bold", marginRight: 10}}>New</span>
                      <ModalDate>{detail.release_date.slice(0,4)}</ModalDate>
                      <ModalGenre>
                      {detail.genres.map((genre) => <span style={{marginRight: 10, fontWeight: "bold"}} key={genre.id}>{genre.name}</span>)}
                      </ModalGenre>
                      <GoodThumsUp style={{width:"25px", height: "25px", marginRight: 10}}><FontAwesomeIcon icon={faThumbsUp}/></GoodThumsUp>
                      <div style={{fontWeight:"bold"}}>{like > 0 ? like :"No body give like"} people loves it!</div>
                      </ModalFirstLine>
                      <ModalOverview>{detail.overview}</ModalOverview>
                    
                      </ModalWrapper>
                    </>}
              </Modal></> ): null}
        </AnimatePresence>
        </Wrapper>
    )
}

export default Slider;