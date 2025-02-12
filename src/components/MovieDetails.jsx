import { useState, useEffect } from "react";
import { useParams } from "react-router";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  const bearerToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkyOTVjZmI3NDcwMTAwMTU4YjJhODEiLCJpYXQiOjE3MzkzODMwMTIsImV4cCI6MTc0MDU5MjYxMn0.-5FB3QY-MJT-iMgr60m66KbjB45cUmpTUopCGMfSgts";

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=3386b53b&i=${imdbID}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Errore nel recupero dei dettagli:", error));

    fetch(`https://striveschool-api.herokuapp.com/api/comments/${imdbID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Errore nel recupero dei commenti:", error))
      .finally(() => setLoading(false));
  }, [imdbID]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (newComment.trim() === "") {
      alert("Inserisci un commento.");
      return;
    }

    const commentData = {
      comment: newComment,
      rate: parseInt(rating),
      elementId: imdbID,
    };

    fetch("https://striveschool-api.herokuapp.com/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment("");
        setRating(5);
      })
      .catch((error) => console.error("Errore nell'invio del commento:", error));
  };

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

      <div className="comments mt-4">
        <h3>Commenti</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                {comment.comment}
                <br />
                <span>Voto: {comment.rate}/5</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessun commento disponibile.</p>
        )}

        <form onSubmit={handleCommentSubmit} className="mt-3">
          <div className="mb-3">
            <label htmlFor="newComment" className="form-label">
              Aggiungi un commento:
            </label>
            <textarea
              id="newComment"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Scrivi qui il tuo commento..."
              className="form-control"
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Voto:
            </label>
            <select id="rating" value={rating} onChange={handleRatingChange} className="form-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Invia Commento
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieDetails;
