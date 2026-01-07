import { StarIcon } from "@heroicons/react/24/solid";

function MovieTile({ movie = {} }) {
  return (
    <div
      key={movie.id}
      className="relative flex border border-gray-500 rounded-2xl overflow-hidden w-135"
    >
      <img src={movie.poster_path} loading="lazy" className="w-55" />
      <div className="p-4 text-zinc-50">
        <strong>{movie.original_title}</strong>
        <br />
        <small>({movie.release_date})</small>
        <br />
        <div className="flex items-center gap-0.5">
          <StarIcon className="size-3" /> {movie.vote_average}
          <small>({movie.vote_count})</small>
        </div>
      </div>
    </div>
  );
}

export default MovieTile;
