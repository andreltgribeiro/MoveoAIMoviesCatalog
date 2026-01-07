function LoadMore({
  visibleCount,
  totalMoviesCount,
  setVisibleCount,
  pageSize,
}) {
  function loadMore() {
    setVisibleCount((old) => old + pageSize);
  }

  if (visibleCount >= totalMoviesCount) return <></>;

  return (
    <div className="w-full flex justify-center items-center">
      <button
        className="border border-zinc-50 p-4 pt-2 pb-2 text-zinc-50 cursor-pointer rounded-sm transform duration-300 hover:border-zinc-800 hover:text-zinc-800 hover:bg-zinc-50"
        onClick={loadMore}
      >
        Load More
      </button>
    </div>
  );
}

export default LoadMore;
