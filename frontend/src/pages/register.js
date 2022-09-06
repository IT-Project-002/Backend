import React, { useRef, useState, useEffect } from "react";
import "../css/register.css";
import "../css/form.css";
import userIcon from "../icon/userIcon.png";

function Registration() {
  const userRef = useRef();
  const [username, setName] = useState("");
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
    const userInfo = { username, email, password, matchPwd};

    fetch('http://localhost:9000/user/register', {
       headers : {
            'Content-Type':'application/json'
      },
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(userInfo),
    })
    .then(response => response.json())
    .then(userInfo => {
      console.log('Success:', userInfo);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    // prevent page being refresh
    e.preventDefault();
  };
  // console.log(matchFocus,validMatch)
  return (
    <div className="x">
      <section className="register-container">
        <h1>New to this site?</h1>
        <h1>Let's get you started!</h1>
        <form  method='post' onSubmit = {handleSubmit}>
          <input
            type="text"
            htmlFor="name"
            className="form-control"
            ref={userRef}
            placeholder="Name"
            value={username}
            // save the input to userState
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            htmlFor="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            htmlFor="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <input
            htmlFor="psssword_confirm"
            className="form-control"
            placeholder="Comfirmed Password"
            id="confirmPassword"
            value={matchPwd}
            onChange={(event) => setMatchPwd(event.target.value)}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
        <button  type='submit'>  Sign me Up!  </button>
      </form>
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
