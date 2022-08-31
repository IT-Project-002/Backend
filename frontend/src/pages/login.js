// import {useState, useEffect} from 'react'
import "../css/login.css";
import "../css/form.css";

function Login() {
  return (
    <div className="container">
      <h2 className="title-wrapper">Welcome Back!</h2>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Password"
          required
        />
      </form>
      <section className="link-wrapper">
        <span className="line">
          <a href="/register">Haven't Sign up?</a>
        </span>
        <br />
        <span className="line">
          <a href="/profile">Log in</a>
        </span>
      </section>
    </div>
  );
}

export default Login;
