import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../utils/httpClient";
import styles from "./MovieDetails.module.css";
import { Spinner } from "../components/Spinner";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";

export function MovieDetails() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [movieImages, setMovieImages] = useState(null);
  const [movieSimilar, setMovieSimilar] = useState(null);
  const [movieTranslations, setMovieTranslations] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    get("/movie/" + movieId).then((data) => {
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    });
  }, [movieId]);

  useEffect(() => {
    get("/movie/" + movieId + "/images").then((data) => {
      setMovieImages(data);
    });
  }, [movieId]);

  useEffect(() => {
    get("/movie/" + movieId + "/recommendations").then((data) => {
      setMovieSimilar(data);
    });
  }, [movieId]);

  // useEffect(() => {
  //   get("/movie/" + movieId + "/translations").then((data) => {
  //     setMovieTranslations(data);
  //   })
  // }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!movie) {
    return null;
  }

  if (!movieImages) {
    return null;
  }

  if (!movieSimilar) {
    return null;
  }

  // if (!movieTranslations) {
  //   return null;
  // }

  const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

  return (
    <>
      <section className={styles.detailsContainer}>
        <img
          className={`${styles.col} ${styles.movieImage}`}
          src={imageUrl}
          alt={movie.title}
        />
        <div className={`${styles.col} ${styles.movieDetails}`}>
          <p className={styles.firstItem}>
            <strong> Titulo: </strong>
            {movie.title}
          </p>
          <p>
            <strong> Generos: </strong>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong> Descripcion: </strong>
            {movie.overview}
          </p>
        </div>
      </section>

      <div className={styles.datailsBack}>
        <Link to="/">
          <svg
            stroke="white"
            fill="none"
            width="13px"
            height="10px"
            viewBox="0 0 13 10"
          >
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </Link>
      </div>

      {/* <section className={styles.translations}>
        <h2>Translations: </h2>
        <p>{movieTranslations.translations.map((translation) => translation.iso_639_1).join(", ")}</p>
      </section> */}

      <h2 className={styles.subtitleSection}>Gallery</h2>
      <section className={styles.imagesContainer}>
        {movieImages.backdrops.length ? (
          movieImages.backdrops
            .slice(0, 6)
            .map((backdrop, index) => (
              <img
                key={backdrop.file_path}
                src={"https://image.tmdb.org/t/p/w500" + backdrop.file_path}
                alt={"preview " + index}
              />
            ))
        ) : (
          <p>THIS FILM DOES NOT HAVE IMAGES</p>
        )}
      </section>

      <h2 className={styles.subtitleSection}>Recommendations</h2>
      <section className={styles.similarContainer}>
        {movieSimilar.results.length ? (
          movieSimilar.results
            .slice(0, 12)
            .map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className={styles.noFoundText}>NO RECOMMENDATIONS YET</p>
        )}
      </section>

    </>
  );
}
