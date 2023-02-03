import styled from "styled-components";
import {motion} from 'framer-motion'
import { useQuery } from "react-query";
import { IGenre} from '../../api';
import {useMatch} from 'react-router-dom';
import {getMoviesDetail} from '../../api'


const Info = styled(motion.div)`
padding: 10px;
background-color: ${(props) => props.theme.black.lighter};
opacity: 0;
position: absolute;
width: 100%;
bottom: 0px;
display: flex;
flex-direction: column;
`;

const InfoTitle = styled.div`
display: flex;
font-size: 18px;
font-weight: bold;
color: ${(props) => props.theme.white.darker};
`;


const InfoSub = styled.div`
display: flex;
font-size: 16px;
`;

const InfoGenre = styled.div`
display: flex;
font-size: 14px;
`;

const infoVariants = {
hover: {
    opacity:1,
    transition: {
        delay:0.5,
        duration: 0.3,
        type:"tween",
    }
}
}


interface IDetailId {
    id:number;
}

interface IMovieDetail {
    id:number;
    title:string;
    runtime:number;
    vote_count:number;
    vote_average:number;
    genres:IGenre[];
}

function Detail({id}:IDetailId){
    const {data,isLoading} = useQuery<IMovieDetail>(["movieDetail"], ()=> getMoviesDetail(id))
    // 위 getMoviesDetail 의 id가 모달이 켜지지 않으면 Undefied 됨
    
    return (
        <>
         <Info
          variants={infoVariants}
         >
        <InfoTitle></InfoTitle>
        <InfoSub></InfoSub>
        <InfoGenre></InfoGenre>


         </Info>
        </>
    )
}

export default Detail;