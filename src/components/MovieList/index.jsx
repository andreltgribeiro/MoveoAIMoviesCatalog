import { AnimatePresence } from "framer-motion";
import Error from "../Error";
import MovieTile from "../MovieTile";
import { useState } from "react";
import MovieModal from "../MovieModal";

function MovieList({ movies = [] }) {
  const [selected, setSelected] = useState(null);

  if (!movies?.length)
    return <Error customMessage="We haven't found any movie" />;

  return (
    <>
      <AnimatePresence mode="wait">
        {selected && (
          <MovieModal
            key={`modal-${selected.id}`}
            movie={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-4 justify-center">
        {movies.map((movie, i) => (
          <MovieTile
            key={`${movie.movie_id}-${i}`}
            movie={movie}
            onOpen={setSelected}
            isHidden={selected?.movie_id === movie.movie_id}
          />
        ))}
      </div>
    </>
  );
}

export default MovieList;
