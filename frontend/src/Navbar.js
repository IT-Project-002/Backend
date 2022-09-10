import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./css/style.css";
import home from "./icon/Home.png";
import heart from "./icon/Heart.png";
import profile from "./icon/Profile.png";
import market from "./icon/market.png";


export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img className="home-icon" src={home} alt="home"></img>
      </Link>
      <ul>
        <CustomLink to="/profile">
          <img className="icon" src={profile} alt="profile"></img>
        </CustomLink>
        <CustomLink to="/like">
          <img className="icon" src={heart} alt="heart"></img>
        </CustomLink>
        <CustomLink to="/market">
          <img className="icon" src={market} alt="market"></img>
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