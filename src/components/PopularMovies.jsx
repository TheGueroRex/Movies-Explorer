import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import styles from "./moviesGrid.module.css";
import { Spinner } from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Empty } from "./Empty";

export function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const searchUrl = "/movie/popular?page=" + page;

    get(searchUrl).then((data) => {
      setMovies((prevMovies) => prevMovies.concat(data.results));
      setHasMore(data.page < data.total_pages);
      setIsLoading(false);
    });
  }, [page]);


  if (!isLoading && movies.length === 0) {
    return <Empty />;
  }

  return (
    <InfiniteScroll
      dataLength={movies.length}
      hasMore={hasMore}
      next={() => setPage((prevPage) => prevPage + 1)}
      loader={<Spinner />}
    >
      <ul className={styles.moviesGrid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </InfiniteScroll>
  );
}