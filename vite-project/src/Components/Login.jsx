import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [values,setValues] = useState({
        email:'',
        password:''
    });

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
          navigate('/dashboard')

      })
      .catch(err => console.log(err))
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2> Login Page </h2>
        <div className='mb-3'>
            <label htmlFor="username">Email</label>
            <input className="form-control rounded-0" name="email" type="email" placeholder="Email" onChange={(e) => setValues({...values,email:e.target.value})} required />
        </div>

        <div className='mb-3'>
            <label htmlFor="password"> Password: </label>
            <input className="form-control rounded-0" name="password" type="password" placeholder="Password" onChange={(e) => setValues({...values,password:e.target.value})} required />
        </div>

        <button className="btn btn-success w-100 rounded-0">Login</button>
      </form>
    </div>
  );
};

export default Login;
