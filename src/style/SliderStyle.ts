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
    /* position: relative ; */
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
        zIndex: 99,
        borderRadius: "5px",
        y:-80,
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
    position: relative;
    width: 100%;
    bottom: -180px;
    height: 20px;
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

export const Image = styled.div<{bgphoto:string}>`
`;

export const Modal = styled(motion.div)`
    z-index: 2;
    background-color: ${(props)=> props.theme.black.lighter};
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 40vw;
    height: 80vh;
    border-radius: 15px;
    overflow: hidden;
    
`;


export const ModalCover = styled.div`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center center;
`;

export const ModalTitle = styled.h3`
    color: ${(props)=> props.theme.white.lighter};
`;
export const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
`;