import "../src/css/style.css";
import Register from "../src/pages/register";
import Landing from "../src/pages/landing";
import Login from "../src/pages/login";
import Profile from "./pages/profile";
import Likes from "./pages/like";
import Market from "./pages/market";
import Upload from "./pages/upload";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Item from "./pages/item";
import About from "./pages/about";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/like" element={<Likes />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/market" element={<Market />} />
            <Route path="/user/upload" element={<Upload />} />
            <Route path="/user/item" element={<Item />} />
            <Route path="/user/about" element={<About />} />
          </Routes>
        <Footer />
    </Router>
  );
}

export default App;
