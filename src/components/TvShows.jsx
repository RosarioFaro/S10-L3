import MainMovies from "./MainMovies";

function TvShows() {
  return (
    <div className="container mt-3">
      <MainMovies query="Horror" />
      <MainMovies query="Crime" />
      <MainMovies query="Fantasy" />
    </div>
  );
}

export default TvShows;
