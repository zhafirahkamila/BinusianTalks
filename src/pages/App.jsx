import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import About from "./AboutPage";
import NavbarComp from "../components/Navbar";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          
          <Route path="/" element={<RegisterPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
