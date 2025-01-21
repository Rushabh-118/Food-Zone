import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Login = ({setShowLogin}) => {

  const { URL, setToken } = useContext(StoreContext);

//login and sign up form

    const [currState, setCurrState] = useState("Login");
    const [data,setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({...data, [name]: value}));
    }

    const onLogin = async(event) => {
        event.preventDefault();
        let newurl = URL;
        if(currState === "Login") {
            newurl += "/api/user/login";
        } else {
            newurl += "/api/user/register";
        }
        try {
            const response = await axios.post(newurl, data);
            if(response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }
    }

  return (
    <div className='login'>
      <form onSubmit={onLogin} className="login-container">
        <div className='login-title'>
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
            {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Enter your name" required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Enter your email" required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Enter your password" required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-condition">
            <input type="checkbox" required />
            <p>By {currState}, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
        {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Click here</span></p>}
      </form> 
    </div>
  )
}

export default Login
