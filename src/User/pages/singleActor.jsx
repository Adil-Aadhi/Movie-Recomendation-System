import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ActorPage() {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  const apiKey = "b601e64875ab71ec704302ebf37ce801";

  useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true);
        const [actorRes, moviesRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&language=en-US`)
        ]);
        
        setActor(actorRes.data);
        setMovies(moviesRes.data.cast.sort((a, b) => b.popularity - a.popularity));
      } catch (err) {
        console.error("Error fetching actor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-slate-300">Loading actor information...</p>
        </div>
      </div>
    );
  }

  if (!actor) return <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">Actor not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white mt-22">
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-slate-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
                className="rounded-xl shadow-2xl w-56 h-80 object-cover border-4 border-slate-700/50"
              />
            ) : (
              <div className="w-56 h-80 bg-gradient-to-br from-purple-900/70 to-blue-800/70 flex items-center justify-center rounded-xl text-5xl font-bold shadow-2xl">
                {actor.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {actor.name}
              </h1>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-6">
                {actor.birthday && (
                  <div className="flex items-center gap-2 bg-slate-700/60 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Born: {new Date(actor.birthday).toLocaleDateString()}</span>
                  </div>
                )}
                
                {actor.place_of_birth && (
                  <div className="flex items-center gap-2 bg-slate-700/60 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{actor.place_of_birth}</span>
                  </div>
                )}
                
                {actor.deathday && (
                  <div className="flex items-center gap-2 bg-rose-900/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Died: {new Date(actor.deathday).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              {actor.biography && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-3 text-slate-300">Biography</h2>
                  <p className="text-slate-400 line-clamp-4">
                    {actor.biography}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-8 text-center relative">
            <span className="relative z-10 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
              Filmography <span className="text-red-400">({movies.length} movies)</span>
            </span>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-0"></div>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {movies.map((movie) => (
              <div key={movie.id} className="group bg-slate-800/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm border border-slate-700/30">
                {movie.poster_path ? (
                  <div className="relative overflow-hidden aspect-[2/3]">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center border border-yellow-500/50">
                      <span className="text-yellow-400 font-bold text-xs">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {/* <p className="text-sm font-medium mb-2 line-clamp-3">{movie.title}</p>
                        {movie.character && (
                          <p className="text-xs text-slate-300 mb-3">as {movie.character}</p>
                        )} */}
                        <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-full inline-flex items-center cursor-pointer"
                                onClick={()=>navigate(`/movie/${movie.id}`)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Learn More
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
                    
                    <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center border border-yellow-500/50">
                      <span className="text-yellow-400 font-bold text-xs">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                )}
                

                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">{movie.title}</h3>
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
      </div>
    </div>
  );
}

export default ActorPage;