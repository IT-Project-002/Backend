import {useState, useEffect, useRef} from 'react'
import {useNavigate} from "react-router-dom";
import "../css/login.css";
import "../css/form.css";
import d1 from "../image/drawing.png";
import {AiFillEyeInvisible, AiFillEye, AiTwotoneMail} from "react-icons/ai";

function Login(){
  const history = useNavigate();
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsSHown] = useState(false);

  // setting a focus on Email input when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, [])

  // show password or not
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password){
      const userInfo = {email, password};
      history("/user/market")
      console.log(userInfo)
    }


    // fetch('http://localhost:9000/user/login', {
    //     headers : {
    //         'Content-Type':'application/json',
    //   },
    //   method: 'POST',
    //   mode: 'no-cors',
    //   body: JSON.stringify(userInfo),
    // })
    // .then(response => JSON.stringify(response))
    // .then(userInfo => {
    //   console.log('Success:', userInfo);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
    // prevent page being refresh
  };  

  return(
    <div className="layout-login">
      <div className="login-container">
        <ul>
          <li><h2>Welcome Back!</h2></li>
            <form>
              <li>< AiTwotoneMail className="eye-icon"/><input
                    type="email"
                    className="form-control"
                    ref={userRef}
                    placeholder="Email"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    required
              /></li>
              <li>{!isShown ? <AiFillEye className="eye-icon" onClick={togglePassword}/> :<AiFillEyeInvisible className="eye-icon" onClick={togglePassword}/>}<input
                    type={isShown ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                    required
              />
              </li>                 
                <li><button className='button' onClick={handleSubmit}> Log in </button></li>
            </form>
            <li><a href="/user/register">Haven't Sign up?</a></li>
          </ul> 
      </div>
      <div className="today-container">
        <h2>“Creativity takes courage.”</h2>
        <p>- Henri Matisse</p>
        <img src={d1} alt="d1"></img>
      </div> 
    </div>
  )
}

export default Login;