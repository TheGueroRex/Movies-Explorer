import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

export function MovieCard({ movie }) {
  const placeholder = "https://www.proedsolutions.com/wp-content/themes/micron/images/placeholders/placeholder_large_dark.jpg";
  const imageUrl = movie.poster_path
    ? "https://image.tmdb.org/t/p/w300" + movie.poster_path
    : placeholder;
  return (
    <li className={styles.movieCard}>
      <Link to={"/movies/" + movie.id}>
        <img
          width={230}
          height={345}
          className={styles.movieImage}
          src={imageUrl}
          alt={movie.title}
        />
        <div>{movie.title}</div>
      </Link>
    </li>
  );
}
