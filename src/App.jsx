import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Moviepage from "./components/Moviepage";
import TvShows from "./components/TvShows";
import MovieDetails from "./components/MovieDetails";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Moviepage />} />
          <Route path="/TvShows" element={<TvShows />} />
          <Route path="/movies/:imdbID" element={<MovieDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Container>
  );
}

export default App;
