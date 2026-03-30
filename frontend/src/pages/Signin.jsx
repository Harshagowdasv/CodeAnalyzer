import "../styles/signin.css";
import Sideimage from "../assets/sideimage2.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signin(){

  const [form, setForm] = useState({
    email:"",
    password:""
  });

  const [message, setMessage] = useState("");

  //input handler
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{

      const url = "http://localhost:5000/login";

      const res = await fetch(url,{
        method:"POST",
        headers:{
          'Content-type':"application/json",
        },
        body: JSON.stringify({
          email:form.email,
          password : form.password
        })
      });
      const data = await res.json();
      setMessage(data.message);
    if(data.message === "Login Sucessful"){
      
      // store login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", form.email);

      // redirect
      navigate("/dashboard");
    }

  }catch(err){
    console.log(err);
    setMessage("Server Error");
  }
  };

  return(
    <>
    
    <div className="card-log">

      <div className="title">
        <h1>Sign In Your Account</h1>
        <h3>Join our platform and unlock new possibilities</h3>
      </div>

      <div className="container-log">
        
        <div className="image-log">
          <div className="sideimg-log">
            <img src={Sideimage} alt="sideimage" />
          </div>
        </div>

        <form action="" onSubmit={handleSubmit}>


          <label htmlFor="email">Email Address</label>
          <input 
          type="email" 
          name="email" 
          placeholder="Email Address"
          onChange={handleChange}/>


          <label htmlFor="password">Password</label>
          <input 
          type="password" 
          name="password"
          placeholder="Password"
          onChange={handleChange}/>


          <button type="submit">Sign In</button>
          <p>{message}</p>
          <p>Don't Have an account ? <Link to="/signup">SignUp</Link></p>

        </form>
        
        
        </div>
    </div>
    
    <footer>
      <ul>
        <li>Terms Of Services</li>
        <li>Privacy Policy</li>
        <li>Sign in</li>
      </ul>
    </footer>
  
    </>
  )
}

export default Signin;