import React, { useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../css/register.css";
import "../css/form.css";
import female1 from "../profile/female1.png";
import female2 from "../profile/female2.png";
import male1 from "../profile/male1.png";
import male2 from "../profile/male2.png";
import male3 from "../profile/male3.png";
import male4 from "../profile/male4.png";

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
      <div className="register-container">
        <ul>
          <li><h1>New to this site?</h1></li>
          <li><h1>Let's get you started!</h1></li>

          {/* registration form */}
          <form  method='post' onSubmit = {handleSubmit}>
            <li><input
              type="text"
              className="form-control"
              ref={userRef}
              placeholder="Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            /></li>
            <p id="uidnote" className={username && !validName ? "instructions" : "offscreen"}>
                3 to 14 characters.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p>          
            <li><input
              type = "email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /></li>
            <p id="emailnote" className={ email && !validEmail ? "instructions" : "offscreen"}>
              Valid email prefixes: example@mail.com
            </p>           
            <li><input
              type = "password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /></li>
            <p id="pwdnote" className={ password && !validPwd ? "instructions" : "offscreen"}>
              8 to 24 characters.<br />
              Must include uppercase, lowercase letters and a number.<br />            
            </p>   
            <li><input
              className="form-control"
              placeholder="Comfirmed Password"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required             
            /></li>
            <p id="pwdnote" className={ matchPwd && !validMatch ? "instructions" : "offscreen"}>
              Passwords did not match 
            </p> 
            <li><textarea 
                type="text"
                className="form-bio"
                placeholder="Tell us a bit more about you…"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            /></li>

            {/* Avatar selection */}
            <img className="avatar" scr={female1} alt=""/>
            {/* Load avatar images from backend */}

            <li><button type='submit'>  Sign me Up!  </button></li>
          </form>
          <li><p>Already registered?</p></li>
          <li><a href="/login">Sign In</a></li>
        </ul>
      </div>
      <div className="bubble-container">
        <img src={male1} alt="male1"></img>
        <img src={female2} alt="female2"></img>
        <img src={female1} alt="female1"></img>
        <img src={male2} alt="male2"></img>
        <img src={male3} alt="male3"></img>
        <img src={male4} alt="male4"></img>
      </div>
    </div>
  );
}

export default Registration;