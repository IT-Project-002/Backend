import React, {useState} from "react";
import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";
import "../css/style.css";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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
      <ul>
        <Link to="/">
          <HomeRoundedIcon onClick={toggleMenu}/>
          {/* <img className="home-icon" src={home} alt="home" onClick={toggleMenu}></img> */}
        </Link>

        <CustomLink to="/user/register">
          <FiberNewOutlinedIcon/>
        </CustomLink>

        <CustomLink to="/user/profile">
          <AccountCircleOutlinedIcon />
        </CustomLink>

        <CustomLink to="/user/like">
          <FavoriteBorderIcon/>
        </CustomLink>

        <CustomLink to="/user/market">
          <StorefrontOutlinedIcon />
        </CustomLink>

        <CustomLink to="/user/upload">
          <AddAPhotoOutlinedIcon />
        </CustomLink>

        <CustomLink to="/user/about">
          <InfoOutlinedIcon />
        </CustomLink>

        <CustomLink to="/">
          <LogoutOutlinedIcon className="navbar-icon"/>
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
