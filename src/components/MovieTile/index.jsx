import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { motion } from "framer-motion";
import { getYearFromReleaseDate } from "../../Util/format";

function MovieTile({ movie = {}, onOpen, isHidden = false }) {
  const [posterLoaded, setPosterLoaded] = useState(false);

  const mutableOpacityClasses = `transition-opacity duration-500 ease-in-out opacity-${
    posterLoaded ? "100" : "0"
  }`;

  if (isHidden) {
    return (
      <div className="w-[90%] lg:w-[32%] aspect-video opacity-0 pointer-events-none" />
    );
  }

  function loadBackdrop() {
    const img = new Image();

    img.src = movie.backdrop_path;
  }

  return (
    <motion.button
      layoutId={`movie-tile-${movie.movie_id}`}
      onClick={() => onOpen(movie)}
      className="w-[90%] lg:w-[32%] aspect-video cursor-pointer flex border border-gray-500 rounded-2xl overflow-hidden hover:shadow-2xl/30 shadow-gray-100 "
      onMouseOver={() => loadBackdrop()}
    >
      <img
        src={movie.poster_path}
        loading="lazy"
        className={`min-w-[40%] ${mutableOpacityClasses}`}
        onLoad={() => setPosterLoaded(true)}
        layoutId={`poster-${movie.id}`}
      />
      <div className={`relative w-full`}>
        <img
          src={movie.poster_path}
          loading="lazy"
          className={`absolute  ${mutableOpacityClasses}`}
        />
        <div className="p-4 h-full text-zinc-50 backdrop-blur-lg bg-zinc-800/40 flex flex-col items-start justify-end gap-0.5 text-left">
          <small>{getYearFromReleaseDate(movie.release_date)}</small>
          <p className="text-xl md:text-2xl font-bold">
            {movie.original_title}
          </p>
          <p
            className="text-xs md:text-sm max-h-50 line-clamp-3"
            title={movie.overview}
          >
            {movie.overview}
          </p>
          {movie.vote_count > 0 ? (
            <div className="flex items-center gap-0.5">
              <StarIcon className="size-4 text-yellow-300" />{" "}
              <p className="text-xs md:text-sm">{movie.vote_average}</p>
              <small>({movie.vote_count})</small>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </motion.button>
  );
}

export default MovieTile;
