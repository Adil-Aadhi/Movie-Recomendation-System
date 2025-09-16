import { useState,useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";


function Landing() {

    const navigate=useNavigate();
    const {searchMovie}=api()

    const genres = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Drama", id: 18 },
  { name: "Sci-Fi", id: 878 },
  { name: "Horror", id: 27 },
];

const [movies,setMovies]=useState([])
const [search,setSearch]=useState("");


const FetchMovie=async(query)=>{
try{

    const movieRes=await axios.get(`${searchMovie}&query=${query}`)

    const peopleRes = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=b601e64875ab71ec704302ebf37ce801&query=${query}`);

    const movieResults=movieRes.data.results;
    const peapleResult=peopleRes.data.results;

    const combinedResults = [
      ...movieResults.map((m) => ({ ...m, type: "movie" })),
      ...peapleResult.map((p) => ({ ...p, type: "person" })),
    ];

    setMovies(combinedResults)


}catch(e){
    console.log("Error on Searching movie",e)
}


}


 useEffect(() => {
      if (!search) {
        setMovies([]); // clear results if input is empty
        return;
      }

      const delayDebounce = setTimeout(() => {
        FetchMovie(search);
      }, 400); 

      return () => clearTimeout(delayDebounce); // cleanup previous timeout
    }, [search]);

    return (
        <div className="relative w-full h-screen min-h-[650px] overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/images/2.jpg"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90"></div>
            </div>

            <div className="absolute z-20 right-20 mt-5">
                <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm backdrop-blur-md hover:bg-amber-500/30 transition-colors duration-300 border border-white/20 cursor-pointer"
                        onClick={()=>navigate('/login')}>
                    Login
                </button>
            </div>
            <div className="absolute z-20 left-20 mt-5">
                <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm backdrop-blur-md hover:bg-amber-500/30 transition-colors duration-300 border border-white/20 cursor-pointer"
                        onClick={()=>navigate('/home')}>
                    <MdClose/>
                </button>
            </div>
            
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                    Discover Your Next <span className="text-amber-400">Favorite Movie</span>
                </h1>

                <p className="text-xl text-gray-200 mb-10 max-w-2xl drop-shadow-md">
                    Explore thousands of movies, find ratings, and get recommendations
                </p>

                <div className="w-full max-w-2xl relative">
                    <div className="flex items-center backdrop-blur-sm rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-amber-900/30 hover:scale-[1.01]">
                        <input
                            type="text"
                            placeholder="Search for movies, actors, or directors..."
                            className="w-full py-4 px-6 backdrop-blur-sm bg-white/10 text-white text-lg focus:outline-none"
                            onChange={(e)=>setSearch(e.target.value)}
                            value={search}
                        />
                        <button className="bg-amber-500 hover:bg-red-600 text-white py-4 px-8 rounded-r-full transition-colors duration-300 flex items-center cursor-pointer">
                            <span className="mr-2">Search</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

            {search && movies.length > 0 && (
            <div className="absolute top-15 left-1/2 -translate-x-1/2 w-150   bg-black/90 rounded-md max-h-60 overflow-auto scrollbar-hide z-50">
              {movies.map((m) => (
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
                    

                    <div className="flex flex-wrap justify-center mt-6 gap-2 mb-6">
                        {genres.map((genre) => (
                            <button
                                key={genre.id}
                                className="px-4 py-2 bg-white/10 text-white rounded-full text-sm backdrop-blur-md hover:bg-amber-500/30 transition-colors duration-300 border border-white/20 cursor-pointer"
                                onClick={()=>navigate('/moviegenre',{state:{
                                    id:genre.id,name:genre.name
                                }})}>
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;