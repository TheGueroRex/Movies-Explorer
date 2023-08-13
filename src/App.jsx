import styles from "./App.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";
import { LandingPage } from "./pages/LandingPage";
import Logo from "./assets/logo.png";
import { PopularPage } from "./pages/PopularPage";
import { TopRatedPage } from "./pages/TopRatedPage";
import { UpcomingPage } from "./pages/UpcomingPage";

export function App() {
  return (
    <Router>
      <header className={styles.header}>
        <Link to="/">
          <div className={styles.title}>
            <img src={Logo} alt="Movies Explorer" border="0" />
          </div>
        </Link>        
      </header>
      <main>
        <Switch>
          <Route exact path="/movies/:movieId">
            <MovieDetails />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/popular_movies">
            <PopularPage />
          </Route>
          <Route exact path="/top_rated_movies">
            <TopRatedPage />
          </Route>
          <Route exact path="/upcoming_movies">
            <UpcomingPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
