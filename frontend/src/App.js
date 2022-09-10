import "../src/css/style.css";
import Register from "../src/pages/register";
import Landing from "../src/pages/landing";
import Login from "../src/pages/login";
import Profile from "./pages/profile";
import Likes from "./pages/like";
import Navbar from "./Navbar";
import Footer from "./footer";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/like" element={<Likes />} />
            <Route path="/user/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
    </Router>
  );
}

export default App;
