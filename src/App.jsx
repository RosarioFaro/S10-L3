import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Homepage from "./components/Homepage";
import TvShows from "./components/TvShows";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/TvShows" element={<TvShows />} />
        <Route path="/movies/:imdbID" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
