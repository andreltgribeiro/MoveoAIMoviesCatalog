import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const INITIAL_URL = "https://jsonfakery.com/movies/paginated";

const fetchMovies = async ({ pageParam = INITIAL_URL }) => {
  const { data } = await axios.get(pageParam);
  return data;
};

export function useMovies() {
  return useInfiniteQuery({
    queryKey: ["data"],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => {
      return lastPage.next_page_url ?? undefined;
    },
  });
}
