import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import ProfilePage from "./ProfilePage";
import ForumPage from "./ForumPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/about" element={<ProtectedRoute> <AboutPage /> </ProtectedRoute>}/>
          <Route path="/forum" element={<ProtectedRoute> <ForumPage /> </ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
