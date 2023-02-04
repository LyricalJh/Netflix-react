import { useQuery } from "react-query";
import {getMovie} from '../api';
import {IGetMoviesResult} from '../interfaces/movieInterface';
import {Wrapper,Loader, Banner, Title} from '../style/HomeStyle';
import Slider from './Components/Slider';
import { makeImagePath } from "../utils";


function Home(){
    const {data,isLoading} = useQuery<IGetMoviesResult>(["movies", "now playing"],getMovie);
    return (
        <Wrapper>{isLoading ? <Loader>..Loading</Loader> : <>
        <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
        </Banner>
       <Slider data={data}/>
        </>}
        </Wrapper>
    )
}

export default Home;