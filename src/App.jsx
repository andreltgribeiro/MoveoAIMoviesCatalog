import { useEffect, useEffectEvent, useMemo, useState } from "react";
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

  const resetVisibleCount = useEffectEvent((size) => {
    setVisibleCount(size);
  });

  useEffect(() => {
    if (search) resetVisibleCount(LOCAL_PAGE_SIZE);
  }, [search]);

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allMovies = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((p) => p.data);
  }, [data]);

  const totalMoviesCount = useMemo(() => {
    const total = Number(data?.pages?.[0]?.total);
    return Number.isFinite(total) && total > 0 ? total : allMovies.length;
  }, [data, allMovies.length]);

  const filteredAllMovies = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allMovies;
    return allMovies.filter((m) =>
      (m.original_title ?? "").toLowerCase().includes(q)
    );
  }, [allMovies, search]);

  const visibleMovies = useMemo(() => {
    return filteredAllMovies.slice(0, visibleCount);
  }, [filteredAllMovies, visibleCount]);

  const loading = ["loading", "pending"].includes(status);
  const errored = ["error"].includes(status) || isError;
  const success = ["success"].includes(status);

  return (
    <>
      <Header
        setSearchInput={setSearch}
        doneLoading={allMovies.length >= totalMoviesCount}
        loadingNumbers={`${allMovies.length}/${totalMoviesCount}`}
      />
      <main className="p-4 flex flex-col gap-10">
        {success && <MovieList movies={visibleMovies} />}
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
