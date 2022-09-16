import React, {useState} from "react";
import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";
import "./css/style.css";
import home from "./icon/Home.png";
import heart from "./icon/Heart.png";
import profile from "./icon/Profile.png";
import market from "./icon/market.png";


export default function Navbar() {
  let location = useLocation();
  const [isShown, setIsSHown]= useState(false)
  // console.log(isShown)
  // SHow Menu
  const toggleMenu = () => {
    console.log(location.pathname)
    console.log(isShown)
    setIsSHown((isShown) => !isShown);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="home-icon" src={home} alt="home" onClick={toggleMenu}></img>
      </Link>
      <ul>
        <CustomLink to="/user/profile">
          <img className="icon" src={profile} alt="profile"></img>
        </CustomLink>
        <CustomLink to="/user/like">
          <img className="icon" src={heart} alt="heart"></img>
        </CustomLink>
        <CustomLink to="/user/market">
          <img className="icon" src={market} alt="market"></img>
        </CustomLink>
        <CustomLink to="/user/upload">
          <p>Upload</p>
        </CustomLink>
        <CustomLink to="/">
          <p>Log Out</p>
        </CustomLink>
      </ul>
    </nav>
    
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
