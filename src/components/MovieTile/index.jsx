import { StarIcon } from "@heroicons/react/24/solid";

function MovieTile({ movie = {} }) {
  return (
    <div
      key={movie.id}
      className="h-84 cursor-pointer flex border border-gray-500 rounded-2xl overflow-hidden w-135 hover:shadow-2xl/30 hover:-translate-y-0.5 transition duration-300 shadow-gray-100 "
    >
      <img src={movie.poster_path} loading="lazy" className="min-w-55" />
      <div
        className="bg-cover bg-center w-full"
        style={{
          backgroundImage: `url('${movie.poster_path}}')`,
        }}
      >
        <div className="p-4 h-full text-zinc-50 backdrop-blur-lg bg-zinc-800/40 flex flex-col items-start justify-end gap-0.5">
          <p className="text-2xl font-bold">{movie.original_title}</p>
          <small>({movie.release_date})</small>
          <p className="max-h-50 line-clamp-3" title={movie.overview}>
            {movie.overview}
          </p>
          {movie.vote_count > 0 ? (
            <div className="flex items-center gap-0.5">
              <StarIcon className="size-4 text-yellow-300" />{" "}
              {movie.vote_average}
              <small>({movie.vote_count})</small>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieTile;
