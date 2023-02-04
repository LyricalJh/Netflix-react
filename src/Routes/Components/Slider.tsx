import {Wrapper,Row,GetPre,GetNext,rowVariants,Box,MovieType} from '../../style/SliderStyle';
import {AnimatePresence} from 'framer-motion';
import { useState } from 'react';

import { makeImagePath } from '../../utils';

const offset = 6;

function Slider({data}:any){
    const [index,setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex =() => {
       if(data){
        if(leaving) return;
        toggleLeaving();
        const totalMovie = data?.results.length - 1;
        const maxIndex = Math.ceil( totalMovie / offset) -1;
        setIndex((prev) => prev === maxIndex ? 0: prev+1)
       }
    }
    const toggleLeaving = () => setLeaving(prev => !prev)
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
                <GetPre onClick={increaseIndex}>click</GetPre>
                {data.results.slice(1).slice(offset* index, offset * index + offset).map((movie:any) => <Box key={movie.id} bgphoto={makeImagePath(movie.backdrop_path,"w1280")} />)}
                <GetNext onClick={increaseIndex}>click</GetNext>
                
            </Row>
            </AnimatePresence>
        </Wrapper>
    )
}

export default Slider;