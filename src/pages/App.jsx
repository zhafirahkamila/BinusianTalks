import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./AboutPage";
import NavbarComp from "../components/Navbar";
import RegisterPage from "./RegisterPage";
import Forum from "./Forum"; 

function App() {
  return (
    <Router>
      <NavbarComp /> 
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </Router>
  );
}

export default App;
