import "./App.css";
import { useMovies } from "./hooks/useMovies";

function App() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMovies();

  if (!data) return <></>;

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error loading movies</p>;

  return (
    <>
      {data.pages.map((page, pageIndex) => (
        <ul key={pageIndex}>
          {page.data.map((movie) => (
            <li key={movie.id}>
              <strong>{movie.original_title}</strong> ({movie.release_date})
            </li>
          ))}
        </ul>
      ))}

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
    </>
  );
}

export default App;
