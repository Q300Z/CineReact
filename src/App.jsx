import {Route, Routes} from "react-router";
import Wishlist from "./components/Wishlist.jsx";
import Navbar from "./components/Navbar.jsx";
import Index from "./pages/Index.jsx";
import MovieDetail from "./components/MovieDetail.jsx";

function App() {

    return (<>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/movie/:id" element={<MovieDetail/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
        </Routes>
    </>)
}

export default App
