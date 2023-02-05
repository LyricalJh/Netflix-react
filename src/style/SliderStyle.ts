import styled from "styled-components";
import {motion} from 'framer-motion';

export const Wrapper = styled.div`
    position: relative;
    top: -100px;
`;

export const Row = styled(motion.div)`
    padding: 0 10px;
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6,1fr);
    position: absolute;
    width: 100%;
`;

export const Box = styled(motion.div)<{bgphoto:string}>`
background-image: url(${(props) => props.bgphoto });
background-size: cover;
background-position: center center;
color: red;
font-size: 65px;
background-color: white;
height: 200px;
position: relative;
cursor: pointer;
&:nth-child(2) {
    transform-origin:center left ;
}
&:nth-child(7){
    transform-origin:center right ;
}
`;


export const GetPre = styled(motion.div)`
    z-index: 1;
    opacity : 0.6;
    background-color: black;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    opacity: 0;
`;

export const GetNext = styled(motion.div)`
    opacity : 0.6;
    background-color: black;
    right: 0px;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    opacity: 0;
`;

export const NextBtnVariants = {
    hover: {
        opacity:1
    },

}

export const MovieType = styled.h2`
    padding: 0px 20px;
    font-size:48px;
    font-weight: bold;
    position: absolute;
    top: -100px;
`;

export const rowVariants = {
    hidden: {
        x:window.outerWidth,
    },
    visible: {
        x:0
    },
    exit: {
        x: -window.outerWidth,
    },

}

export const BoxVariants = {
    normal:{
        scale:1
    },
    hover:{
        borderRadius: "5px",
        zIndex:1,
        y:-50,
        scale:1.3,
        transition:{
            delay:0.5,
            duaration:0.5,
            type:"tween"
        }
    }
}

export const Info = styled(motion.div)`
    padding: 20px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    bottom: 0px;
    width: 100%;
    h4 {
        text-align: center;
        font-size: 18px;
        color: ${(props) => props.theme.white.darker};
    }

`;

export const infoVariants = {
    hover: {
        opacity:1,
        transition:{
            delay:0.5,
            duaration:0.5,
            type:"tween"
        }
    }
  
}

export const Genre = styled.span`
    color: ${(props) => props.theme.white.lighter};
    
    font-size: 10px;
`;