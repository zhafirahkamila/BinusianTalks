import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import About from "./AboutPage";
import NavbarComp from "../components/Navbar";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />}/>
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
