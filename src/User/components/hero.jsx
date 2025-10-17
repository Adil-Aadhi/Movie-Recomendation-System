import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Hero() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [moviesData, setMoviesData] = useState([]);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()



   const fetchMovies = async () => {
      try {
        const movieTitles = [
          "Lokah: chapter 1 chandra",
          "Marco 2024",
          "Pushpa 2",
          "Leo 2023",
          "Salaar"
        ];
        const apiKey = "b601e64875ab71ec704302ebf37ce801";
        const baseImageUrl = "https://image.tmdb.org/t/p/original";
        const fetchedMovies = [];
        setLoading(true)

        for (const title of movieTitles) {
          const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`
          );
          const movie = res.data.results[0]; // Take first match
          if (movie) {
            fetchedMovies.push({
              id:movie.id,
              poster: movie.backdrop_path ? `${baseImageUrl}${movie.backdrop_path}` : "", 
              title: movie.title,
              genre: movie.release_date ? `• ${movie.release_date.slice(0, 4)}` : ""
            });
          }
        }
          setMoviesData(fetchedMovies);
          setLoading(false);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    }

    useEffect(()=>{
      fetchMovies()
    },[])

    const loopSlides = [...moviesData, ...moviesData];


    if (loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
        }
  

  return (
    <div className="relative w-full bg-gradient-to-b from-gray-900 to-black overflow-hidden py-8 sm:min-h-screen">
      <div className="relative z-10 pt-16 pb-12 px-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">
          Featured Movies
        </h1>
        <p className="text-gray-300 mb-10 text-center max-w-2xl">
          Discover the latest and greatest films in our collection
        </p>
        
        <div className="w-full max-w-6xl mx-auto relative">
          {moviesData.length > 0 &&(
           <Swiper
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                onSlideChange={(swiper) => { setActiveIndex(swiper.realIndex); }}
                slidesPerView={1.2}  // mobile default
                centeredSlides={true}
                spaceBetween={16}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-[60vw] sm:h-[60vh]"  // mobile: 60% of width, desktop: 60vh
                breakpoints={{
                  640: {
                    slidesPerView: 1.2,
                    spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 1.5,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 1.7,
                    spaceBetween: 40,
                  },
                }}
              >
                {loopSlides.map((movie, i) => (
                  <SwiperSlide key={i} className="flex items-center justify-center">
                    <div className={`relative w-full h-full transition-all duration-500 rounded-2xl overflow-hidden ${activeIndex === i ? 'scale-100 brightness-100 z-10' : 'scale-90 brightness-50 z-0'}`}>
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      />
                      {activeIndex === i && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 sm:p-6">
                          <h3 className="text-white text-lg sm:text-2xl font-bold truncate">{movie.title}</h3>
                          <p className="text-gray-300 text-sm sm:text-base">{movie.genre}</p>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

          )}
          
          
          {/* Custom navigation buttons */}
          <button 
            className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <style jsx global>{`
        .swiper-pagination {
          bottom: 0px !important;
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 12px;
          height: 12px;
          margin: 0 8px !important;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
}

export default Hero;