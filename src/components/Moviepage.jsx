import MainMovies from "./MainMovies";

function Moviepage() {
  return (
    <div className="container mt-3">
      <MainMovies query="Lord of the Rings" />
      <MainMovies query="The Hobbit" />
      <MainMovies query="Dune" />
    </div>
  );
}

export default Moviepage;
