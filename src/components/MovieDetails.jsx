import { useState, useEffect } from "react";
import { useParams } from "react-router";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=3386b53b&i=${imdbID}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Errore nel recupero dei dettagli:", error))
      .finally(() => setLoading(false));
  }, [imdbID]);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (!movie) {
    return <p>Dettagli non disponibili.</p>;
  }

  return (
    <div className="movie-details container text-white mt-4">
      <div className="row align-items-center">
        <div className="col-md-4 text-center">
          <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-8">
          <h2>{movie.Title}</h2>
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
