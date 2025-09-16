import { useEffect } from "react";
import api from "../api/api"
import axios from "axios";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function MovieFilter(){

    const {movies}=api();
    const [loading,setLoading]=useState(false)
    const [malayalamMovie,setMalayalamMovie]=useState([])
    const [tamilMovie,setTamilMovie]=useState([])
    const [HindiMovie,setHindiMovie]=useState([])
    const [englishMovie,setEnglishMovie]=useState([])
    const [telungMovie,setTelungMovie]=useState([])
    const navigate=useNavigate()
    const location=useLocation()
    const {id,name}=location.state;
    const [filterState,setFilterState]=useState(name)



    const genres = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Drama", id: 18 },
  { name: "Sci-Fi", id: 878 },
  { name: "Horror", id: 27 },
];
    const FetchMalyalamMovie=async()=>{
        setLoading(true)
        try{
            const res=await axios.get(`${movies}&with_original_language=ml&primary_release_year=2025&with_genres=${id}`)
            setMalayalamMovie(res.data.results);
            setLoading(false)
        }catch(e){
            console.log("Error on fetching movies",e);
        }finally {
            setLoading(false)}
    }
    const FetchTamilMovie=async()=>{
        setLoading(true)
        try{
            const res=await axios.get(`${movies}&with_original_language=ta&primary_release_year=2025&with_genres=${id}`)
            setTamilMovie(res.data.results);
            setLoading(false)
        }catch(e){
            console.log("Error on fetching movies",e);
        }finally {
            setLoading(false)}
    }
    const FetchHindiMovie=async()=>{
        setLoading(true)
        try{
            const res=await axios.get(`${movies}&with_original_language=hi&primary_release_year=2025&with_genres=${id}`)
            setHindiMovie(res.data.results);
            setLoading(false)
        }catch(e){
            console.log("Error on fetching movies",e);
        }finally {
            setLoading(false)}
    }
    const FetchTelungMovie=async()=>{
        setLoading(true)
        try{
            const res=await axios.get(`${movies}&with_original_language=te&primary_release_year=2025&with_genres=${id}`)
            setTelungMovie(res.data.results);
            setLoading(false)
        }catch(e){
            console.log("Error on fetching movies",e);
        }finally {
            setLoading(false)}
    }
    const FetchEnglishMovie=async()=>{
        setLoading(true)
        try{
            const res=await axios.get(`${movies}&with_original_language=en&primary_release_year=2025&with_genres=${id}`)
            setEnglishMovie(res.data.results);
            setLoading(false)
        }catch(e){
            console.log("Error on fetching movies",e);
        }finally {
            setLoading(false)}
    }

    useEffect(()=>{
        FetchMalyalamMovie(),
        FetchTamilMovie(),
        FetchHindiMovie(),
        FetchTelungMovie(),
        FetchEnglishMovie()
    },[id])

     if (loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
        }

    return(
        <div className="mt-20">
            <div className="p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen">

                <div className="flex flex-wrap justify-center mt-6 gap-2 mb-6">
                        {genres.map((genre) => (
                            <button
                                key={genre.id}
                                className={`px-4 py-2 rounded-full text-sm backdrop-blur-md border border-white/20 cursor-pointer transition-colors duration-300
                                            ${filterState === genre.name 
                                            ? "bg-amber-500 text-black"
                                            : "bg-white/10 text-white hover:bg-amber-500/30"}`
                                        }
                                onClick={()=>{navigate('/moviegenre',{state:{
                                    id:genre.id
                                }});
                                setFilterState(genre.name)}}>
                                {genre.name}
                            </button>
                        ))}
                    </div>
               
                  {malayalamMovie.length>0 && (
                    <>
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">{filterState} Malayalam Movies</h2>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-7">
                        {malayalamMovie.slice(0,6)
                                .map((movie, index) => (
                            <div 
                                key={movie.id} 
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group mt-5"
                            >
                                <div className="relative overflow-hidden">
                                    {/* {console.log(movie.id)} */}
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title}
                                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450/1a202c/ffffff?text=No+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                     {malayalamMovie.length>5 && (
                        <div className="flex justify-end items-center">
                            <button className="flex items-center hover:bg-red-500 p-2 gap-1 rounded-xl cursor-pointer transition-all duration-400 ease-in-out" onClick={()=>navigate('/moremovies?lang=ml')}>
                                <span className="font-medium">More</span><IoIosArrowForward className="text-xl"/></button>
                        </div>
                     )}
                     
                    </>
                  )}  
                            
                
                        
            <h2 className="text-3xl font-bold text-white mb-8 text-center">{filterState} Tamil Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-7">
                            {tamilMovie.slice(0,6)
                                .map((movie, index) => (
                            <div 
                                key={movie.id} 
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group mt-5"
                            >
                                <div className="relative overflow-hidden">
                                    {/* {console.log(movie.id)} */}
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title}
                                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450/1a202c/ffffff?text=No+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                {tamilMovie.length>5 && (
                    <div className="flex justify-end items-center">
                            <button className="flex items-center hover:bg-red-500 p-2 gap-1 rounded-xl cursor-pointer transition-all duration-400 ease-in-out" onClick={()=>navigate('/moremovies?lang=ml')}>
                                <span className="font-medium">More</span><IoIosArrowForward className="text-xl"/></button>
                        </div>
                )}
                        
            <h2 className="text-3xl font-bold text-white mb-8 text-center">{filterState} English Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-7">
                            {englishMovie.slice(0,6)
                                .map((movie, index) => (
                            <div 
                                key={movie.id} 
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group mt-5"
                            >
                                <div className="relative overflow-hidden">
                                    {/* {console.log(movie.id)} */}
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title}
                                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450/1a202c/ffffff?text=No+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                {englishMovie.length > 5 && (
                    <div className="flex justify-end items-center">
                            <button className="flex items-center hover:bg-red-500 p-2 gap-1 rounded-xl cursor-pointer transition-all duration-400 ease-in-out" onClick={()=>navigate('/moremovies?lang=ml')}>
                                <span className="font-medium">More</span><IoIosArrowForward className="text-xl"/></button>
                        </div>
                )}
                        
            <h2 className="text-3xl font-bold text-white mb-8 text-center">{filterState} Hindi Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-7">
                            {HindiMovie.slice(0,6)
                                .map((movie, index) => (
                            <div 
                                key={movie.id} 
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group mt-5"
                            >
                                <div className="relative overflow-hidden">
                                    {/* {console.log(movie.id)} */}
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title}
                                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450/1a202c/ffffff?text=No+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                {HindiMovie.length>5 && (
                    <div className="flex justify-end items-center">
                            <button className="flex items-center hover:bg-red-500 p-2 gap-1 rounded-xl cursor-pointer transition-all duration-400 ease-in-out" onClick={()=>navigate('/moremovies?lang=ml')}>
                                <span className="font-medium">More</span><IoIosArrowForward className="text-xl"/></button>
                        </div>
                )}
                        
            <h2 className="text-3xl font-bold text-white mb-8 text-center"> {filterState} Telung Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-7">
                            {telungMovie.slice(0,6)
                                .map((movie, index) => (
                            <div 
                                key={movie.id} 
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group mt-5"
                            >
                                <div className="relative overflow-hidden">
                                    {/* {console.log(movie.id)} */}
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title}
                                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450/1a202c/ffffff?text=No+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                {telungMovie.length >5 &&(
                         <div className="flex justify-end items-center">
                            <button className="flex items-center hover:bg-red-500 p-2 gap-1 rounded-xl cursor-pointer transition-all duration-400 ease-in-out" onClick={()=>navigate('/moremovies?lang=ml')}>
                                <span className="font-medium">More</span><IoIosArrowForward className="text-xl"/></button>
                        </div>
                )}
                       
            </div>
        </div>
    )
}
export default MovieFilter