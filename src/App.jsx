import { useEffect, useMemo, useState } from "react";
import Error from "./components/Error";
import Header from "./components/Header";
import Loading from "./components/Loading";
import MovieList from "./components/MovieList";
import { useMovies } from "./hooks/useMovies";
import LoadMore from "./components/LoadMore";

const LOCAL_PAGE_SIZE = 20;

function App() {
  const [visibleCount, setVisibleCount] = useState(LOCAL_PAGE_SIZE);
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isError,
  } = useMovies();

  const totalMoviesCount = data?.pages[0]?.total || 0;

  const allMovies = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((p) => p.data);
  }, [data]);

  const filteredMovies = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allMovies.slice(0, visibleCount);
    return allMovies
      .filter((m) => (m.original_title ?? "").toLowerCase().includes(q))
      .slice(0, visibleCount);
  }, [allMovies, search, visibleCount]);

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const loading = ["loading", "pending"].includes(status);
  const errored = ["error"].includes(status) || isError;
  const success = ["success"].includes(status);

  return (
    <>
      <Header
        setSearchInput={setSearch}
        canSearch={allMovies.length >= totalMoviesCount}
        loadingNumbers={`${allMovies.length}/${totalMoviesCount}`}
      />
      <main className="p-4 flex flex-col gap-10">
        {success && <MovieList movies={filteredMovies} />}
        {errored && <Error error={error} />}
        {loading && <Loading />}

        <LoadMore
          visibleCount={visibleCount}
          totalMoviesCount={totalMoviesCount}
          setVisibleCount={setVisibleCount}
          pageSize={LOCAL_PAGE_SIZE}
        />
      </main>
    </>
  );
}

export default App;
