import "../styles/register.css";
import Sideimage from "../assets/sideimage2.png";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function App(){

  const [form, setForm] = useState({
    name:"",
    email:"",
    username:"",
    password:"",
    confirmpassword:""
  });

  const [message, setMessage] = useState("");

  //input handler
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(form.password !== form.confirmpassword){
      return setMessage("Password not Matching");
    }

    try{
      const res = await fetch("http://localhost:5000/register",{
        method:"POST",
        headers:{
          'Content-type':"application/json",
        },
        body: JSON.stringify({
          name:form.name,
          email:form.email,
          username : form.username,
          password : form.password
        })
      });
      const data = await res.json();
      setMessage(data.message);
    }catch(err){
      console.log(err);
      setMessage("Server Error");
    }
  };

  const navigate = useNavigate();

  return(
    <>
    
    <div className="card">

      <div className="title">
        <h1>Create Your Account</h1>
        <h3>Join our platform and unlock new possibilities</h3>
      </div>

      <div className="container">
        
        <div className="image">
          <div className="sideimg">
            <img src={Sideimage} alt="sideimage" />
          </div>
        </div>

        <form action="" onSubmit={handleSubmit}>

          <label htmlFor="name">Full Name</label>
          <input 
          type="text" 
          name="name" 
          placeholder="Full Name"
          onChange={handleChange}/>

          <label htmlFor="email">Email Address</label>
          <input 
          type="email" 
          name="email" 
          placeholder="Email Address"
          onChange={handleChange}/>

          <label htmlFor="username">User Name</label>
          <input 
          type="text" 
          name="username" 
          placeholder="userName"
          onChange={handleChange}/>

          <label htmlFor="password">Password</label>
          <input 
          type="password" 
          name="password"
          placeholder="Password"
          onChange={handleChange}/>

          <label htmlFor="cPassword">Confirm Password</label>
          <input 
          type="password" 
          name="confirmpassword"
          placeholder="Confirm Password"
          onChange={handleChange}/>

          <button type="submit">Signup</button>
          <p>{message}</p>
          <p>Alredy have an account ? <Link to="/signin">Signin</Link></p>

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

export default App;