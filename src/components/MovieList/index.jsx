import MovieTile from "../MovieTile";
import NoData from "../NoData";

function MovieList({ movies = [] }) {
  if (!movies?.pages?.length) return <NoData />;

  return movies.pages.map((page, pageIndex) => (
    <ul key={pageIndex}>
      {page.data.map((movie) => (
        <MovieTile key={movie.id} movie={movie} />
      ))}
    </ul>
  ));
}

export default MovieList;
