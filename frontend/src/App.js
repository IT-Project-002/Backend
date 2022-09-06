import "./css/App.css";
import Register from "../src/pages/register";
import Landing from "../src/pages/landing";
import Login from "../src/pages/login";
import Profile from "./pages/profile";
import Likes from "./pages/like";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
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
        {/* <Navbar />
        <Switch>
          <Route exact path="/"> 
            <Landing/>
          </Route>
          <Route exact path="/register"> 
            <Register/>
          </Route>
          <Route exact path="/login"> 
            <Login/>
          </Route>
          <Route exact path="/profile"> 
            <Profile/>
          </Route>
          <Route exact path="/likes"> 
            <Likes/>
          </Route>
        </Switch> */}
      </div>
    </Router>
    // <div className="App">
    //   {/* <Register/> */}
    //   <Landing/>
    // </div>
  );
}

export default App;
