import Error from "../Error";
import MovieTile from "../MovieTile";

function MovieList({ movies = [] }) {
  if (!movies?.length)
    return <Error customMessage="We haven't found any movie" />;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {movies.map((movie) => (
        <MovieTile key={movie.movie_id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
