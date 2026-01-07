import { useEffect, useMemo, useState } from "react";
import Error from "./components/Error";
import Header from "./components/Header";
import Loading from "./components/Loading";
import MovieList from "./components/MovieList";
import { useMovies } from "./hooks/useMovies";

function App() {
  const [search, setSearch] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMovies();

  const allMovies = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((p) => p.data);
  }, [data]);

  const filteredMovies = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allMovies;
    return allMovies.filter((m) =>
      (m.original_title ?? "").toLowerCase().includes(q)
    );
  }, [allMovies, search]);

  // useEffect(() => {
  //   if (hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const loading = ["loading", "pending"].includes(status);
  const errored = ["error"].includes(status);
  const success = ["success"].includes(status);

  return (
    <>
      <Header setSearchInput={setSearch} />
      <main className="p-4">
        {success && <MovieList movies={filteredMovies} />}
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
    </>
  );
}

export default App;
