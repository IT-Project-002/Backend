import React, { useRef, useState, useEffect } from "react";
import "../css/register.css";
import "../css/form.css";
import userIcon from "../icon/userIcon.png";

function Registration() {
  const userRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [bio, setBio] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (setValidMatch(password === matchPwd)) {
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  }, [password, matchPwd]);

  const handleSubmit = (e) => {
    // prevent page being refresh
    e.preventDefault();
    const userInfo = { name, email, password, matchPwd, bio };
    console.log(userInfo);
  };
  // console.log(matchFocus,validMatch)
  return (
    // <>
    // {success ?(
    //     <section>
    //         <p>
    //             <a href="#">Sign In</a>
    //         </p>
    //     </section>
    // ):(
    <div className="x">
      <section className="register-container">
        <h1>New to this site?</h1>
        <h1>Let's get you started!</h1>
        <form>
          <input
            type="text"
            className="form-control"
            ref={userRef}
            placeholder="Name"
            value={name}
            // save the input to userState
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <input
            className="form-control"
            placeholder="Comfirmed Password"
            id="confirmPassword"
            value={matchPwd}
            onChange={(event) => setMatchPwd(event.target.value)}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <textarea
            type="text"
            className="form-bio"
            placeholder="Tell us a bit more about you…"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </form>
        <button
          disabled={
            !name || !email || !password || !matchPwd || !validMatch
              ? true
              : false
          }
          onClick={handleSubmit}
        >
          {" "}
          Sign me Up!{" "}
        </button>
        <p>
          Already registered?
          <br />
          <span className="line">
            <a href="/login">Sign In</a>
          </span>
        </p>
      </section>
      {/* <section className="tag-container">
            </section> */}
    </div>
  );
}
//     </>
// )}

export default Registration;
