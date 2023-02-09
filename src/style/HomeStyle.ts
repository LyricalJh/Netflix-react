import styled from "styled-components"
import {motion} from 'framer-motion';

export const Wrapper = styled.div`
    background-color: black;
    display: flex;
    flex-direction: column;
`;

export const Loader = styled.div`
    height: 200vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)) ,url(${(props)=>props.bgPhoto});
    background-size: cover;
`;

export const Title = styled.h2`
    font-size: 60px;
    font-weight: bold;
`;



