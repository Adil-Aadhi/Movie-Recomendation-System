import { useState, useEffect } from "react";
import { FaFilm, FaUser, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import api from "../api/api";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [search,setSearch]=useState("");
  const {searchMovie}=api()
  const [movie,setMovie]=useState([])

  const FetchMovie=async(query)=>{
    try{
      const movieRes=await axios.get(`${searchMovie}&query=${query}`);

       const peopleRes = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=b601e64875ab71ec704302ebf37ce801&query=${query}`);

      const movieResults = movieRes.data.results;
      const peopleResults = peopleRes.data.results;

      const combinedResults = [
      ...movieResults.map((m) => ({ ...m, type: "movie" })),
      ...peopleResults.map((p) => ({ ...p, type: "person" })),
    ];

      setMovie(combinedResults);
    }
    catch(e){
      console.log("Error on Search movies/peaple",e)
    }
  }

  useEffect(() => {
      if (!search) {
        setMovie([]); // clear results if input is empty
        return;
      }

      const delayDebounce = setTimeout(() => {
        FetchMovie(search);
      }, 400); 

      return () => clearTimeout(delayDebounce); // cleanup previous timeout
    }, [search]);


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "backdrop-blur-xl bg-black/40 shadow-lg py-2"
            : "bg-gradient-to-r from-blue-800 via-purple-800 to-pink-700  py-3 "
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              to="/"
              className="flex items-center gap-3 group transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <FaFilm className="text-3xl relative text-white z-10 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-400">
                MovieVerse
              </div>
            </Link>
            <div className="relative hidden md:block w-64">
                <div className="h-10 flex items-center bg-black/40 bg-opacity-30 rounded-full px-3 py-1 hover:scale-101 transition-all ease-in">
                <FaSearch className="text-gray-400 mr-2 text-2xl" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="bg-transparent border-none focus:outline-none text-white placeholder-gray-400 md:w-50 lg:w-100"
                  onChange={(e)=>setSearch(e.target.value)}
                  value={search}
                />
              </div>
            </div>
            {search && movie.length > 0 && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-150  bg-black/90 rounded-md max-h-60 overflow-auto scrollbar-hide z-50">
              {movie.map((m) => (
                <Link
                  key={m.id}
                  to={m.type === "movie" ? `/movie/${m.id}` : `/person/${m.id}`}
                  className="flex items-center gap-10 px-3 py-2 text-white hover:bg-gray-700"
                  onClick={() => setSearch("")}
                >
                   {m.type === "movie" ? (
                    m.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${m.poster_path}`}
                              alt={m.title}
                              className="w-12 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-12 h-16 bg-gray-700 flex items-center justify-center rounded text-xs">
                              No Image
                            </div> )
                          ):(
                             m.profile_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${m.profile_path}`}
                                alt={m.name}
                                className="w-12 h-16 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-16 bg-gray-700 flex items-center justify-center rounded text-xs">
                                No Image
                              </div>
                            )
                          )}
                  <span className="truncate">{m.type === "movie" ? m.title : m.name}</span>
                  <span className="ml-2 text-xs text-gray-400">{m.type === "movie" ? "Movie" : "Actor"}</span>
                </Link>
              ))}
            </div>
          )}

            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/home"
                className={`hover:text-cyan-300 transition-colors duration-300 ${
                  location.pathname === "/" ? "text-cyan-400 font-semibold" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`hover:text-cyan-300 transition-colors duration-300 ${
                  location.pathname === "/about"
                    ? "text-cyan-400 font-semibold"
                    : ""
                }`}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`hover:text-cyan-300 transition-colors duration-300 ${
                  location.pathname === "/services"
                    ? "text-cyan-400 font-semibold"
                    : ""
                }`}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className={`hover:text-cyan-300 transition-colors duration-300 ${
                  location.pathname === "/contact"
                    ? "text-cyan-400 font-semibold"
                    : ""
                }`}
              >
                Contact
              </Link>
              <Link
                to="/profile"
                className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <FaUser />
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button className="p-2 mr-2 rounded-full bg-black bg-opacity-30">
                <FaSearch />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none p-2 rounded-full bg-black bg-opacity-30"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 space-y-3 bg-black bg-opacity-50 backdrop-blur-lg rounded-b-lg">
            <Link
              to="/"
              className="block py-2 hover:text-cyan-300 transition-colors duration-300 border-b border-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-2 hover:text-cyan-300 transition-colors duration-300 border-b border-gray-700"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block py-2 hover:text-cyan-300 transition-colors duration-300 border-b border-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block py-2 hover:text-cyan-300 transition-colors duration-300 border-b border-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/profile"
              className="block py-2 hover:text-cyan-300 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;