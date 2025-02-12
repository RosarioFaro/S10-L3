import MainMovies from "./MainMovies";

function Homepage() {
  return (
    <div className="container mt-3">
      <MainMovies query="Lord of the Rings" />
      <MainMovies query="The Hobbit" />
      <MainMovies query="Dune" />
    </div>
  );
}

export default Homepage;
