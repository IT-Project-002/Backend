import React, { useRef, useState, useEffect } from "react";
import "../css/login.css";
import "../css/form.css";

function Login() {
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   // userRef.current.focus();
  //   fetch('http://localhost:9000/user/login', {
  //     headers : {
  //           'Content-Type':'application/json'
  //     },
  //     method: 'GET',
  //   })
  //   .then(response => JSON.stringify(response))
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }, []);
  
  const handleSubmit = (e) => {
    const userInfo = {email, password};

    fetch('http://localhost:9000/user/login', {
       headers : {
            'Content-Type':'application/json',
      },
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(userInfo),
    })
    .then(response => JSON.stringify(response))
    .then(userInfo => {
      console.log('Success:', userInfo);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    // prevent page being refresh
    e.preventDefault();
  };

  return (
    <div className="container">
      <h2 className="title-wrapper">Welcome Back!</h2>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Password"
          value={password}
          required
        />
      </form>
      <section className="link-wrapper">
        <span className="line">
          <a href="/user/register">Haven't Sign up?</a>
        </span>
        <br />
        <span className="line">
          <a href="/user/profile">Log in</a>
        </span>
      </section>
    </div>
  );
}

export default Login;
