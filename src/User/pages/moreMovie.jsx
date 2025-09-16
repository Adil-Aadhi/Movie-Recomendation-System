import axios from "axios"
import api from "../api/api"
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


function MoreMovie(){

    const {movies}=api();
    const [movie,setMovie]=useState(null)
    const navigate=useNavigate();
    const [page,setPage]=useState(1)
    const [searchParams]=useSearchParams();
    const today = new Date().toISOString().split('T')[0];


    const PageIncrease=()=>{
        setPage(page+1)
    }
    const PageDecrease=()=>{
        setPage(page-1)
    }

    const MoreMovies=async(lang)=>{

        try{
            const res=await axios.get(`${movies}&with_original_language=${lang}&sort_by=primary_release_date.desc&primary_release_date.lte=${today}&page=${page}`)

            setMovie(res.data.results);
        }
        catch(e){
            console.log("Error on fetching movies")
        }
    }

    useEffect(()=>{
        const lang = searchParams.get("lang");
        if (!lang) return;
        MoreMovies(lang)

    },[page,searchParams])

     if (!movie) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

    return (
        <div className="relative w-full min-h-screen p-5">
            <div className="relative z-10 pt-16 pb-12 px-4 flex flex-col items-center justify-center">
                <h2 className="text-lg md:text-3xl font-bold text-white mb-2 mt-5 text-center">Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 mb-7">
                {movie.map((movie, index) => (
                <div 
                    key={movie.id} 
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group mt-5"
                >
                    <div className="relative overflow-hidden">
                        {movie.poster_path ?(
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title}
                                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450/1a202c/ffffff?text=No+Image';
                                }}
                            />
                        ):(
                           <div className="w-full h-72 relative flex items-center justify-center overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-01">
                                <div className="absolute top-3 right-3 bg-black/30 p-2 rounded-full backdrop-blur-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-white/70" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </div>

                                {/* Title */}
                                <div className="relative z-10 text-center px-3">
                                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400 leading-tight line-clamp-3">
                                    {movie.title}
                                    </h3>
                                    <p className="text-xs text-white/60 mt-2 tracking-wider">NO POSTER AVAILABLE</p>
                                </div>
                                </div>
                        )}
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 cursor-pointer"
                        onClick={()=>navigate(`/movie/${movie.id}`)}>
                        Learn More
                        </button>
                    </div>
                    
                    {movie.vote_average && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold text-sm py-1 px-2 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {movie.vote_average.toFixed(1)}
                        </div>
                    )}
                    </div>
                    
                    <div className="p-4">
                    <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">{movie.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{new Date(movie.release_date).getFullYear()}</p>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                        {movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}
                        </span>
                        
                        <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-xs text-gray-400">{movie.vote_count || 0}</span>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            <div className="flex gap-5">
                <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm backdrop-blur-md hover:bg-amber-500/30 transition-colors duration-300 border border-white/20 cursor-pointer w-25"
                        onClick={()=>PageDecrease()}>Previous</button>
                <span className="px-4 py-2 text-white rounded-full text-sm border border-white/20 bg-white/5">{page}</span>
                <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm backdrop-blur-md hover:bg-amber-500/30 transition-colors duration-300 border border-white/20 cursor-pointer w-25"
                        onClick={()=>PageIncrease()}>Next</button>
            </div>
            </div>
        </div>
    )
}
export default MoreMovie