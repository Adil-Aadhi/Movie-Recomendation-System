import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function SingleMovie() {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const {id}=useParams()
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

const [relatedByActor, setRelatedByActor] = useState([]);
const [relatedByDirector, setRelatedByDirector] = useState([]);
const [relatedByGenre, setRelatedByGenre] = useState([]);
const [platform,setPlatform]=useState([]);
const [watchLink, setWatchLink] = useState(null);
const [posters, setPosters] = useState([]);
const [showAll, setShowAll] = useState(false); 
const [selectedPoster, setSelectedPoster] = useState(null);


const displayedPosters = showAll ? posters : posters.slice(0, 8);

  const fetchMovieData = async () => {
    try {
      setLoading(true)
      const movieRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b601e64875ab71ec704302ebf37ce801`
      );
      setMovie(movieRes.data);

      const moviePlatform= await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=b601e64875ab71ec704302ebf37ce801`)
      const data=moviePlatform.data.results["IN"]
      const providers=data?.flatrate || []
      setPlatform(providers);
      setWatchLink(data?.link || null)

      const castRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=b601e64875ab71ec704302ebf37ce801`
      );
      setCast(castRes.data.cast.slice(0, 6));

      if (castRes.data.cast.length > 0) {
      const mainActor = castRes.data.cast[0];
      const actorMoviesRes = await axios.get(`https://api.themoviedb.org/3/person/${mainActor.id}/movie_credits?api_key=b601e64875ab71ec704302ebf37ce801`);
      setRelatedByActor(actorMoviesRes.data.cast.slice(0, 6));}

      const director = castRes.data.crew.find(person => person.job === "Director");
      if (director) {
        const directorMoviesRes = await axios.get(`https://api.themoviedb.org/3/person/${director.id}/movie_credits?api_key=b601e64875ab71ec704302ebf37ce801`);
        setRelatedByDirector(directorMoviesRes.data.crew.slice(0, 6));}

      if (movieRes.data.genres.length > 0) {
      const firstGenre = movieRes.data.genres[0];
       const movieLanguage = movieRes.data.original_language; 
      const genreMoviesRes = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b601e64875ab71ec704302ebf37ce801&with_genres=${firstGenre.id}&with_original_language=${movieLanguage}`);
      setRelatedByGenre(genreMoviesRes.data.results.slice(0, 6));}


      const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=b601e64875ab71ec704302ebf37ce801`);
      setPosters(res.data.posters || []);

    } catch (error) {
      console.error("Error fetching data:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [id]);

   if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        );
      }

  if (!movie) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div>
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative pt-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}
    >
      <div className="container mx-auto px-15 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm rounded-2xl">
              {movie.poster_path?(
                <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className="w-full max-w-sm rounded-xl shadow-2xl transform hover:scale-105 transition duration-500"
                onClick={()=>setSelectedPoster(movie.poster_path)}
              />
              ):( <div className="w-full h-96 flex flex-col items-center justify-center rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center px-4">
                  <div className="absolute top-3 right-3 bg-black/30 p-2 rounded-full backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400 leading-tight line-clamp-3">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-white/60 mt-2 tracking-wider">
                    NO POSTER AVAILABLE
                  </p>
                </div>
              )}
              
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl opacity-75 blur-lg -z-10"></div>
            </div>
          </div>

          <div className="lg:col-span-2 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {movie.release_date.split("-")[0]}
              </span>
              <span className="flex items-center bg-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.runtime} min</span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            {platform && platform.length > 0 && (
              <div className="mb-6 ">
              <h2 className="text-xl font-semibold mb-3">Now Streaming on</h2>
              <div className="flex flex-wrap gap-6 align-center">
              {platform.map(p => (
                <div key={p.provider_id}  className="flex flex-col items-center text-center">
                  <img src={`https://image.tmdb.org/t/p/original${p.logo_path}`} alt={p.provider_name} className="w-13 h-13 mb-2 rounded-sm hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer" 
                        onClick={()=> watchLink && window.open(watchLink, "_blank")}/>
                  <p className="mb-3">{p.provider_name}</p>
                </div>
              ))}
              </div>
            </div>
            )}
            
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {cast.map(actor => (
              <div key={actor.id} className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 overflow-hidden rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                    onClick={()=>navigate(`/person/${actor.id}`)}>
                  <img 
                    src={actor.profile_path 
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/200x200/333/fff?text=No+Image"
                    } 
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-sm font-medium">{actor.name}</p>
                <p className="text-gray-400 text-xs">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="mt-16 ms-10">
      <h2 className="text-3xl font-bold mb-10 text-center relative">
                    <span className="relative z-10 px-4 bg-gradient-to-br from-slate-900 to-red-800">
                      POSTERS
                    </span>
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-0"></div>
      </h2>
      <div className="flex flex-wrap gap-4">
      {displayedPosters.map((p,index)=>(
      <img
      key={index}
      src={`https://image.tmdb.org/t/p/w500${p.file_path}`}
      alt={`${movie.title} Poster ${index + 1}`}
      className="w-40 h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
      onClick={()=>setSelectedPoster(p.file_path)}
    />
      ))}
      </div>
    </div>
    {posters.length > 6 && (
  <div className="mt-4 text-center">
    <button
      onClick={() => setShowAll(!showAll)}
      className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors cursor-pointer"
    >
      {showAll ? "Show Less" : "Show More"}
    </button>
  </div>
)}

    {selectedPoster && (
      <div
        className={`fixed inset-0  backdrop-blur-sm bg-black/70 flex items-center justify-center z-50 transition-opacity duration-900 ease-in-out opacity-100`}
        onClick={() => setSelectedPoster(null)} 
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedPoster}`}
          alt="Selected Poster"
          className="max-w-full h-150 rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )}
              <div className="mt-16 ms-10">
                  <h2 className="text-3xl font-bold mb-10 text-center relative">
                    <span className="relative z-10 px-4 bg-gradient-to-br from-slate-900 to-red-800">
                      Related Movies
                    </span>
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-0"></div>
                  </h2>

                  {/* By Actor */}
                  {relatedByActor.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-xl font-semibold text-slate-300 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        More from {cast[0]?.name}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                        {relatedByActor.map(movie => (
                          <div key={movie.id} 
                              className="group bg-slate-800/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm border border-slate-700/30 cursor-pointer"
                              onClick={() => navigate(`/movie/${movie.id}`)}>
                            {/* Poster Image */}
                            {movie.poster_path ? (
                              <div className="relative overflow-hidden aspect-[2/3]">
                                <img
                                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                  alt={movie.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                
                                {/* Rating Badge */}
                                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center border border-yellow-500/50">
                                  <span className="text-yellow-400 font-bold text-xs">{movie.vote_average?.toFixed(1)}</span>
                                </div>
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-medium mb-2 line-clamp-3">{movie.title}</p>
                                    <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-full inline-flex items-center">
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="relative aspect-[2/3] bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex flex-col items-center justify-center text-center p-4">
                                <div className="text-3xl mb-2 opacity-50">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                  </svg>
                                </div>
                                <span className="text-sm font-medium line-clamp-3">{movie.title}</span>
                                
                                {/* Rating Badge for missing poster */}
                                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center border border-yellow-500/50">
                                  <span className="text-yellow-400 font-bold text-xs">{movie.vote_average?.toFixed(1)}</span>
                                </div>
                              </div>
                            )}
                            
                            {/* Movie Info */}
                            <div className="p-3">
                              <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-red-300 transition-colors">{movie.title}</h3>
                              <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}</span>
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span>{movie.vote_count}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* By Director */}
                  {relatedByDirector.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-xl font-semibold text-slate-300 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Directed by {cast.find(c => c.job === "Director")?.name}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                        {relatedByDirector.map(movie => (
                          <div key={movie.id}
                              className="group bg-slate-800/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm border border-slate-700/30 cursor-pointer"
                              onClick={() => navigate(`/movie/${movie.id}`)}>
                            {/* Poster Image */}
                            {movie.poster_path ? (
                              <div className="relative overflow-hidden aspect-[2/3]">
                                <img
                                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                  alt={movie.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                
                                {/* Rating Badge */}
                                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center border border-yellow-500/50">
                                  <span className="text-yellow-400 font-bold text-xs">{movie.vote_average?.toFixed(1)}</span>
                                </div>
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-medium mb-2 line-clamp-3">{movie.title}</p>
                                    <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-full inline-flex items-center">
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="relative aspect-[2/3] bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex flex-col items-center justify-center text-center p-4">
                                <div className="text-3xl mb-2 opacity-50">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                  </svg>
                                </div>
                                <span className="text-sm font-medium line-clamp-3">{movie.title}</span>
                                
                                {/* Rating Badge for missing poster */}
                                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center border border-yellow-500/50">
                                  <span className="text-yellow-400 font-bold text-xs">{movie.vote_average?.toFixed(1)}</span>
                                </div>
                              </div>
                            )}
                            
                            {/* Movie Info */}
                            <div className="p-3">
                              <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-red-300 transition-colors">{movie.title}</h3>
                              <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}</span>
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span>{movie.vote_count}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* By Genre */}
                  {relatedByGenre.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-xl font-semibold text-slate-300 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                        Similar {movie.genres[0]?.name} Movies
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                        {relatedByGenre.map(movie => (
                          <div key={movie.id}
                              className="group bg-slate-800/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm border border-slate-700/30 cursor-pointer"
                              onClick={() => navigate(`/movie/${movie.id}`)}>
                            {/* Poster Image */}
                            {movie.poster_path ? (
                              <div className="relative overflow-hidden aspect-[2/3]">
                                <img
                                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                  alt={movie.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                
                                {/* Rating Badge */}
                                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center border border-yellow-500/50">
                                  <span className="text-yellow-400 font-bold text-xs">{movie.vote_average?.toFixed(1)}</span>
                                </div>
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-medium mb-2 line-clamp-3">{movie.title}</p>
                                    <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-full inline-flex items-center">
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="relative aspect-[2/3] bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex flex-col items-center justify-center text-center p-4">
                                <div className="text-3xl mb-2 opacity-50">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                  </svg>
                                </div>
                                <span className="text-sm font-medium line-clamp-3">{movie.title}</span>
                                
                                {/* Rating Badge for missing poster */}
                                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center border border-yellow-500/50">
                                  <span className="text-yellow-400 font-bold text-xs">{movie.vote_average?.toFixed(1)}</span>
                                </div>
                              </div>
                            )}
                            
                            {/* Movie Info */}
                            <div className="p-3">
                              <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-red-300 transition-colors">{movie.title}</h3>
                              <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}</span>
                                <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span>{movie.vote_count}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
</div>
    </div>
  );
}

export default SingleMovie;