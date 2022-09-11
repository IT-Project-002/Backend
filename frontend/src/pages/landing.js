import "../css/landing.css";

function Landing() {
  return (
    <div className="main">
      <div className="landing-container">
        <h2>Landing page</h2>
        <p>
          {" "}
          Haven't Sign Up?
          <br />
          <span className="line">
            <a href="/user/register">Sign Up</a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Landing;
