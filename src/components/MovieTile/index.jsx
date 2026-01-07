function MovieTile({ movie = {} }) {
  return (
    <li key={movie.id}>
      <strong>{movie.original_title}</strong> ({movie.release_date})
    </li>
  );
}

export default MovieTile;
