import './App.css'; 
import Landing from "./User/pages/landing"
import Navbar from "./User/components/navbar"
import { Routes,Route } from 'react-router-dom';
import Profile from './User/pages/profile';
import { useLocation } from 'react-router-dom';
import Login from './User/pages/login';
import Home from './User/pages/home';
import SingleMovie from './User/pages/singleMovie';
import MoreMovie from './User/pages/moreMovie';
import ActorPage from './User/pages/singleActor';
import MovieFilter from './User/pages/genre';
import DiscoverMovies from './User/pages/discover';

function App() {

  const location=useLocation()

  return (
    <div>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/movie/:id" element={<SingleMovie/>}/>
        <Route path="/moremovies" element={<MoreMovie/>}/>
        <Route path="/person/:id" element={<ActorPage/>}/>
        <Route path="/moviegenre" element={<MovieFilter/>}/>
        <Route path="/discovermovie" element={<DiscoverMovies/>}/>
      </Routes>
    </div>
  )
}

export default App
