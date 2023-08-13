import { LandingMovies } from "../components/LandingMovies";
import { Search } from "../components/Search";
import { useDebounce } from "../hocks/useDebounce";
import { useQuery } from "../hocks/useQuery";

export function LandingPage() {
  const querySearch = useQuery();
  const search = querySearch.get("search");

  const debouncedSearch = useDebounce(search, 500);

  return (
    <div>
      <Search />
      <LandingMovies key={debouncedSearch} search={debouncedSearch} />
    </div>
  );
}
