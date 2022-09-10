import React, { useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../css/register.css";
import "../css/form.css";

import female1 from "../profile/female1.png";

const NAME_REG = new RegExp(/^[A-Z0-9][A-z0-9-_]{3,14}$/i);
const EMAIL_REG = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
const PWD_REG = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/i);

function Registration() {
  const userRef = useRef();
  // const errRef = useRef();
  const history = useNavigate();
  const [username, setName] = useState("");
  const [validName, setvalidName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPwd, setvalidPwd] = useState("");

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState("");
  
  const [bio, setBio] = useState("");

  // setting a focus on username input when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, [])
  // Username validation
  useEffect(() => {
    setvalidName(NAME_REG.test(username))
  }, [username])

  // Email validation
  useEffect(() => {
    setValidEmail(EMAIL_REG.test(email))
  }, [email])

  // Pwd validation
  useEffect(() => {
    setvalidPwd(PWD_REG.test(password))
    setValidMatch(password === matchPwd);
  }, [password, matchPwd])


  const handleSubmit = (e) => {
    const userInfo = { username, email, password, matchPwd};

    fetch('http://localhost:9000/user/register',{
      headers : {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userInfo)
    })
    .then(response => {
      console.log('hi:', response);
      history('/user/login');
    })
    .then(userInfo => {
      console.log('Success:', userInfo);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    // prevent page being refresh
    e.preventDefault();

    // check form validation
    if(validName && validEmail && validPwd && validPwd){
      const userInfo = { username, email, password, matchPwd, bio};
      console.log(userInfo);
      history('/login');
      // fetch('http://localhost:9000/user/register', {
      //   headers : {
      //        'Content-Type':'application/json'
      //  },
      //  method: 'POST',
      //  mode: 'no-cors',
      //  body: JSON.stringify(userInfo),
      // })
      // .then(response => response.json())
      // .then(userInfo => {
      //   console.log('Success:', userInfo);
      // })
      // .catch((error) => {
      //  console.error('Error:', error);
      // });
    };
  }

  return (
    <div className="main">
      <section className="register-container">
        <h1>New to this site?</h1>
        <h1>Let's get you started!</h1>

        {/* registration form */}
        <form  method='post' onSubmit = {handleSubmit}>
          <input
            type="text"
            className="form-control"
            ref={userRef}
            placeholder="Name"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <p id="uidnote" className={username && !validName ? "instructions" : "offscreen"}>
              3 to 14 characters.<br />
              Letters, numbers, underscores, hyphens allowed.
          </p>          
          <input
            type = "email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p id="emailnote" className={ email && !validEmail ? "instructions" : "offscreen"}>
            Valid email prefixes: example@mail.com
          </p>           
          <input
            type = "password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p id="pwdnote" className={ password && !validPwd ? "instructions" : "offscreen"}>
            8 to 24 characters.<br />
            Must include uppercase, lowercase letters and a number.<br />            
          </p>   
          <input
            className="form-control"
            placeholder="Comfirmed Password"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            required             
          />
          <p id="pwdnote" className={ matchPwd && !validMatch ? "instructions" : "offscreen"}>
            Passwords did not match 
          </p> 
          <textarea 
              type="text"
              className="form-bio"
              placeholder="Tell us a bit more about you…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
          /> 

          {/* Avatar selection */}
          <img className="avatar" scr={female1} alt=""/>
          {/* Load avatar images from backend */}

          <button type='submit'>  Sign me Up!  </button>
        </form>
        <p>
          Already registered?
          <br />
          <span className="signup">
            <a href="/login">Sign In</a>
          </span>
        </p>
      </section>
    </div>
  );
}

export default Registration;
