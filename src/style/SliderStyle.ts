import styled from "styled-components";
import {motion} from 'framer-motion';

export const Wrapper = styled.div`
    padding: 0 20px;
    position: relative;
    top: -100px;
`;

export const Row = styled(motion.div)`
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
`;


export const GetPre = styled.div`
    
    opacity : 0.6;
    background-color: black;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
`;

export const GetNext = styled.div`
    width: 2.5%;
    opacity : 0.6;
    background-color: black;
    right: 0px;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
`;

export const MovieType = styled.h2`
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