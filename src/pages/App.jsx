import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import ProfilePage from "./ProfilePage";
import Forum from "./Forum";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/forum" element={<Forum />} />

          {/* <Route path="/about" element={<ProtectedRoute> <AboutPage /> </ProtectedRoute>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
