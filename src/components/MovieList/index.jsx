import MovieTile from "../MovieTile";
import NoData from "../NoData";

function MovieList({ movies = [] }) {
  if (!movies?.length) return <NoData />;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {movies.map((movie) => (
        <MovieTile key={movie.movie_id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
