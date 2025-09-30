import api from "../api/api"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function DiscoverMovies() {
  const navigate = useNavigate()

  const [malayalam, setMalayalam] = useState([])
  const [tamil, setTamil] = useState([])
  const [Hindi, setHindi] = useState([])
  const [English, setEnglish] = useState([])
  const [Telugu, setTelugu] = useState([])
  const { movies } = api()

  const MalayalamMovies = async () => {
    try {
      const res = await axios.get(
        `${movies}&with_original_language=ml&primary_release_year=2026`
      )
      setMalayalam(res.data.results)
    } catch (e) {
      console.log("Error on fetching Malayalam movies", e)
    }
  }

  const TamilMovies = async () => {
    try {
      const res = await axios.get(
        `${movies}&with_original_language=ta&primary_release_year=2026`
      )
      setTamil(res.data.results)
    } catch (e) {
      console.log("Error on fetching Tamil movies", e)
    }
  }
  const HindiMovies = async () => {
    try {
      const res = await axios.get(
        `${movies}&with_original_language=hi&primary_release_year=2026`
      )
      setHindi(res.data.results)
    } catch (e) {
      console.log("Error on fetching Tamil movies", e)
    }
  }

  const EnglishMovies = async () => {
    try {
      const res = await axios.get(
        `${movies}&with_original_language=en&primary_release_year=2026`
      )
      setEnglish(res.data.results)
    } catch (e) {
      console.log("Error on fetching Tamil movies", e)
    }
  }
  const TeluguMovies = async () => {
    try {
      const res = await axios.get(
        `${movies}&with_original_language=te&primary_release_year=2026`
      )
      setTelugu(res.data.results)
    } catch (e) {
      console.log("Error on fetching Tamil movies", e)
    }
  }

  useEffect(() => {
    MalayalamMovies();
    TamilMovies();
    HindiMovies();
    EnglishMovies();
    TeluguMovies()
  }, [])

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <div className=" mx-10 mt-25">
        {/* Main Heading */}
        <h2 className="text-5xl font-bold text-white mb-10 text-center">
          Coming Soon
        </h2>

        {/* Malayalam Section */}
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Malayalam</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12">
          {malayalam.slice(0, 6).map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://placehold.co/300x450?text=No+Image"
                  }}
                />

                {/* Overlay Button */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 cursor-pointer"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    Learn More
                  </button>
                </div>

                {/* Rating Badge */}
                {movie.vote_average && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold text-sm py-1 px-2 rounded-full flex items-center">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {new Date(movie.release_date).getFullYear()}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {movie.original_language
                      ? movie.original_language.toUpperCase()
                      : "N/A"}
                  </span>

                  <div className="flex items-center">
                    ❤️
                    <span className="ml-1 text-xs text-gray-400">
                      {movie.vote_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tamil Section */}
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Tamil</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12">
          {tamil.slice(0, 6).map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://placehold.co/300x450?text=No+Image"
                  }}
                />

                {/* Overlay Button */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 cursor-pointer"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    Learn More
                  </button>
                </div>

                {/* Rating Badge */}
                {movie.vote_average && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold text-sm py-1 px-2 rounded-full flex items-center">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {new Date(movie.release_date).getFullYear()}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {movie.original_language
                      ? movie.original_language.toUpperCase()
                      : "N/A"}
                  </span>

                  <div className="flex items-center">
                    ❤️
                    <span className="ml-1 text-xs text-gray-400">
                      {movie.vote_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*Hindi section*/}

        
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Hindi</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12">
          {Hindi.slice(0, 6).map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://placehold.co/300x450?text=No+Image"
                  }}
                />

                {/* Overlay Button */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 cursor-pointer"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    Learn More
                  </button>
                </div>

                {/* Rating Badge */}
                {movie.vote_average && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold text-sm py-1 px-2 rounded-full flex items-center">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {new Date(movie.release_date).getFullYear()}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {movie.original_language
                      ? movie.original_language.toUpperCase()
                      : "N/A"}
                  </span>

                  <div className="flex items-center">
                    ❤️
                    <span className="ml-1 text-xs text-gray-400">
                      {movie.vote_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*English section*/}


        <h3 className="text-2xl font-bold text-white mb-8 text-center">English</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12">
          {English.slice(0, 6).map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://placehold.co/300x450?text=No+Image"
                  }}
                />

                {/* Overlay Button */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 cursor-pointer"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    Learn More
                  </button>
                </div>

                {/* Rating Badge */}
                {movie.vote_average && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold text-sm py-1 px-2 rounded-full flex items-center">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {new Date(movie.release_date).getFullYear()}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {movie.original_language
                      ? movie.original_language.toUpperCase()
                      : "N/A"}
                  </span>

                  <div className="flex items-center">
                    ❤️
                    <span className="ml-1 text-xs text-gray-400">
                      {movie.vote_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*Telugu section*/}


        <h3 className="text-2xl font-bold text-white mb-8 text-center">Telugu</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-6">
          {Telugu.slice(0, 6).map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://placehold.co/300x450?text=No+Image"
                  }}
                />

                {/* Overlay Button */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 cursor-pointer"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    Learn More
                  </button>
                </div>

                {/* Rating Badge */}
                {movie.vote_average && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold text-sm py-1 px-2 rounded-full flex items-center">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {new Date(movie.release_date).getFullYear()}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {movie.original_language
                      ? movie.original_language.toUpperCase()
                      : "N/A"}
                  </span>

                  <div className="flex items-center">
                    ❤️
                    <span className="ml-1 text-xs text-gray-400">
                      {movie.vote_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default DiscoverMovies
