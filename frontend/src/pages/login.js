import {useState, useEffect, useRef} from 'react'
import {Navigate, useNavigate} from 'react-router-dom';
import "../css/login.css";
import "../css/form.css";
import d1 from "../image/drawing.png";
import {AiFillEyeInvisible, AiFillEye, AiTwotoneMail} from "react-icons/ai";


function Login(){
  const nav = useNavigate();
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsSHown] = useState(false);
  const token = sessionStorage.getItem("access_token")
  // setting a focus on Email input when the component loads
  useEffect(() => {
//    userRef.current.focus();
  }, [])

  // show password or not
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {email, password};
    console.log(userInfo)

    fetch('http://localhost:9000/user/login', {
        headers : {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userInfo),
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(data => {
        if(data.access_token){
            sessionStorage.setItem("access_token",data.access_token)
            console.log("access_token exist")
            window.location.href = "http://localhost:3000/user/market"
            return data.access_token
        }else{
            window.location.href = "http://localhost:3000/user/login"
        }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  if(token && token!=='' &&token!==undefined){
     return  <Navigate replace to="/user/market" />;
  }else{
      return(
        <div className="layout-login">
          <div className="login-container">
            {/* <form>
              <h2 className='welcom'>Welcome Back!</h2>
              <label>
                <AiTwotoneMail/>
              </label>
              <input
                type="email"
                className="form-control"
                ref={userRef}
                placeholder="Email"
                value={email}
                onChange = {(e) => setEmail(e.target.value)}
                required
                />
              <label className='login-password'>
                {!isShown ? <AiFillEye onClick={togglePassword}/> :<AiFillEyeInvisible className="eye-icon" onClick={togglePassword}/>}
              </label>
              <input
                type={isShown ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange = {(e) => setPassword(e.target.value)}
                required
              />
              <button className='login-button' onClick={handleSubmit}> Log in </button>
            </form>
            <a className="signup-button" href="/user/register">Haven't Sign up?</a> */}
          </div>
          <div>
            <form action="/action_page.php">
              <label for="fname">First Name</label>
              <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

              <label for="lname">Last Name</label>
              <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

              <label for="country">Country</label>
              <select id="country" name="country">
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
              </select>
            
              <input type="submit" value="Submit"/>
            </form>
          </div>

          
          <div className="today-container">
            <h2>“Creativity takes courage.”</h2>
            <p>- Henri Matisse</p>
            <img src={d1} alt="d1"></img>
          </div>
        </div>
      )
    }
  }

export default Login;