function api(){
    const movies="https://api.themoviedb.org/3/discover/movie?api_key=b601e64875ab71ec704302ebf37ce801";
    const searchMovie=`https://api.themoviedb.org/3/search/movie?api_key=b601e64875ab71ec704302ebf37ce801&language=en-US&include_adult=false`;
    return{
        movies,searchMovie
    }
}
export default api