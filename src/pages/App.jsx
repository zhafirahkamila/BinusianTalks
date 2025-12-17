import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import ProfilePage from "./ProfilePage";
<<<<<<< HEAD
import ForumPage from "./ForumPage";
=======
>>>>>>> 164d7edd7d43f85940819948fc18ab5317c7ee38

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/forum" element={<ForumPage />} />
=======
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/forum" element={<Forum />} /> */}
>>>>>>> 164d7edd7d43f85940819948fc18ab5317c7ee38

          <Route path="/about" element={<ProtectedRoute> <AboutPage /> </ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
