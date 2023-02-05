import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Header from './Routes/Components/Header';


function App(){
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />}/>
        <Route path="/serarch" element={<Search />}/>
        <Route path="/" element={<Home />}/>
          <Route path="/movie/:movieId" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App;