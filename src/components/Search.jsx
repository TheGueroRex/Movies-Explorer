import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useHistory } from "react-router";
import { useQuery } from "../hocks/useQuery";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export function Search() {
  const querySearch = useQuery();
  const search = querySearch.get("search");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.searchSection}>
      <form className={styles.searchContainer} onSubmit={handleSubmit}>
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            value= {search ? search : ""}
            placeholder="Find your favorite movie:"
            onChange={(e) => {
              const value = e.target.value;
              history.push("/?search=" + value);
            }}
          />
          <FaSearch size={20} color="black" className={styles.searchButton} />
        </div>
      </form>
      <ul className={styles.navBar}>
        <li>
          <Link to="/popular_movies">Popular</Link>
        </li>
        <li>
          <Link to="/top_rated_movies">Top Rated</Link>
        </li>
        <li>
          <Link to="/upcoming_movies">Upcoming</Link>
        </li>
      </ul>
    </div>
  );
}
