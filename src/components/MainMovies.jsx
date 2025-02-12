import { useState, useEffect } from "react";
import { Link } from "react-router";

const MainMovies = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoadingMovies(true);

    fetch(`http://www.omdbapi.com/?apikey=3386b53b&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search.slice(0, 6));
        } else {
          setMovies([]);
        }
      })
      .catch((error) => console.error("Errore nel recupero dei dati:", error))
      .finally(() => setLoadingMovies(false));
  }, [query]);

  return (
    <div>
      <h4 className="text-white">{query}</h4>

      {loadingMovies ? (
        <div className="loader"></div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div key={index} className="col mb-2 text-center px-1">
                <Link to={`/movies/${movie.imdbID}`}>
                  <img className="equal-height" src={movie.Poster} alt={movie.Title} />
                </Link>
              </div>
            ))
          ) : (
            <p>Nessun risultato trovato</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MainMovies;
