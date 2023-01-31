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
        <Route path="/tv" element={<Tv />}>
        </Route>
        <Route path="/serarch" element={<Search />}>
        </Route>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;