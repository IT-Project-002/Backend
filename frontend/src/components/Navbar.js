import React, {useState} from "react";
import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";
import "../css/style.css";
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Navbar() {
  const token = sessionStorage.getItem("access_token")
//  console.log("NavBar:" + token)
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

   function logMeOut() {
      fetch('http://localhost:9000/user/logout',{
          method: 'POST',
          mode: 'cors',
       })
        .then((response) => {
           sessionStorage.removeItem("access_token")
           window.location.href ='http://localhost:3000/user/login' ;
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}

  return (
    <nav className="navbar">
          <Link className="home-icon" to="/">
            <HomeOutlinedIcon onClick={toggleMenu}/>
          </Link>    
           <ul>
              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/profile">
                     <AccountCircleOutlinedIcon />
                  </CustomLink>:''
              }
              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/myFav">
                     <FavoriteBorderIcon/>
                  </CustomLink>:''
              }
              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/market">
                     <StorefrontOutlinedIcon />
                  </CustomLink>:''
              }
              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/upload">
                     <AddCircleOutlineRoundedIcon />
                  </CustomLink>:''
              }

              {
              (token && token!=='' &&token!==undefined)?'':
                  <CustomLink to="/user/login">
                     <FiberNewOutlinedIcon/>
                  </CustomLink>
              }

              <CustomLink to="/user/about">
                  <InfoOutlinedIcon />
              </CustomLink>

              {
              (token && token!=='' &&token!==undefined)?
                  <CustomLink to="/user/login">
                     <LogoutOutlinedIcon onClick={logMeOut}/>
                  </CustomLink>:''
              }
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
