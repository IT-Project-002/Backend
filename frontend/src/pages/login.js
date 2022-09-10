import {useState} from 'react'
import "../css/login.css";
import "../css/form.css";
import d1 from "../image/drawing.png";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsSHown] = useState(false);

  // show password or not
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {email, password};
    console.log(userInfo)

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
    <div className="main">
      <div className="login-container">
        <ul>
          <li><h2>Welcome Back!</h2></li>
            <form>
                <input
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type={isShown ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                    required
                />
                {/* eye icon */}
                <div className="icon-pwd" >
                    {
                      !isShown ? <AiFillEye onClick={togglePassword}/> :<AiFillEyeInvisible onClick={togglePassword}/>
                    }                    
                </div>
                <button onClick={handleSubmit}> Log in </button>
            </form>
            <li><a href="/register">Haven't Sign up?</a></li>
            <li><a href="/profile">Log in</a></li>  
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