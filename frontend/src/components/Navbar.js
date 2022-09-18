import React, {useState} from "react";
import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";
import "../css/style.css";
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import home from "../icon/Home.png";
import heart from "../icon/Heart.png";
import profile from "../icon/Profile.png";
import market from "../icon/Market.png";
import logout from "../icon/Logout.png";


export default function Navbar() {
  let location = useLocation();
  const [isShown, setIsSHown]= useState(false)
  // console.log(isShown)
  // SHow Menu
  const toggleMenu = () => {
    console.log(location.pathname)
    console.log(isShown)
    // if(location.pathname !== "/"){
    //   setIsSHown((isShown) => isShown);
    // }
    setIsSHown((isShown) => !isShown);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <CottageOutlinedIcon className="home-icon" sx={{fontSize:35}} onClick={toggleMenu}/>
        {/* <img className="home-icon" src={home} alt="home" onClick={toggleMenu}></img> */}
      </Link>
      <ul>
      <CustomLink to="/user/register">
        <FiberNewOutlinedIcon sx={{fontSize:35}}/>
          {/* <p>Register</p> */}
        </CustomLink>
        <CustomLink to="/user/profile">
          <AccountCircleOutlinedIcon sx={{fontSize:35}}/>
          {/* <img className="icon" src={profile} alt="profile"></img> */}
        </CustomLink>
        <CustomLink to="/user/like">
          <FavoriteBorderIcon sx={{fontSize:35}}/>
          {/* <img className="icon" src={heart} alt="heart"></img> */}
        </CustomLink>
        <CustomLink to="/user/market">
          <StorefrontOutlinedIcon sx={{fontSize:35}}/>
          {/* <img className="icon" src={market} alt="market"></img> */}
        </CustomLink>
        <CustomLink to="/user/upload">
          <AddAPhotoOutlinedIcon sx={{fontSize:35}}/>
        </CustomLink>
        <CustomLink to="/user/about">
          <InfoOutlinedIcon sx={{fontSize:35}}/>
          {/* <p>About</p> */}
        </CustomLink>
        <CustomLink to="/">
          <LogoutOutlinedIcon sx={{fontSize:35}}/>
          {/* <img className="icon" src={logout} alt="logout"></img> */}
        </CustomLink>
      </ul>
      {/* menu */}
      {/* <ul className={isShown? "menu-list" : "offscreen"}>
        <li>Username</li>
        <CustomLink to="/user/profile">
          My Profile
        </CustomLink>
        <CustomLink to="/user/market">
          My Market
        </CustomLink>
        <li>Sign Out</li>
        <li>Handicraft Website</li>
        <li>About This Website</li>
        <li>About Us</li>
      </ul> */}
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
