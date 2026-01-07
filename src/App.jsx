import Error from "./components/Error";
import Loading from "./components/Loading";
import MovieList from "./components/MovieList";
import { useMovies } from "./hooks/useMovies";

function App() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMovies();

  const loading = ["loading", "pending"].includes(status);
  const errored = ["error"].includes(status);
  const success = ["success"].includes(status);

  return (
    <main>
      {success && <MovieList movies={data} />}
      {errored && <Error />}
      {loading && <Loading />}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
          ? "Load more"
          : "You're Done!"}
      </button>
    </main>
  );
}

export default App;
