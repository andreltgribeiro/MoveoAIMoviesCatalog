import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { StarIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { getYearFromReleaseDate } from "../../Util/format";
import ProfileImage from "../../assets/profile.jpg";

function ModalPortal({ children }) {
  return createPortal(children, document.body);
}

function MovieModal({ movie, onClose }) {
  return (
    <ModalPortal>
      <AnimatePresence>
        <motion.div
          key="modal-container"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            aria-label="Close"
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            layoutId={`movie-tile-${movie.movie_id}`}
            className="relative z-10 w-full max-w-7xl rounded-2xl overflow-hidden border border-zinc-700 bg-transparent backdrop-blur-lg shadow-2xl"
          >
            <button
              className="absolute z-12 right-4 top-3 cursor-pointer backdrop-blur-xl rounded-full p-0"
              onClick={onClose}
            >
              <XCircleIcon className="size-12 text-zinc-100" />
            </button>
            <motion.div className="h-[80dvh] w-full">
              <img
                src={movie.backdrop_path}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <div className="absolute bottom-0 w-full bg-gray-950/50 backdrop-blur-lg p-5">
              <div className="grid gap-5 sm:grid-cols-[8rem_1fr]">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="hidden sm:block w-30 object-cover rounded-xl"
                />

                <div className="text-zinc-50 flex flex-col gap-4 text-left justify-end col-span-2  sm:col-auto">
                  <div className="space-y-1">
                    <small>{getYearFromReleaseDate(movie.release_date)}</small>
                    <p className="text-xl md:text-2xl font-bold">
                      {movie.original_title}
                    </p>
                    <p className="text-xs md:text-sm" title={movie.overview}>
                      {movie.overview}
                    </p>

                    {movie.vote_count > 0 && (
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-300" />
                        <p className="text-xs md:text-sm">
                          {movie.vote_average}
                        </p>
                        <small>({movie.vote_count})</small>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full overflow-x-auto overflow-y-hidden col-span-2 pb-2">
                  <div className="flex items-start gap-4 pr-4">
                    {movie.casts.slice(0, 10).map((item) => (
                      <div
                        key={`${item.id}-${item.name}-${item.character}`}
                        className="shrink-0 w-24 sm:w-28"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={item.profile_path}
                            alt={item.name}
                            className="w-16 h-16 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = ProfileImage;
                            }}
                          />

                          <div className="text-center text-xs leading-tight w-full">
                            <div className="truncate px-1 text-zinc-50">
                              {item.name}
                            </div>
                            <div className="truncate px-1 text-zinc-400">
                              {item.character}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </ModalPortal>
  );
}

export default MovieModal;
